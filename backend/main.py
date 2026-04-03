import subprocess
import sys
import tempfile
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from challenges import CHALLENGES

app = FastAPI(title="PythonDojo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pythondojo.hdavidenochs.com", "http://localhost:5173"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class SubmitRequest(BaseModel):
    challenge_id: str
    player_code: str

class EvalResult(BaseModel):
    passed: bool
    error_type: str | None = None
    error_message: str | None = None
    test_results: list[dict] = []
    total_tests: int = 0
    passed_tests: int = 0

BLOCKED = ["import os", "import sys", "import subprocess", "import socket",
           "import shutil", "open(", "__import__", "eval(", "exec(",
           "importlib", "import pathlib", "import glob"]

def is_safe(code: str) -> tuple[bool, str]:
    for term in BLOCKED:
        if term in code:
            return False, f"Use of '{term}' is not allowed in puzzles."
    return True, ""

def run_code(full_code: str, test_input: str, timeout: int = 5) -> tuple[str, str]:
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
        f.write(full_code)
        fname = f.name
    try:
        result = subprocess.run(
            [sys.executable, fname],
            input=test_input,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        return result.stdout.strip(), result.stderr.strip()
    except subprocess.TimeoutExpired:
        return "", "TimeoutError: Code took too long to run (5s limit)."
    finally:
        os.unlink(fname)

@app.get("/challenges")
def get_challenges():
    return [
        {
            "id": c["id"],
            "title": c["title"],
            "difficulty": c["difficulty"],
            "description": c["description"],
            "locked_top": c["locked_top"],
            "locked_bottom": c.get("locked_bottom", []),
            "placeholder": c["placeholder"],
            "hints": c["hints"],
            "total_tests": len(c["test_cases"]),
        }
        for c in CHALLENGES
    ]

@app.post("/submit", response_model=EvalResult)
def submit(req: SubmitRequest):
    challenge = next((c for c in CHALLENGES if c["id"] == req.challenge_id), None)
    if not challenge:
        return EvalResult(passed=False, error_type="NotFound",
                          error_message="Challenge not found.")

    safe, reason = is_safe(req.player_code)
    if not safe:
        return EvalResult(passed=False, error_type="SecurityError",
                          error_message=reason)

    locked_top = "\n".join(challenge["locked_top"])
    locked_bottom = "\n".join(challenge.get("locked_bottom", []))
    player = req.player_code

    test_results = []
    passed_tests = 0

    for tc in challenge["test_cases"]:
        full_code = "\n".join(filter(None, [locked_top, player, locked_bottom, tc["runner"]]))
        stdout, stderr = run_code(full_code, tc.get("stdin", ""))

        if stderr:
            error_lines = [l for l in stderr.splitlines() if not l.strip().startswith("File ") and "line" not in l[:20]]
            clean_error = "\n".join(stderr.splitlines()[-3:])
            return EvalResult(
                passed=False,
                error_type="RuntimeError",
                error_message=clean_error,
                test_results=test_results,
                total_tests=len(challenge["test_cases"]),
                passed_tests=passed_tests,
            )

        expected = str(tc["expected"]).strip()
        actual = stdout.strip()
        passed = actual == expected

        test_results.append({
            "label": tc["label"],
            "expected": expected,
            "actual": actual,
            "passed": passed,
        })

        if passed:
            passed_tests += 1

    all_passed = passed_tests == len(challenge["test_cases"])
    return EvalResult(
        passed=all_passed,
        test_results=test_results,
        total_tests=len(challenge["test_cases"]),
        passed_tests=passed_tests,
    )

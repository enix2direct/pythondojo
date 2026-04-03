# PythonDojo

A Python coding puzzle game. Write code in a plain text editor — no syntax highlighting,
no autocomplete. The Python interpreter evaluates your submission and tells you exactly
what went wrong. Served at `pythondojo.hdavidenochs.com`.

---

## Project structure

```
pythondojo/
├── .gitignore                        ← root of repo, covers backend + frontend
├── README.md
├── backend/
│   ├── main.py                       # FastAPI app + sandbox executor
│   ├── challenges.py                 # All 9 puzzle definitions
│   ├── requirements.txt              # fastapi, uvicorn, pydantic
│   └── Procfile                      # Railway start command
└── frontend/
    ├── index.html                    # App entry point
    ├── vite.config.js                # Vite build config
    ├── package.json                  # React + Vite dependencies
    ├── .env.example                  # Copy to .env.local for local dev
    ├── public/
    │   └── _redirects                # Cloudflare Pages SPA routing
    └── src/
        ├── main.jsx                  # React root mount
        ├── App.jsx                   # Top-level screen router + state
        ├── api.js                    # fetch() calls to backend
        ├── index.css                 # Global styles + CSS variables
        └── components/
            ├── ChallengeBrowser.jsx  # Home screen — puzzle grid + filters
            ├── PuzzleEditor.jsx      # Editor, locked lines, submit, hints, results
            └── SummaryScreen.jsx     # Score screen shown after solving
```

---

## Local development

### 1. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at http://localhost:8000
Test it: http://localhost:8000/challenges

### 2. Run the frontend

```bash
cd frontend
cp .env.example .env.local      # VITE_API_URL=http://localhost:8000
npm install
npm run dev
```

Frontend runs at http://localhost:5173

---

## Deployment

### Step 1 — Push to GitHub

Create a new repo at github.com/enix2direct named `pythondojo`.

```bash
cd pythondojo          # the root of this folder
git init
git add .
git commit -m "Initial PythonDojo build"
git remote add origin https://github.com/enix2direct/pythondojo.git
git branch -M main
git push -u origin main
```

---

### Step 2 — Deploy the backend to Railway

1. Go to https://railway.app and sign in (use GitHub login).
2. Click **New Project → Deploy from GitHub repo**.
3. Select your `pythondojo` repo.
4. Railway will detect the `backend/` folder. If it doesn't auto-detect:
   - Set **Root directory** to `backend`
   - Set **Start command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy**. Wait ~60 seconds.
6. Go to **Settings → Networking → Generate Domain**.
   You'll get a URL like: `https://pythondojo-production.up.railway.app`
7. Copy this URL — you'll need it in Step 3.

**Test the backend is live:**
Visit `https://your-railway-url.up.railway.app/challenges` — you should see JSON.

---

### Step 3 — Set the backend URL in the frontend

Edit `frontend/.env.example`, copy it to a real env var in Cloudflare Pages
(do NOT commit your Railway URL to git for security):

In Cloudflare Pages dashboard → Settings → Environment variables, add:
```
VITE_API_URL = https://your-railway-url.up.railway.app
```

---

### Step 4 — Deploy the frontend to Cloudflare Pages

1. Go to https://dash.cloudflare.com → **Workers & Pages → Create → Pages**.
2. Click **Connect to Git** → select the `pythondojo` repo.
3. Configure the build:
   - **Framework preset**: None (or Vite)
   - **Root directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`
4. Under **Environment variables**, add:
   - `VITE_API_URL` = your Railway backend URL from Step 2
5. Click **Save and Deploy**. Takes ~2 minutes.

---

### Step 5 — Point your subdomain at Cloudflare Pages

1. In Cloudflare dashboard → Pages project → **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter: `pythondojo.hdavidenochs.com`
4. Cloudflare will automatically add the CNAME record since your domain is already
   on Cloudflare. If it asks, confirm adding:
   ```
   CNAME  pythondojo  →  your-pages-project.pages.dev
   ```
5. Wait 1–5 minutes for DNS to propagate.
6. Visit https://pythondojo.hdavidenochs.com — you're live.

---

### Step 6 — Fix CORS for production

Once you have your Railway URL AND your Cloudflare Pages URL, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pythondojo.hdavidenochs.com",
        "http://localhost:5173",
    ],
    ...
)
```

Commit and push — Railway auto-redeploys.

---

## Adding more puzzles

Edit `backend/challenges.py`. Each challenge follows this structure:

```python
{
    "id": "unique_id",           # e.g. "b04" for beginner #4
    "title": "Short title",
    "difficulty": "beginner",    # beginner | intermediate | advanced
    "description": "What the player must do.",
    "locked_top": [              # lines shown above editor (greyed out)
        "def my_function(x):",
    ],
    "locked_bottom": [           # lines shown below editor (greyed out)
        "    return result",
    ],
    "placeholder": "    # your code here",
    "hints": [                   # revealed one per failed attempt
        "First hint — vague.",
        "Second hint — more specific.",
        "Third hint — nearly a spoiler.",
    ],
    "test_cases": [
        {
            "label": "my_function(2) == 4",   # shown in results
            "runner": "print(my_function(2))", # code appended after player code
            "stdin": "",                       # piped to stdin if needed
            "expected": "4",                   # must match stdout exactly
        },
    ],
}
```

Push to GitHub — Railway redeploys automatically, frontend picks up new challenges
from the `/challenges` endpoint on next page load.

---

## Blocked in the sandbox

Player code cannot use: `import os`, `import sys`, `import subprocess`,
`import socket`, `import shutil`, `open(`, `__import__`, `eval(`, `exec(`,
`importlib`, `import pathlib`, `import glob`.

Submissions timeout after 5 seconds.

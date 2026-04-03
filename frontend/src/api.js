const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function fetchChallenges() {
  const res = await fetch(`${BASE}/challenges`)
  if (!res.ok) throw new Error('Failed to load challenges')
  return res.json()
}

export async function submitCode(challenge_id, player_code) {
  const res = await fetch(`${BASE}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ challenge_id, player_code }),
  })
  if (!res.ok) throw new Error('Submission failed')
  return res.json()
}

import { useState, useEffect } from 'react'
import { fetchChallenges } from './api.js'
import ChallengeBrowser from './components/ChallengeBrowser.jsx'
import PuzzleEditor from './components/PuzzleEditor.jsx'
import SummaryScreen from './components/SummaryScreen.jsx'

const STORAGE_KEY = 'pythondojo_completed'

function loadCompleted() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) }
  catch { return new Set() }
}

function saveCompleted(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

export default function App() {
  const [challenges, setChallenges] = useState([])
  const [loadError, setLoadError] = useState(null)
  const [screen, setScreen] = useState('browse') // 'browse' | 'puzzle' | 'summary'
  const [active, setActive] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(loadCompleted)

  useEffect(() => {
    fetchChallenges()
      .then(setChallenges)
      .catch(() => setLoadError('Could not load challenges. Make sure the backend is running.'))
  }, [])

  function selectChallenge(c) {
    setActive(c)
    setAttempts(0)
    setScreen('puzzle')
  }

  function handleSolved(id) {
    setCompleted(prev => {
      const next = new Set(prev)
      next.add(id)
      saveCompleted(next)
      return next
    })
    setScreen('summary')
  }

  function nextChallenge() {
    const idx = challenges.findIndex(c => c.id === active.id)
    const next = challenges[idx + 1]
    if (next) selectChallenge(next)
    else setScreen('browse')
  }

  if (loadError) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{
          fontFamily: 'var(--mono)',
          color: 'var(--red)',
          background: '#e0525210',
          border: '1px solid #e0525440',
          borderRadius: '8px',
          padding: '1.5rem 2rem',
          fontSize: '0.85rem',
          maxWidth: '480px',
          textAlign: 'center',
        }}>
          {loadError}
        </div>
      </div>
    )
  }

  if (challenges.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.85rem' }}>
          loading...
        </span>
      </div>
    )
  }

  if (screen === 'browse') {
    return (
      <ChallengeBrowser
        challenges={challenges}
        completed={completed}
        onSelect={selectChallenge}
      />
    )
  }

  if (screen === 'puzzle') {
    return (
      <PuzzleEditor
        challenge={active}
        onSolved={(id) => { setAttempts(a => a); handleSolved(id) }}
        onBack={() => setScreen('browse')}
      />
    )
  }

  if (screen === 'summary') {
    const hasNext = challenges.findIndex(c => c.id === active.id) < challenges.length - 1
    return (
      <SummaryScreen
        challenge={active}
        attempts={attempts}
        totalSolved={completed.size}
        total={challenges.length}
        onNext={hasNext ? nextChallenge : null}
        onBrowse={() => setScreen('browse')}
      />
    )
  }
}

import { useState, useRef, useEffect } from 'react'
import { submitCode } from '../api.js'

const DIFF_COLOR = { beginner: '#39d353', intermediate: '#f0a500', advanced: '#e05252' }

export default function PuzzleEditor({ challenge, onSolved, onBack }) {
  const [code, setCode] = useState(challenge.placeholder)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [hintsShown, setHintsShown] = useState(0)
  const [error, setError] = useState(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    setCode(challenge.placeholder)
    setResult(null)
    setAttempts(0)
    setHintsShown(0)
    setError(null)
  }, [challenge.id])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  function handleTab(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = textareaRef.current
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newVal = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newVal)
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 4 }, 0)
    }
  }

  async function handleSubmit() {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await submitCode(challenge.id, code)
      setResult(res)
      setAttempts(a => a + 1)
      if (res.passed) onSolved(challenge.id)
      else if (hintsShown < challenge.hints.length) {
        setHintsShown(h => Math.min(h + 1, challenge.hints.length))
      }
    } catch (err) {
      setError('Could not reach the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const lockedLineStyle = {
    fontFamily: 'var(--mono)',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    color: 'var(--muted)',
    padding: '0 1.25rem',
    userSelect: 'none',
    whiteSpace: 'pre',
    background: 'var(--bg)',
  }

  const diffColor = DIFF_COLOR[challenge.difficulty]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            padding: '0.3rem 0.6rem',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          ← back
        </button>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
          {'>'} PythonDojo
        </span>
        <span style={{
          marginLeft: 'auto',
          padding: '0.2rem 0.6rem',
          borderRadius: '3px',
          fontSize: '0.7rem',
          fontFamily: 'var(--mono)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: diffColor,
          background: diffColor + '18',
        }}>
          {challenge.difficulty}
        </span>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '860px', width: '100%', margin: '0 auto', padding: '2rem', gap: '1.5rem' }}>

        {/* Puzzle description */}
        <div>
          <h1 style={{ fontFamily: 'var(--mono)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            {challenge.title}
          </h1>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {challenge.description}
          </p>
        </div>

        {/* Code editor block */}
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {/* Editor toolbar */}
          <div style={{
            padding: '0.6rem 1rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {['#e05252','#f0a500','#39d353'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
            ))}
            <span style={{ marginLeft: '0.5rem', fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
              solution.py
            </span>
          </div>

          {/* Locked top lines */}
          {challenge.locked_top.length > 0 && (
            <div style={{ paddingTop: '0.75rem', paddingBottom: '0.25rem', borderBottom: '1px dashed var(--border)' }}>
              {challenge.locked_top.map((line, i) => (
                <div key={i} style={lockedLineStyle}>{line}</div>
              ))}
            </div>
          )}

          {/* Editable area */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleTab}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            rows={10}
            style={{
              display: 'block',
              width: '100%',
              background: 'var(--bg2)',
              color: 'var(--text)',
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              padding: '0.75rem 1.25rem',
              resize: 'vertical',
              minHeight: '160px',
              border: 'none',
            }}
          />

          {/* Locked bottom lines */}
          {challenge.locked_bottom && challenge.locked_bottom.length > 0 && (
            <div style={{ paddingTop: '0.25rem', paddingBottom: '0.75rem', borderTop: '1px dashed var(--border)' }}>
              {challenge.locked_bottom.map((line, i) => (
                <div key={i} style={lockedLineStyle}>{line}</div>
              ))}
            </div>
          )}
        </div>

        {/* Submit button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: '0.7rem 2rem',
              background: loading ? 'var(--bg3)' : 'var(--green)',
              color: loading ? 'var(--muted)' : '#000',
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              borderRadius: '5px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s, transform 0.1s',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {loading ? 'running...' : '▶ run tests'}
          </button>
          {attempts > 0 && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
              {attempts} attempt{attempts !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Error reaching server */}
        {error && (
          <div style={{
            background: '#e0525215',
            border: '1px solid #e0525240',
            borderRadius: '6px',
            padding: '1rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--red)',
          }}>
            {error}
          </div>
        )}

        {/* Results panel */}
        {result && <ResultPanel result={result} />}

        {/* Hints */}
        {hintsShown > 0 && (
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.25rem',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              hints
            </div>
            {challenge.hints.slice(0, hintsShown).map((hint, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '0.6rem',
                fontSize: '0.85rem',
                color: 'var(--text2)',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--amber)', fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {i + 1}.
                </span>
                {hint}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ResultPanel({ result }) {
  if (result.error_type) {
    return (
      <div style={{
        background: '#e0525210',
        border: '1px solid #e0525240',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '0.6rem 1rem',
          borderBottom: '1px solid #e0525430',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          color: 'var(--red)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          <span>✗</span> {result.error_type}
        </div>
        <pre style={{
          padding: '1rem',
          fontFamily: 'var(--mono)',
          fontSize: '0.8rem',
          color: '#f09090',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {result.error_message}
        </pre>
      </div>
    )
  }

  return (
    <div style={{
      background: result.passed ? '#39d35310' : '#f0a50010',
      border: `1px solid ${result.passed ? '#39d35340' : '#f0a50040'}`,
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '0.6rem 1rem',
        borderBottom: `1px solid ${result.passed ? '#39d35330' : '#f0a50030'}`,
        fontFamily: 'var(--mono)',
        fontSize: '0.72rem',
        color: result.passed ? 'var(--green)' : 'var(--amber)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span>{result.passed ? '✓' : '~'}</span>
        {result.passed_tests} / {result.total_tests} tests passed
      </div>
      <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {result.test_results.map((t, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            padding: '0.6rem 0.75rem',
            background: 'var(--bg2)',
            borderRadius: '5px',
            border: `1px solid ${t.passed ? 'var(--border)' : '#e0525430'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: t.passed ? 'var(--green)' : 'var(--red)' }}>
                {t.passed ? '✓' : '✗'}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text2)' }}>
                {t.label}
              </span>
            </div>
            {!t.passed && (
              <div style={{ paddingLeft: '1.25rem', fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--red)' }}>got </span>
                <span style={{ color: '#f09090' }}>{t.actual || '(no output)'}</span>
                <span style={{ color: 'var(--muted)' }}> — expected </span>
                <span style={{ color: 'var(--green)' }}>{t.expected}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'

const DIFF_ORDER = { beginner: 0, intermediate: 1, advanced: 2 }
const DIFF_LABEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
const DIFF_COLOR = { beginner: '#39d353', intermediate: '#f0a500', advanced: '#e05252' }

export default function ChallengeBrowser({ challenges, completed, onSelect }) {
  const [filter, setFilter] = useState('all')

  const sorted = [...challenges].sort(
    (a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]
  )
  const visible = filter === 'all' ? sorted : sorted.filter(c => c.difficulty === filter)

  return (
    <div style={{ minHeight: '100vh', padding: '0 0 4rem' }}>

      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: 'var(--bg)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--green)',
            letterSpacing: '-0.02em',
          }}>
            {'>'} PythonDojo
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'beginner', 'intermediate', 'advanced'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.35rem 0.9rem',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontFamily: 'var(--mono)',
                background: filter === f ? 'var(--border2)' : 'transparent',
                color: filter === f ? 'var(--text)' : 'var(--muted)',
                border: `1px solid ${filter === f ? 'var(--border2)' : 'transparent'}`,
                transition: 'all 0.15s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div style={{ padding: '2.5rem 2rem 0', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text2)', fontFamily: 'var(--mono)', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
          {completed.size} / {challenges.length} puzzles solved
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}>
          {visible.map(c => {
            const done = completed.has(c.id)
            return (
              <button
                key={c.id}
                onClick={() => onSelect(c)}
                style={{
                  background: 'var(--bg2)',
                  border: `1px solid ${done ? 'var(--green-dim)' : 'var(--border)'}`,
                  borderRadius: '8px',
                  padding: '1.25rem 1.5rem',
                  textAlign: 'left',
                  transition: 'border-color 0.15s, transform 0.1s',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = done ? 'var(--green)' : 'var(--border2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = done ? 'var(--green-dim)' : 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {done && (
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'var(--green)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: '#000', fontWeight: 700,
                  }}>✓</div>
                )}
                <div style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '3px',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--mono)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: DIFF_COLOR[c.difficulty],
                  background: DIFF_COLOR[c.difficulty] + '18',
                  marginBottom: '0.75rem',
                }}>
                  {DIFF_LABEL[c.difficulty]}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.5rem',
                }}>
                  {c.title}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text2)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {c.description}
                </div>
                <div style={{
                  marginTop: '1rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--mono)',
                  color: 'var(--muted)',
                }}>
                  {c.total_tests} test{c.total_tests !== 1 ? 's' : ''}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

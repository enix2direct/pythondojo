const MESSAGES = {
  1: "First try. Clean.",
  2: "Two attempts — solid.",
  3: "Three tries — you got there.",
  4: "Four attempts — persistence pays off.",
  5: "Five attempts — the struggle was real.",
}

export default function SummaryScreen({ challenge, attempts, totalSolved, total, onNext, onBrowse }) {
  const msg = MESSAGES[attempts] || `${attempts} attempts — keep practising.`

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '3rem 2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignItems: 'center',
      }}>
        <div style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: '#39d35320',
          border: '2px solid var(--green)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          ✓
        </div>

        <div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--green)',
            marginBottom: '0.35rem',
          }}>
            Puzzle solved
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.85rem',
            color: 'var(--muted)',
          }}>
            {challenge.title}
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.82rem',
          color: 'var(--text2)',
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '0.75rem 1.25rem',
          width: '100%',
        }}>
          {msg}
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          fontSize: '0.78rem',
          fontFamily: 'var(--mono)',
          color: 'var(--muted)',
          width: '100%',
          justifyContent: 'center',
        }}>
          <span>
            <span style={{ color: 'var(--green)' }}>{totalSolved}</span> / {total} puzzles complete
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem',
                background: 'var(--green)',
                color: '#000',
                fontFamily: 'var(--mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.03em',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              next puzzle →
            </button>
          )}
          <button
            onClick={onBrowse}
            style={{
              padding: '0.75rem',
              background: 'transparent',
              color: 'var(--text2)',
              fontFamily: 'var(--mono)',
              fontSize: '0.85rem',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            choose another puzzle
          </button>
        </div>
      </div>
    </div>
  )
}

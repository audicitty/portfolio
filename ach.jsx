/* global React, Reveal, SectionLabel */
const { useState: useAS, useEffect: useAE } = React;

const ACHIEVEMENTS = [
  {
    title: 'MICRO1 CERTIFIED',
    sub: 'Human Data Manager certification',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="5"/>
        <path d="M8 12.5l-1 8 5-2.5 5 2.5-1-8"/>
      </svg>
    )
  },
  {
    title: 'AI / ML COURSE',
    sub: '100xDevs · LLMs from scratch, PyTorch',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="14" rx="1"/>
        <path d="M8 21h8M12 18v3"/>
      </svg>
    )
  },
  {
    title: 'CLARITYAI',
    sub: 'Built for Eka Care PM internship application',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.39 6.95H22l-6.18 4.49 2.39 6.95L12 16.9 5.79 20.39l2.39-6.95L2 8.95h7.61z"/>
      </svg>
    )
  }
];

function AchievementCard({ a }) {
  return (
    <div style={{
      border:'1px solid rgba(245,166,35,0.25)',
      padding: '28px 24px',
      background:'rgba(245,166,35,0.02)',
      transition: 'border-color 200ms ease, transform 200ms ease, background 200ms ease',
      minHeight: 180,
      display:'flex', flexDirection:'column'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(245,166,35,0.6)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.background = 'rgba(245,166,35,0.05)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(245,166,35,0.25)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.background = 'rgba(245,166,35,0.02)';
    }}>
      <div style={{
        width: 42, height: 42,
        border:'1px solid rgba(245,166,35,0.5)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'#F5A623'
      }}>{a.icon}</div>

      <h4 style={{
        fontFamily:"'Barlow Condensed', sans-serif", fontSize: 22,
        letterSpacing:'0.06em', marginTop: 24, lineHeight: 1
      }}>{a.title}</h4>

      <p style={{
        fontFamily:"'IBM Plex Mono', monospace", fontSize: 12,
        color:'#A0A0A0', lineHeight: 1.7, marginTop: 10
      }}>{a.sub}</p>

      <div style={{ flex: 1 }} />
      <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#F5A623', letterSpacing:'0.25em', marginTop: 18 }}>
        VERIFIED ✓
      </div>
    </div>
  );
}

/* ───────────────────────────── Humor overlay ───────────────────────────── */
const TERM_LINES = [
  "Initializing achievement database...",
  "Verifying certificates with LinkedIn...",
  "Cross-referencing with mom's WhatsApp...",
  "Consulting CGPA council...",
  "Running achievement integrity checks..."
];

function HumorOverlay({ onClose }) {
  const [printed, setPrinted] = useAS(0);
  const [progress, setProgress] = useAS(0);
  const [phase, setPhase] = useAS('lines');

  useAE(() => {
    if (phase !== 'lines') return;
    if (printed >= TERM_LINES.length) {
      const t = setTimeout(() => setPhase('progress'), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPrinted(p => p + 1), 600);
    return () => clearTimeout(t);
  }, [printed, phase]);

  useAE(() => {
    if (phase !== 'progress') return;
    const start = performance.now();
    const dur = 2800;
    let raf;
    const tick = (now) => {
      const p = Math.min(100, ((now - start) / dur) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setPhase('complete'), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useAE(() => {
    if (phase !== 'complete') return;
    const t = setTimeout(() => setPhase('reveal'), 700);
    return () => clearTimeout(t);
  }, [phase]);

  useAE(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div style={{
      position:'fixed', inset: 0, zIndex: 9999,
      background:'#000',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding: 24,
      overflow:'auto'
    }}>
      <div style={{ position:'absolute', top: 20, left: 24, fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#F5A623', letterSpacing:'0.25em' }}>
        // ACHIEVEMENT_DB v2.6.0 — ROOT@DIVYANSHU
      </div>
      <div style={{ position:'absolute', top: 20, right: 90, fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.25em' }}>
        ● SECURE SESSION
      </div>

      <button onClick={onClose}
        style={{
          position:'absolute', top: 14, right: 24,
          background:'transparent', border:'1px solid rgba(245,166,35,0.4)',
          color:'#F5A623', padding: '6px 14px',
          fontFamily:"'IBM Plex Mono', monospace", fontSize: 11,
          letterSpacing:'0.2em', cursor:'none'
        }}>
        ✕
      </button>

      <div style={{ width: '100%', maxWidth: 760 }}>
        <div style={{
          border: '1px solid rgba(245,166,35,0.25)',
          background:'rgba(245,166,35,0.02)',
          padding: '28px 32px'
        }}>
          <div style={{ display:'flex', gap: 6, marginBottom: 22 }}>
            <span style={{ width: 10, height: 10, borderRadius:'50%', background:'#ff5f56' }} />
            <span style={{ width: 10, height: 10, borderRadius:'50%', background:'#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius:'50%', background:'#27c93f' }} />
            <span style={{ marginLeft: 16, fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#A0A0A0', letterSpacing:'0.2em' }}>
              achievements.sh
            </span>
          </div>

          {TERM_LINES.slice(0, printed).map((l, i) => (
            <div key={i} className={'term-line ' + (i < printed - 1 || phase !== 'lines' ? 'complete' : '')}>
              <span style={{ color: '#71d690' }}>$ </span>
              <span style={{ color: '#cfcfcf' }}>{l}</span>
              {(i === printed - 1 && phase === 'lines') && <span className="caret" style={{ height: 12, marginLeft: 4, verticalAlign:'-1px' }} />}
            </div>
          ))}

          {(phase === 'progress' || phase === 'complete' || phase === 'reveal') && (
            <>
              <div className="term-line complete">
                <span style={{ color: '#71d690' }}>$ </span>
                <span style={{ color: '#cfcfcf' }}>Compiling achievement payload...</span>
              </div>

              <div style={{ marginTop: 14, display:'flex', alignItems:'center', gap: 14 }}>
                <div className="progress-track" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: progress + '%' }} />
                </div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, color:'#F5A623', width: 48, textAlign:'right' }}>
                  {Math.floor(progress)}%
                </div>
              </div>
            </>
          )}

          {(phase === 'complete' || phase === 'reveal') && (
            <div className="term-line" style={{ marginTop: 16, color:'#71d690' }}>
              <span>$ </span>
              <span style={{ color: '#fff' }}>LOAD COMPLETE. DISPLAYING ALL ACHIEVEMENTS.</span>
            </div>
          )}
        </div>

        {phase === 'reveal' && (
          <div style={{ textAlign:'center', marginTop: 48 }}>
            <div className="identity-tag" style={{
              fontFamily:"'Barlow Condensed', sans-serif",
              fontSize: 'clamp(40px, 8vw, 80px)',
              color: '#fff',
              textShadow: '0 0 20px rgba(245,166,35,0.8), 0 0 40px rgba(245,166,35,0.4)',
              animation: 'identityRise 800ms cubic-bezier(.34,1.56,.64,1) forwards',
              letterSpacing:'0.04em', lineHeight: 1
            }}>
              BAS ITNE HI HAIN BHAI.
            </div>
            <div style={{
              fontFamily:"'IBM Plex Mono', monospace", fontSize: 16,
              color:'#A0A0A0', marginTop: 18, opacity: 0,
              animation: 'identityRise 700ms 300ms forwards'
            }}>
              All 3 of them. Verified. Certified. Enough.
            </div>
            <div style={{
              fontSize: 56, marginTop: 24, opacity: 0,
              animation: 'identityRise 700ms 600ms forwards'
            }}>😐</div>

            <button onClick={onClose}
              className="btn-amber-outline"
              style={{
                marginTop: 36,
                fontFamily:"'IBM Plex Mono', monospace", fontSize: 12,
                letterSpacing:'0.25em', padding: '12px 28px',
                background:'transparent',
                opacity: 0,
                animation: 'identityRise 600ms 900ms forwards'
              }}>
              CLOSE ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Achievements() {
  const [open, setOpen] = useAS(false);
  return (
    <section id="achievements" style={{ padding:'120px 32px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel num="05">ACHIEVEMENTS</SectionLabel>
          <h2 style={{
            fontFamily:"'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 52px)',
            lineHeight: 1, marginTop: 6, letterSpacing:'0.02em'
          }}>RECEIPTS, <span style={{ color:'#F5A623' }}>SUCH AS THEY ARE</span></h2>
          <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#F5A623', marginTop: 10, letterSpacing:'0.2em' }}>
            CERTIFICATIONS · BUILDS · MOMENTS
          </div>
        </Reveal>

        <div className="ach-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 16, marginTop: 48
        }}>
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <AchievementCard a={a} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign:'center', marginTop: 48 }}>
            <button onClick={() => setOpen(true)} className="btn-amber-outline"
              style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, letterSpacing:'0.2em', padding:'14px 32px', textTransform:'uppercase' }}>
              See More Achievements →
            </button>
          </div>
        </Reveal>
      </div>

      {open && <HumorOverlay onClose={() => setOpen(false)} />}

      <style>{`
        @media (max-width: 800px) {
          .ach-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.Achievements = Achievements;

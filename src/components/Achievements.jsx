import { useState, useEffect } from 'react';
import { Reveal, SectionHead } from './Primitives.jsx';

const ACHIEVEMENTS = [
  {
    title: 'AI for Everyone',
    sub: 'DeepLearning.AI · Andrew Ng',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="5" />
        <path d="M8 12.5l-1 8 5-2.5 5 2.5-1-8" />
      </svg>
    )
  },
  {
    title: 'Internet of Things',
    sub: 'IIT Bombay · NPTEL certification',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="14" rx="1" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    )
  },
  {
    title: 'DSA Mastery',
    sub: 'Mastering Data Structures & Algorithms',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l2.39 6.95H22l-6.18 4.49 2.39 6.95L12 16.9 5.79 20.39l2.39-6.95L2 8.95h7.61z" />
      </svg>
    )
  }
];

function AchievementCard({ a }) {
  return (
    <div className="ach-card ring-trigger">
      <div className="ach-icon">{a.icon}</div>
      <h4 className="ach-title">{a.title}</h4>
      <p className="ach-sub">{a.sub}</p>
      <div className="ach-verified">Verified ✓</div>
    </div>
  );
}

/* ───────────── Humor overlay (kept, restyled) ───────────── */
const TERM_LINES = [
  "Initializing achievement database...",
  "Verifying certificates with LinkedIn...",
  "Cross-referencing with mom's WhatsApp...",
  "Consulting CGPA council...",
  "Running achievement integrity checks..."
];

function HumorOverlay({ onClose }) {
  const [printed, setPrinted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('lines');

  useEffect(() => {
    if (phase !== 'lines') return;
    if (printed >= TERM_LINES.length) {
      const t = setTimeout(() => setPhase('progress'), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPrinted(p => p + 1), 560);
    return () => clearTimeout(t);
  }, [printed, phase]);

  useEffect(() => {
    if (phase !== 'progress') return;
    const start = performance.now();
    const dur = 2600;
    let raf;
    const tick = now => {
      const p = Math.min(100, ((now - start) / dur) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase('complete'), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'complete') return;
    const t = setTimeout(() => setPhase('reveal'), 650);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Achievements terminal">
      <div style={{ position: 'absolute', top: 22, left: 28 }} className="t-mono-sm gold">
        // Achievement_DB v2.6.0 — root@divyanshu
      </div>
      <button onClick={onClose} className="btn btn-ghost"
        style={{ position: 'absolute', top: 16, right: 24, padding: '8px 16px' }}>
        Esc ✕
      </button>

      <div style={{ width: '100%', maxWidth: 760 }}>
        <div className="term-window">
          <div className="mock-bar" style={{ margin: '-26px -32px 22px', padding: '12px 18px' }}>
            <i style={{ background: '#ff5f56' }} /><i style={{ background: '#ffbd2e' }} /><i style={{ background: '#27c93f' }} />
            <span className="ttl">achievements.sh</span>
          </div>

          {TERM_LINES.slice(0, printed).map((l, i) => (
            <div key={i} className={'term-line ' + (i < printed - 1 || phase !== 'lines' ? 'complete' : '')}>
              <span className="ps">$ </span>{l}
              {(i === printed - 1 && phase === 'lines') && <span className="caret" style={{ height: 13, marginLeft: 5 }} />}
            </div>
          ))}

          {(phase === 'progress' || phase === 'complete' || phase === 'reveal') && (
            <>
              <div className="term-line complete">
                <span className="ps">$ </span>Compiling achievement payload...
              </div>
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="progress-track" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: progress + '%' }} />
                </div>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: 12, color: 'var(--gold)', width: 48, textAlign: 'right' }}>
                  {Math.floor(progress)}%
                </div>
              </div>
            </>
          )}

          {(phase === 'complete' || phase === 'reveal') && (
            <div className="term-line" style={{ marginTop: 16 }}>
              <span className="ps">$ </span>
              <span style={{ color: '#fff' }}>LOAD COMPLETE. DISPLAYING ALL ACHIEVEMENTS.</span>
            </div>
          )}
        </div>

        {phase === 'reveal' && (
          <div style={{ textAlign: 'center', marginTop: 'var(--s5)' }}>
            <div className="punchline rise">Bas itne hi hain bhai.</div>
            <div className="rise" style={{
              fontFamily: 'var(--f-mono)', fontSize: 15, color: 'var(--text-soft)',
              marginTop: 18, animationDelay: '300ms'
            }}>
              All 3 of them. Verified. Certified. Enough.
            </div>
            <div className="rise" style={{ fontSize: 52, marginTop: 22, animationDelay: '600ms' }}>😐</div>
            <button onClick={onClose} className="btn btn-ghost rise" style={{ marginTop: 34, animationDelay: '900ms' }}>
              Close ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Achievements() {
  const [open, setOpen] = useState(false);
  return (
    <section id="achievements" className="section">
      <div className="wrap">
        <SectionHead num="05" label="Achievements"
          title={<>Receipts, <span className="gold">such as they are</span></>}
          note="Certifications · Builds · Moments" />

        <div className="ach-grid">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <AchievementCard a={a} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: 'center', marginTop: 'var(--s6)' }}>
            <button onClick={() => setOpen(true)} className="btn btn-ghost">
              See more achievements <span className="arr">→</span>
            </button>
          </div>
        </Reveal>
      </div>

      {open && <HumorOverlay onClose={() => setOpen(false)} />}
    </section>
  );
}

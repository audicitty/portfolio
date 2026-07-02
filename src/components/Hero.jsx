import { useEffect, useState } from 'react';

const ROLES = ['Backend Developer', 'Full Stack Developer', 'AI Engineer'];

const MARQUEE_SKILLS = [
  'Next.js', 'Node.js', 'PostgreSQL', 'Python', 'PyTorch', 'TensorFlow',
  'React', 'Prisma', 'TypeScript', 'REST APIs', 'Git', 'Linux'
];

/* Live IST clock for the corner chrome */
function ISTClock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kolkata'
    });
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span>IST {now}</span>;
}

function RoleRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="hero-role-swap" aria-live="polite">
      <span className="word" key={idx}>{ROLES[idx]}</span>
    </span>
  );
}

export function Hero({ onNav }) {
  const marqueeBlock = (
    <span>
      {MARQUEE_SKILLS.map(s => <span key={s} className="marquee-item">{s}</span>)}
    </span>
  );

  return (
    <section id="top" className="hero">
      {/* video background */}
      <video className="hero-video-bg" autoPlay loop muted playsInline aria-hidden="true">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* atmosphere */}
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-glow g1" aria-hidden="true" />
      <div className="hero-glow g2" aria-hidden="true" />

      {/* corner chrome */}
      <div className="hero-corner l">// Portfolio — 2026</div>
      <div className="hero-corner r"><ISTClock /></div>

      <div className="hero-inner">
        <div className="hero-topline">
          <span className="t-mono-sm" style={{ color: 'var(--gold)' }}>Gurugram, India</span>
          <span className="rule" />
          <span className="t-mono-sm" style={{ color: 'var(--muted)' }}>Open to relocate</span>
        </div>

        <h1 className="t-hero hero-name">
          <span className="line"><span>Divyanshu</span></span>
          <span className="line">
            <span className="ghost" data-text="Bansal">Bansal</span>
          </span>
        </h1>

        <div className="hero-roles">
          <span className="hero-role-label">Currently —</span>
          <RoleRotator />
        </div>

        <div className="hero-cta">
          <button className="btn btn-fill" onClick={() => onNav('projects')}>
            View Projects <span className="arr">→</span>
          </button>
          <button className="btn btn-ghost" onClick={() => onNav('contact')}>
            Get in Touch <span className="arr">↗</span>
          </button>
        </div>
      </div>

      {/* status HUD */}
      <aside className="hero-hud" aria-label="Status">
        <div className="hud-row"><span className="k">Status</span><span className="v ok"><i className="hud-dot" />Open to work</span></div>
        <div className="hud-row"><span className="k">Focus</span><span className="v">Backend · AI</span></div>
        <div className="hud-row"><span className="k">Base</span><span className="v">Gurugram</span></div>
        <div className="hud-row"><span className="k">Roles</span><span className="v">SDE-1 / Full-time</span></div>
        <div className="hud-row"><span className="k">Response</span><span className="v">&lt; 24 hrs</span></div>
      </aside>

      <div className="scroll-hint" aria-hidden="true">
        <div className="lbl">Scroll</div>
        <div className="stem" />
      </div>

      {/* skill marquee */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">{marqueeBlock}{marqueeBlock}</div>
      </div>
    </section>
  );
}

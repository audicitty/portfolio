import { useState, useEffect, useRef } from 'react';
import { Reveal, SectionHead, CountUp, SocialIcon } from './Primitives.jsx';

/* ═══════════════════════ ABOUT ═══════════════════════ */
const TYPE_LINES = [
  "Final year CSE student @ BML Munjal University",
  "I build full stack apps, AI tools & trading platforms",
  "Currently hunting for SDE-1 / Backend / AI roles",
  "7.82 CGPA. Still applying. No regrets.",
  "Turning chai and commits into shipped products"
];

function Typewriter() {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPE_LINES[lineIdx];
    let t;
    if (!deleting) {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 38 + Math.random() * 28);
      } else {
        t = setTimeout(() => setDeleting(true), 2100);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), 20);
      } else {
        setDeleting(false);
        setLineIdx((lineIdx + 1) % TYPE_LINES.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, lineIdx]);

  return (
    <div className="type-line">
      <span className="prompt">▸</span>{text}<span className="caret" />
    </div>
  );
}

const ARSENAL = [
  { dom: 'Backend',  chips: ['Node.js', 'Express.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST APIs'] },
  { dom: 'Frontend', chips: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  { dom: 'AI · ML',  chips: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'pandas', 'NumPy'] },
  { dom: 'Tools',    chips: ['Git', 'Docker', 'Postman', 'GCP', 'CI/CD', 'VS Code'] }
];

export function About({ onNav }) {
  const stats = [
    ['5', '+',  'Projects Built'],
    ['15', '+', 'Languages & Frameworks'],
    ['1', '',   'Internship'],
    ['∞', '',   'Bugs Fixed (and created)']
  ];

  return (
    <section id="about" className="section noise">
      <div className="wrap">
        <SectionHead num="01" label="About" title={<>The person behind <span className="gold">the commits</span></>} />

        <div className="about-grid">
          <Reveal>
            <div className="photo-frame ring-trigger">
              <span className="corner tl" /><span className="corner tr2" />
              <span className="corner bl2" /><span className="corner br" />
              <img
                src="/profile.jpeg"
                alt="Divyanshu Bansal"
                className="photo-img"
              />
              <div className="scanline" aria-hidden="true" />
              <span className="tag bl">Subject_001 · DB</span>
              <span className="tag tr"><i className="hud-dot" style={{ background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />Live</span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="t-mono-sm" style={{ color: 'var(--muted)' }}>Hello, I'm</div>
              <h3 className="t-sub" style={{ fontSize: 'clamp(34px, 4.5vw, 52px)', marginTop: 10 }}>
                Divyanshu <span className="gold">Bansal</span>
              </h3>
              <Typewriter />
            </Reveal>

            <Reveal delay={100}>
              <p className="t-body-lg" style={{ marginTop: 28, maxWidth: 560 }}>
                Backend-leaning full stack engineer with a soft spot for AI tooling and clean APIs.
                I write a lot, ship in public, and prefer building things that actually work to
                writing about things that might.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <div className="stat-strip">
                {stats.map(([n, suf, l]) => (
                  <div key={l} className="stat-cell">
                    <div className="num">
                      {isNaN(parseFloat(n)) ? n : <CountUp value={n} suffix={suf} />}
                    </div>
                    <div className="lbl">{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div style={{ display: 'flex', gap: 14, marginTop: 'var(--s5)', flexWrap: 'wrap' }}>
                <button onClick={() => onNav('projects')} className="btn btn-fill">
                  View Projects <span className="arr">→</span>
                </button>
                <a href="/divyanshu_bansal_main.pdf" download="Divyanshu_Bansal_Resume.pdf" className="btn btn-ghost">
                  Download Resume <span className="arr">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* arsenal */}
        <Reveal delay={120}>
          <div className="arsenal">
            {ARSENAL.map(g => (
              <div key={g.dom} className="arsenal-row">
                <div className="dom">{g.dom}</div>
                <div className="chips">
                  {g.chips.map(c => <span key={c} className="chip ring-trigger">{c}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ EXPERIENCE ═══════════════════════ */
export function Experience() {
  const bullets = [
    "Collaborated in Agile sprints and team discussions while contributing to testing, debugging, and API integration across company platforms.",
    "Coordinated with backend engineers to ensure efficient database integration and smooth system performance.",
    "Contributed to testing, debugging, and UI/UX improvements for the Nudge app."
  ];

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead num="02" label="Experience" title={<>Field <span className="gold">operations</span></>} note="Deployment history" />

        <Reveal delay={100}>
          <div className="timeline">
            <span className="tl-node" />
            <div className="exp-card ring-trigger">
              <div className="exp-top">
                <span className="exp-status"><i className="hud-dot" style={{ background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />Mission complete</span>
                <span className="exp-dates">June 2024 — July 2024 · Bengaluru, India</span>
              </div>

              <div className="exp-body">
                <div>
                  <h3 className="t-sub" style={{ fontSize: 'clamp(26px, 3vw, 34px)' }}>Benciti Technology Ltd.</h3>
                  <div className="t-mono-sm" style={{ color: 'var(--gold)', marginTop: 12 }}>Research & Development Intern</div>
                  <div className="exp-meta">
                    <span>Status — <b>Completed</b></span>
                    <span>Duration — <b>2 months</b></span>
                    <span>Stack — <b>Testing · APIs · UI</b></span>
                  </div>
                </div>

                <div>
                  <div className="t-mono-sm" style={{ color: 'var(--gold)', marginBottom: 18 }}>Objectives</div>
                  <ul className="exp-bullets">
                    {bullets.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
                    {['Node.js', 'Express.js', 'REST APIs', 'SQL', 'Agile'].map(t => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ PROJECTS ═══════════════════════ */

/* mini UI mock visuals — pure CSS/SVG, one per project */
function MockTradeFlow() {
  return (
    <div className="mock-window">
      <div className="mock-bar"><i /><i /><i /><span className="ttl">tradeflow · NSE live</span></div>
      <div className="mock-body" style={{ display: 'grid', gridTemplateColumns: '1fr 86px', gap: 12, alignItems: 'center' }}>
        <svg viewBox="0 0 220 70" style={{ width: '100%' }}>
          <defs>
            <linearGradient id="tfFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(245,166,35,0.35)" />
              <stop offset="100%" stopColor="rgba(245,166,35,0)" />
            </linearGradient>
          </defs>
          <path d="M0 56 L24 48 L48 52 L72 38 L96 42 L120 28 L144 33 L168 18 L192 24 L220 8 L220 70 L0 70 Z" fill="url(#tfFill)" />
          <path d="M0 56 L24 48 L48 52 L72 38 L96 42 L120 28 L144 33 L168 18 L192 24 L220 8"
                fill="none" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: 9, lineHeight: 2, color: 'var(--muted)' }}>
          <div>NIFTY <span style={{ color: '#6FE3A0' }}>▲ 1.2%</span></div>
          <div>TCS <span style={{ color: '#6FE3A0' }}>▲ 0.8%</span></div>
          <div>HDFC <span style={{ color: '#FF7A6B' }}>▼ 0.3%</span></div>
        </div>
      </div>
    </div>
  );
}

function MockClarity() {
  return (
    <div className="mock-window">
      <div className="mock-bar"><i /><i /><i /><span className="ttl">clarityai · structure</span></div>
      <div className="mock-body" style={{ display: 'grid', gridTemplateColumns: '1fr 14px 1fr', gap: 10, alignItems: 'center' }}>
        <div>
          <div className="mline" style={{ width: '95%' }} /><div className="mline" style={{ width: '80%' }} />
          <div className="mline" style={{ width: '90%' }} /><div className="mline" style={{ width: '65%', marginBottom: 0 }} />
        </div>
        <div style={{ color: 'var(--violet)', fontSize: 11, textAlign: 'center' }}>→</div>
        <div>
          <div className="mline violet" style={{ width: '55%' }} />
          <div className="mline" style={{ width: '85%' }} />
          <div className="mline violet" style={{ width: '45%' }} />
          <div className="mline" style={{ width: '75%', marginBottom: 0 }} />
        </div>
      </div>
    </div>
  );
}

function MockGenie() {
  return (
    <div className="mock-window">
      <div className="mock-bar"><i /><i /><i /><span className="ttl">promptgenie · v3</span></div>
      <div className="mock-body">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid var(--line-strong)', borderRadius: 8, padding: '9px 12px'
        }}>
          <div style={{ flex: 1 }}>
            <div className="mline gold" style={{ width: '72%', marginBottom: 0 }} />
          </div>
          <span style={{ color: 'var(--gold)', fontSize: 13 }}>✦</span>
        </div>
        <div style={{ marginTop: 9, fontFamily: 'var(--f-mono)', fontSize: 8.5, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Prompt enhanced · Claude API
        </div>
      </div>
    </div>
  );
}

function MockGIS() {
  const cells = ['g','v','g','d','g','g','v','g','d','g','v','g','g','d','g','g','v','g','g','g','d','v','g','g'];
  const color = c => c === 'g' ? 'rgba(111,227,160,0.5)' : c === 'v' ? 'rgba(157,92,255,0.5)' : 'rgba(245,166,35,0.45)';
  return (
    <div className="mock-window">
      <div className="mock-bar"><i /><i /><i /><span className="ttl">landsat-8 · classified</span></div>
      <div className="mock-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 3 }}>
          {cells.map((c, i) => (
            <div key={i} style={{ aspectRatio: '1', borderRadius: 2, background: color(c), opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ marginTop: 9, fontFamily: 'var(--f-mono)', fontSize: 8.5, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Accuracy 92.4% · Random Forest
        </div>
      </div>
    </div>
  );
}

function MockEComm() {
  return (
    <div className="mock-window">
      <div className="mock-bar"><i /><i /><i /><span className="ttl">mern-shop · products</span></div>
      <div className="mock-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ border: '1px solid var(--line-strong)', borderRadius: 3, padding: '6px 5px' }}>
              <div style={{ height: 22, background: 'rgba(111,227,160,0.15)', borderRadius: 2, marginBottom: 5 }} />
              <div className="mline" style={{ width: '80%' }} />
              <div className="mline gold" style={{ width: '50%', marginBottom: 0 }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 9, fontFamily: 'var(--f-mono)', fontSize: 8.5, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          JWT Auth · Admin Panel · MongoDB
        </div>
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    n: '01', name: 'TradeFlow India', accent: '#F5A623', accentDim: 'rgba(245,166,35,0.16)',
    type: 'Full Stack · Fintech',
    desc: 'Paper trading platform for Indian markets. Real-time NSE/BSE data, portfolio tracking, leaderboards.',
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Zustand', 'Vercel'],
    Mock: MockTradeFlow
  },
  {
    n: '02', name: 'ClarityAI', accent: '#9D5CFF', accentDim: 'rgba(157,92,255,0.16)',
    type: 'AI Tool · Productivity',
    desc: 'AI-powered text structuring tool. Converts messy input into TL;DR, action items, decisions, open questions.',
    tech: ['Next.js', 'Gemini API', 'Vercel'],
    Mock: MockClarity
  },
  {
    n: '03', name: 'PromptGenie', accent: '#F5A623', accentDim: 'rgba(245,166,35,0.16)',
    type: 'Chrome Extension · AI',
    desc: 'Chrome extension that enhances prompts using Claude API. Manifest V3, context-aware prompt rewriting.',
    tech: ['JavaScript', 'Chrome APIs', 'Claude API', 'Manifest V3'],
    Mock: MockGenie
  },
  {
    n: '04', name: 'GIS ML Pipeline', accent: '#9D5CFF', accentDim: 'rgba(157,92,255,0.16)',
    type: 'Machine Learning · Geospatial',
    desc: 'Satellite imagery classification with 92%+ accuracy using Stratified Random Forest on Landsat-8 and Sentinel-2 data.',
    tech: ['Python', 'Scikit-learn', 'Landsat-8', 'Sentinel-2'],
    Mock: MockGIS
  },
  {
    n: '05', name: 'MERN E-Commerce', accent: '#6FE3A0', accentDim: 'rgba(111,227,160,0.16)',
    type: 'Full Stack · E-Commerce',
    desc: 'Production-ready e-commerce platform with JWT auth, admin dashboard, product management with image uploads, and real-time inventory tracking.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    Mock: MockEComm
  }
];

/* subtle 3D tilt on pointer */
function useTilt() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let raf = null;
    const onMove = e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${(-py * 3.5).toFixed(2)}deg) rotateY(${(px * 3.5).toFixed(2)}deg) translateY(-4px)`;
      });
    };
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
      el.style.transition = 'transform 600ms var(--ease-out)';
      setTimeout(() => { el.style.transition = ''; }, 600);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return ref;
}

function ProjectCard({ p }) {
  const ref = useTilt();
  const Mock = p.Mock;
  return (
    <article ref={ref} className="project-card ring-trigger"
      style={{ '--pa': p.accent, '--pa-dim': p.accentDim }}>
      <div className="proj-visual">
        <div className="pv-grid" aria-hidden="true" />
        <span className="wm" aria-hidden="true">{p.n}</span>
        <div className="pv-inner"><Mock /></div>
      </div>

      <div className="proj-meta">
        <div className="proj-kicker">Project_{p.n}<span className="rule" />{p.type}</div>
        <h3 className="proj-title">{p.name}<span className="go">↗</span></h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-tech">
          {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
        <div className="proj-foot">
          <div className="proj-links">
            <a href="#" className="icon-btn" aria-label="GitHub repository"><SocialIcon kind="github" /></a>
            <a href="#" className="icon-btn" aria-label="Live demo"><SocialIcon kind="external" /></a>
          </div>
          <a href="#" className="case-link">Case study <span className="arr">→</span></a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section noise">
      <div className="wrap">
        <SectionHead num="03" label="Projects" title={<>Things I've <span className="gold">built</span></>} note="Selected works · Click to explore" />

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign: 'center', marginTop: 'var(--s6)' }}>
            <a href="https://github.com/audicitty" className="btn btn-ghost">
              View all projects <span className="arr">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ EDUCATION ═══════════════════════ */
function CGPARing({ pct = 78.2 }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const r = 56, c = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { setDrawn(true); io.unobserve(el); } });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} className="cgpa-ring" width="150" height="150" viewBox="0 0 140 140" role="img" aria-label="CGPA 7.82 out of 10">
      <defs>
        <linearGradient id="cgpaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFC24B" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>
      <circle className="track" cx="70" cy="70" r={r} strokeWidth="6" fill="none" />
      <circle className="fill" cx="70" cy="70" r={r} strokeWidth="6" fill="none"
        strokeLinecap="round" strokeDasharray={c}
        strokeDashoffset={drawn ? c - (pct / 100) * c : c}
        transform="rotate(-90 70 70)" />
      <text x="70" y="68" textAnchor="middle" fill="#F5A623"
        style={{ fontFamily: 'var(--f-display)', fontWeight: 800, fontSize: 30, letterSpacing: '0.02em' }}>
        7.82
      </text>
      <text x="70" y="88" textAnchor="middle" fill="#847F73"
        style={{ fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.22em' }}>
        CGPA / 10
      </text>
    </svg>
  );
}

export function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead num="04" label="Education" title={<>Academic <span className="gold">record</span></>} />

        <Reveal delay={100}>
          <div className="edu-card ring-trigger">
            <div>
              <div className="t-mono-sm" style={{ color: 'var(--gold)', marginBottom: 12 }}>Bachelor of Technology</div>
              <h3 className="t-sub" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}>BML Munjal University</h3>
            </div>
            <div className="edu-detail">
              Computer Science & Engineering
              <span className="yrs">2022 — 2026</span>
              <span className="cg">CGPA · 7.82 / 10.0</span>
            </div>
            <div className="cgpa-wrap"><CGPARing /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */
export function Testimonials() {
  const items = [
    {
      quote: "They said something really nice about me here. Probably.",
      name: 'Name Here', role: 'Engineering Manager, Company', initials: 'NH'
    },
    {
      quote: "They said something really nice about me here. Probably. The second one is also a placeholder.",
      name: 'Another Person', role: 'Senior Dev, Somewhere Cool', initials: 'AP'
    }
  ];

  return (
    <section className="section">
      <div className="wrap">
        <SectionHead num="06" label="Testimonials" title={<>What people <span className="gold">say</span></>} note="(at least, what they said on LinkedIn)" />

        <div className="testi-grid">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 110}>
              <div className="testi-card ring-trigger">
                <span className="q" aria-hidden="true">"</span>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-person">
                  <div className="testi-ava">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
                <div className="testi-note">// add real recommendations here</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CONTACT ═══════════════════════ */
export function Contact() {
  const links = [
    { kind: 'mail', t: 'divyanshubansal323@gmail.com', href: 'mailto:divyanshubansal323@gmail.com' },
    { kind: 'linkedin', t: 'linkedin.com/in/divyanshu-bansal', href: 'https://www.linkedin.com/in/divyanshu-bansal-811820298/' },
    { kind: 'github', t: 'github.com/audicitty', href: 'https://github.com/audicitty' }
  ];

  return (
    <section id="contact" className="section contact-sec">
      <div className="bg-glow" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="idx">07</span>Contact
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="t-title" style={{ fontSize: 'clamp(48px, 8vw, 110px)', marginTop: 'var(--s3)' }}>
            Let's build <span className="gold">something</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="t-body-lg" style={{ maxWidth: 560, margin: '28px auto 0' }}>
            I'm actively looking for SDE-1, Backend, and AI/ML roles. Open to full-time,
            internships, and interesting projects.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <a href="mailto:divyanshubansal323@gmail.com" className="contact-mail">divyanshubansal323@gmail.com</a>
        </Reveal>

        <Reveal delay={290}>
          <div className="contact-links">
            {links.map(l => (
              <a key={l.t} href={l.href} className="contact-pill">
                <span className="ico"><SocialIcon kind={l.kind} /></span>{l.t}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={360}>
          <a href="mailto:divyanshubansal323@gmail.com" className="btn btn-fill" style={{ marginTop: 'var(--s6)', fontSize: 13, padding: '16px 36px' }}>
            Send message <span className="arr">↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* global React, Reveal, SectionLabel */
const { useState: useS, useEffect: useE, useRef: useR } = React;

/* ───────────────────────────── About ───────────────────────────── */
const TYPE_LINES = [
  "Final year CSE student @ BML Munjal University",
  "I build full stack apps, AI tools & trading platforms",
  "Currently hunting for SDE-1 / Backend / AI roles",
  "7.82 CGPA. Still applying. No regrets.",
  "Turning chai and commits into shipped products"
];

function Typewriter() {
  const [lineIdx, setLineIdx] = useS(0);
  const [text, setText] = useS('');
  const [deleting, setDeleting] = useS(false);

  useE(() => {
    const full = TYPE_LINES[lineIdx];
    let t;
    if (!deleting) {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 40 + Math.random() * 30);
      } else {
        t = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), 22);
      } else {
        setDeleting(false);
        setLineIdx((lineIdx + 1) % TYPE_LINES.length);
      }
    }
    return () => clearTimeout(t);
  }, [text, deleting, lineIdx]);

  return (
    <div style={{
      fontFamily:"'IBM Plex Mono', monospace", fontSize: 16,
      color:'#cfcfcf', minHeight: 30, marginTop: 20
    }}>
      <span style={{ color:'#F5A623', marginRight: 10 }}>▸</span>
      {text}
      <span className="caret" style={{ height: 18, verticalAlign: '-3px' }} />
    </div>
  );
}

function About({ onNav }) {
  const stats = [
    ['5+',  'Projects Built'],
    ['15+', 'Languages & Frameworks'],
    ['1',   'Internship'],
    ['∞',   'Bugs Fixed (and created)']
  ];

  return (
    <section id="about" className="noise-bg" style={{
      padding: '120px 32px',
      borderTop:'1px solid rgba(245,166,35,0.15)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <SectionLabel num="01">ABOUT</SectionLabel>
        </Reveal>

        <div style={{
          display:'grid',
          gridTemplateColumns: '380px 1fr',
          gap: 80,
          marginTop: 40,
          alignItems:'start'
        }} className="about-grid">
          <Reveal>
            <div className="photo-frame">
              <span className="corner tl"/><span className="corner tr"/>
              <span className="corner bl"/><span className="corner br"/>
              <img
                src="meee.jpeg"
                alt="Divyanshu Bansal"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block'
                }}
              />
              <div style={{
                position:'absolute', bottom: 10, left: 12,
                fontFamily:"'IBM Plex Mono', monospace", fontSize: 9,
                color: 'rgba(245,166,35,0.6)', letterSpacing:'0.2em'
              }}>SUBJECT_001 · DB</div>
              <div style={{
                position:'absolute', top: 10, right: 12,
                fontFamily:"'IBM Plex Mono', monospace", fontSize: 9,
                color: 'rgba(245,166,35,0.6)', letterSpacing:'0.2em'
              }}>● LIVE</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 13, color:'#A0A0A0', letterSpacing:'0.2em' }}>
              HELLO, I'M
            </div>
            <h2 style={{
              fontFamily:"'Barlow Condensed', sans-serif",
              fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1,
              color:'#fff', letterSpacing:'0.02em', marginTop: 6
            }}>
              DIVYANSHU <span style={{ color:'#F5A623' }}>BANSAL</span>
            </h2>
            <div style={{ width: 60, height: 1, background:'#F5A623', marginTop: 18 }} />

            <Typewriter />

            <p style={{ color:'#A0A0A0', fontSize: 13, lineHeight: 1.8, marginTop: 28, maxWidth: 540 }}>
              Backend-leaning full stack engineer with a soft spot for AI tooling and clean APIs.
              I write a lot, ship in public, and prefer building things that actually work to
              writing about things that might.
            </p>

            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              gap: 16, marginTop: 40, maxWidth: 540
            }}>
              {stats.map(([n, l]) => (
                <div key={l} className="stat-card">
                  <div style={{
                    fontFamily:"'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 42,
                    color:'#F5A623', lineHeight: 1, letterSpacing:'-0.02em'
                  }}>{n}</div>
                  <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#A0A0A0', marginTop: 4, letterSpacing:'0.1em' }}>
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', gap: 14, marginTop: 32, flexWrap:'wrap' }}>
              <button onClick={() => onNav('projects')} className="btn-amber-fill"
                style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, letterSpacing:'0.15em', padding:'12px 22px', textTransform:'uppercase' }}>
                View Projects →
              </button>
              <a href="divyanshu_resume_1.pdf"
                 download="Divyanshu_Bansal_Resume.pdf"
                 style={{ textDecoration:'none' }}>
                <button className="btn-amber-outline"
                  style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, letterSpacing:'0.15em', padding:'12px 22px', textTransform:'uppercase' }}>
                  Download Resume ↓
                </button>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────────── Experience ───────────────────────────── */
function Experience() {
  const bullets = [
    "Built and maintained backend APIs using Node.js and Express",
    "Worked on database design and optimization with SQL",
    "Collaborated with cross-functional team in agile environment",
    "Delivered features under production deadlines"
  ];

  return (
    <section id="experience" style={{ padding:'120px 32px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel num="02">EXPERIENCE</SectionLabel>
          <h2 style={{
            fontFamily:"'Barlow Condensed', sans-serif", fontSize:'clamp(36px, 5vw, 56px)',
            lineHeight: 1, marginTop: 6, letterSpacing:'0.02em'
          }}>
            FIELD <span style={{ color:'#F5A623' }}>OPERATIONS</span>
          </h2>
          <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#F5A623', marginTop: 10, letterSpacing:'0.2em' }}>
            DEPLOYMENT HISTORY
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mission-card" style={{ marginTop: 56 }}>
            <div className="mission-bar">
              ▶ MISSION ACTIVE  ·  JUNE 2024 — AUG 2024  ·  BENGALURU, INDIA
            </div>

            <div className="exp-body" style={{ padding: '32px 40px', display:'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56 }}>
              <div>
                <div style={{
                  fontFamily:"'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 34,
                  letterSpacing:'-0.01em', lineHeight: 1.05
                }}>BENCITI TECHNOLOGY LTD.</div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, color:'#F5A623', marginTop: 10, letterSpacing:'0.15em' }}>
                  SOFTWARE ENGINEERING INTERN
                </div>
                <div style={{ width: 60, height: 1, background:'#F5A623', marginTop: 14, opacity: 0.7 }} />

                <div style={{ marginTop: 22, fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#A0A0A0', letterSpacing:'0.1em', lineHeight: 2 }}>
                  <div>STATUS · COMPLETED</div>
                  <div>DURATION · 3 MONTHS</div>
                  <div>STACK · SERVER + DATA</div>
                </div>
              </div>

              <div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#F5A623', letterSpacing:'0.25em', marginBottom: 14 }}>
                  OBJECTIVES
                </div>
                <ul style={{ listStyle:'none', padding: 0, margin: 0 }}>
                  {bullets.map(b => (
                    <li key={b} style={{
                      fontFamily:"'IBM Plex Mono', monospace", fontSize: 13,
                      color:'#A0A0A0', lineHeight: 2, paddingLeft: 20, position:'relative'
                    }}>
                      <span style={{ position:'absolute', left: 0, color:'#F5A623' }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{ display:'flex', flexWrap:'wrap', gap: 8, marginTop: 28 }}>
                  {['Node.js','Express','SQL','Agile','REST APIs'].map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .exp-body { grid-template-columns: 1fr !important; gap: 28px !important; padding: 28px !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────────── Projects ───────────────────────────── */
const PROJECTS = [
  {
    n: '01', name:'TRADEFLOW INDIA', accent:'#F5A623',
    type:'FULL STACK · FINTECH',
    desc:'Paper trading platform for Indian markets. Real-time NSE/BSE data, portfolio tracking, leaderboards.',
    tech:['Next.js','Prisma','PostgreSQL','NextAuth','Zustand','Vercel']
  },
  {
    n: '02', name:'CLARITYAI', accent:'#7B2FBE',
    type:'AI TOOL · PRODUCTIVITY',
    desc:'AI-powered text structuring tool. Converts messy input into TL;DR, action items, decisions, open questions.',
    tech:['Next.js','Gemini API','Vercel']
  },
  {
    n: '03', name:'PROMPTGENIE', accent:'#F5A623',
    type:'CHROME EXTENSION · AI',
    desc:'Chrome extension that enhances prompts using Claude API. Manifest V3, context-aware prompt rewriting.',
    tech:['JavaScript','Chrome APIs','Claude API','Manifest V3']
  },
  {
    n: '04', name:'GIS ML PIPELINE', accent:'#7B2FBE',
    type:'MACHINE LEARNING · GEOSPATIAL',
    desc:'Satellite imagery classification with 92%+ accuracy using Stratified Random Forest on Landsat-8 and Sentinel-2 data.',
    tech:['Python','Scikit-learn','Landsat-8','Sentinel-2']
  }
];

function ProjectCard({ p }) {
  return (
    <div className="project-card ring-trigger">
      <div className="accent-bar" style={{ background: p.accent }} />
      <div className="watermark">{p.n}</div>

      <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 6, position:'relative', zIndex: 2 }}>
        <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color: p.accent, letterSpacing:'0.25em' }}>
          PROJECT_{p.n}
        </div>
        <div style={{ flex: 1, height: 1, background:'rgba(255,255,255,0.06)' }} />
      </div>

      <h3 style={{
        fontFamily:"'Barlow Condensed', sans-serif", fontSize: 28,
        letterSpacing:'0.04em', lineHeight: 1, marginTop: 6, position:'relative', zIndex: 2
      }}>{p.name}</h3>

      <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color: p.accent, marginTop: 8, letterSpacing:'0.2em', position:'relative', zIndex: 2 }}>
        {p.type}
      </div>

      <p style={{ color:'#A0A0A0', fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, lineHeight: 1.7, marginTop: 18, position:'relative', zIndex: 2 }}>
        {p.desc}
      </p>

      <div style={{ display:'flex', flexWrap:'wrap', gap: 6, marginTop: 18, position:'relative', zIndex: 2 }}>
        {p.tech.map(t => (
          <span key={t} className="tech-pill" style={{
            borderColor: p.accent === '#F5A623' ? 'rgba(245,166,35,0.45)' : 'rgba(123,47,190,0.5)',
            color: p.accent === '#F5A623' ? '#f0c777' : '#cfb6e8'
          }}>{t}</span>
        ))}
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 24, position:'relative', zIndex: 2 }}>
        <div style={{ display:'flex', gap: 8 }}>
          <a href="#" className="icon-btn" aria-label="github">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
          </a>
          <a href="#" className="icon-btn" aria-label="external">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M14 5h5v5"/><path d="M19 5l-9 9"/><path d="M19 14v5H5V5h5"/>
            </svg>
          </a>
        </div>
        <a href="#" style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#F5A623', letterSpacing:'0.15em', textTransform:'uppercase' }}>
          Case Study →
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="noise-bg" style={{ padding:'120px 32px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel num="03">PROJECTS</SectionLabel>
          <h2 style={{
            fontFamily:"'Barlow Condensed', sans-serif", fontSize: 'clamp(40px, 5.5vw, 60px)',
            lineHeight: 1, marginTop: 6, letterSpacing:'0.02em'
          }}>
            THINGS I'VE <span style={{ color:'#F5A623' }}>BUILT</span>
          </h2>
          <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#F5A623', marginTop: 10, letterSpacing:'0.2em' }}>
            SELECTED WORKS  ·  CLICK TO EXPLORE
          </div>
        </Reveal>

        <div className="projects-grid" style={{
          display:'grid', gridTemplateColumns:'1fr 1fr',
          gap: 1, background:'rgba(255,255,255,0.06)', marginTop: 56
        }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ textAlign:'center', marginTop: 56 }}>
            <button className="btn-amber-outline"
              style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, letterSpacing:'0.2em', padding:'14px 32px', textTransform:'uppercase' }}>
              View All Projects →
            </button>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────────── Education ───────────────────────────── */
function CGPARing({ pct = 78.2 }) {
  const r = 56, c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
      <circle cx="70" cy="70" r={r}
        stroke="#F5A623" strokeWidth="6" fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 70 70)"
        style={{ filter: 'drop-shadow(0 0 8px rgba(245,166,35,0.6))' }} />
      <text x="70" y="68" textAnchor="middle" fill="#F5A623"
        style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize: 32, letterSpacing:'0.03em' }}>
        7.82
      </text>
      <text x="70" y="88" textAnchor="middle" fill="#A0A0A0"
        style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 9, letterSpacing:'0.2em' }}>
        CGPA / 10
      </text>
    </svg>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding:'120px 32px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel num="04">EDUCATION</SectionLabel>
        </Reveal>

        <Reveal delay={120}>
          <div className="edu-card edu-row" style={{
            display:'grid', gridTemplateColumns:'1.4fr 1fr 160px',
            gap: 40, alignItems:'center', marginTop: 32
          }}>
            <div>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#F5A623', letterSpacing:'0.25em', marginBottom: 8 }}>
                ACADEMIC RECORD
              </div>
              <h3 style={{
                fontFamily:"'Barlow Condensed', sans-serif", fontSize: 36,
                letterSpacing:'0.03em', lineHeight: 1
              }}>BML MUNJAL UNIVERSITY</h3>
            </div>

            <div>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 13, color:'#cfcfcf' }}>
                B.Tech — Computer Science & Engineering
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#F5A623', marginTop: 8, letterSpacing:'0.2em' }}>
                2022 — 2026
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 11, color:'#A0A0A0', marginTop: 4, letterSpacing:'0.1em' }}>
                CGPA · 7.82 / 10.0
              </div>
            </div>

            <div style={{ justifySelf:'end' }}>
              <CGPARing />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .edu-row { grid-template-columns: 1fr !important; gap: 24px !important; }
          .edu-row > div:last-child { justify-self: start !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────────── Testimonials ───────────────────────────── */
function Testimonials() {
  const items = [
    {
      quote: "They said something really nice about me here. Probably.",
      name:'Name Here', role:'Engineering Manager, Company', initials:'NH'
    },
    {
      quote: "They said something really nice about me here. Probably. The second one is also a placeholder.",
      name:'Another Person', role:'Senior Dev, Somewhere Cool', initials:'AP'
    }
  ];

  return (
    <section style={{ padding:'120px 32px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin:'0 auto' }}>
        <Reveal>
          <SectionLabel num="06">TESTIMONIALS</SectionLabel>
          <h2 style={{
            fontFamily:"'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 52px)',
            lineHeight: 1, letterSpacing:'0.02em', marginTop: 6
          }}>WHAT PEOPLE <span style={{ color:'#F5A623' }}>SAY</span></h2>
          <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, color:'#A0A0A0', marginTop: 10 }}>
            (at least, what they said on LinkedIn)
          </div>
        </Reveal>

        <div className="testi-grid" style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, marginTop: 48
        }}>
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{
                borderLeft: '2px solid #F5A623',
                padding: '24px 28px',
                background:'rgba(255,255,255,0.015)',
                position:'relative',
                minHeight: 200
              }}>
                <span style={{
                  position:'absolute', top:-4, left: 16,
                  fontFamily:"'Barlow Condensed', sans-serif", fontSize: 80,
                  color:'rgba(245,166,35,0.18)', lineHeight: 1
                }}>"</span>

                <p style={{
                  fontFamily:"'IBM Plex Mono', monospace", fontSize: 13,
                  color:'#cfcfcf', lineHeight: 1.8, marginTop: 28
                }}>{t.quote}</p>

                <div style={{ display:'flex', alignItems:'center', gap: 14, marginTop: 24 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius:'50%',
                    background:'#F5A623', color:'#000',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:"'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing:'0.05em'
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, color:'#fff' }}>{t.name}</div>
                    <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#A0A0A0', marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>

                <div style={{
                  marginTop: 18, fontFamily:"'IBM Plex Mono', monospace", fontSize: 10,
                  color:'rgba(255,255,255,0.25)', fontStyle:'italic'
                }}>
                  // add real recommendations here
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ───────────────────────────── Contact ───────────────────────────── */
function Contact() {
  const links = [
    { i:'✉', t:'divyanshu@email.com', href:'mailto:divyanshu@email.com' },
    { i:'↗', t:'linkedin.com/in/divyanshu', href:'#' },
    { i:'⌥', t:'github.com/audicitty', href:'https://github.com/audicitty' }
  ];

  return (
    <section id="contact" style={{ padding:'140px 32px 120px', borderTop:'1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 900, margin:'0 auto', textAlign:'center' }}>
        <Reveal>
          <SectionLabel num="07">CONTACT</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{
            fontFamily:"'Barlow Condensed', sans-serif", fontSize: 'clamp(44px, 7vw, 84px)',
            lineHeight: 1, letterSpacing:'0.02em', marginTop: 16
          }}>LET'S BUILD <span style={{ color:'#F5A623' }}>SOMETHING</span></h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            fontFamily:"'IBM Plex Mono', monospace", fontSize: 14, color:'#A0A0A0',
            lineHeight: 1.8, maxWidth: 540, margin: '24px auto 0'
          }}>
            I'm actively looking for SDE-1, Backend, and AI/ML roles. Open to full-time,
            internships, and interesting projects.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div style={{ display:'flex', flexDirection:'column', gap: 14, alignItems:'center', marginTop: 48 }}>
            {links.map(l => (
              <a key={l.t} href={l.href} className="contact-link"
                style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize: 14, color:'#cfcfcf', letterSpacing:'0.06em' }}>
                <span style={{ color:'#F5A623', marginRight: 12 }}>{l.i}</span>{l.t}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={320}>
          <a href="mailto:divyanshu@email.com" className="btn-amber-fill"
            style={{
              display:'inline-block', marginTop: 48,
              fontFamily:"'Barlow Condensed', sans-serif", fontSize: 20,
              letterSpacing:'0.18em', padding:'14px 36px'
            }}>
            SEND MESSAGE ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { About, Experience, Projects, Education, Testimonials, Contact });

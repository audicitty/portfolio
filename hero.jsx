/* global React */
const { useEffect, useState, useRef: useHeroRef } = React;

/* Skill race groups */
const SKILL_GROUPS = [
  { dir: 'left',  color: 'amber',  skills: ['NEXT.JS','NODE.JS','POSTGRESQL'] },
  { dir: 'right', color: 'purple', skills: ['PYTHON','PYTORCH','TENSORFLOW'] },
  { dir: 'left',  color: 'amber',  skills: ['REACT','PRISMA','TYPESCRIPT'] },
  { dir: 'right', color: 'purple', skills: ['REST APIs','GIT','LINUX'] }
];

const IDENTITY = ['BACKEND DEVELOPER','FULL STACK DEVELOPER','AI ENGINEER'];

/* Static particle positions (stable across renders) */
const PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
  left: `${(i * 4.55 + 7) % 96}%`,
  top:  `${(i * 11.3 + 13) % 90}%`,
  delay: `${(i * 0.31) % 3}s`,
  dur:  `${3 + (i * 0.17) % 3.5}s`,
  color: i % 3 === 0 ? '#7B2FBE' : '#F5A623',
  size: i % 4 === 0 ? 4 : (i % 3 === 0 ? 2 : 3)
}));

function Particles() {
  return (
    <>
      {PARTICLES.map((p, i) => (
        <span key={i} className="particle"
          style={{
            left: p.left, top: p.top,
            background: p.color,
            width: p.size, height: p.size,
            boxShadow: `0 0 8px ${p.color}`,
            animation: `floatY ${p.dur} ease-in-out ${p.delay} infinite alternate`
          }} />
      ))}
    </>
  );
}

function Hero({ onNav }) {
  // step: which group is racing (0..3), or 'identity', or 'pause'
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState('group'); // 'group' | 'identity' | 'rest'
  const [groupIdx, setGroupIdx] = useState(0);
  const [identityShown, setIdentityShown] = useState(0);

  useEffect(() => {
    let timers = [];
    const schedule = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

    // Each group: 2.6s animation, then advance.
    const runGroup = (idx) => {
      setPhase('group');
      setGroupIdx(idx);
      schedule(() => {
        if (idx < SKILL_GROUPS.length - 1) {
          runGroup(idx + 1);
        } else {
          // pause 400ms then identity
          schedule(runIdentity, 400);
        }
      }, 2700);
    };

    const runIdentity = () => {
      setPhase('identity');
      setIdentityShown(1);
      schedule(() => setIdentityShown(2), 600);
      schedule(() => setIdentityShown(3), 1200);
      // hold 3s, then restart cycle
      schedule(() => {
        setPhase('rest');
        setIdentityShown(0);
        schedule(() => {
          setCycle(c => c + 1);
          runGroup(0);
        }, 600);
      }, 1200 + 2800);
    };

    runGroup(0);
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line
  }, []);

  // Render group skills with stagger
  const renderGroup = () => {
    if (phase !== 'group') return null;
    const g = SKILL_GROUPS[groupIdx];
    const cls = g.dir === 'left' ? 'race-left' : 'race-right';
    // Vertical positions stacked slightly
    const yOffsets = [-66, 0, 66];
    return g.skills.map((s, i) => (
      <div key={`${cycle}-${groupIdx}-${i}`}
           className={`skill-pill ${g.color} ${cls}`}
           style={{
             marginTop: yOffsets[i],
             animationDelay: `${i * 150}ms`
           }}>
        {s}
      </div>
    ));
  };

  return (
    <section id="top" style={{
      position:'relative',
      height: '100vh',
      minHeight: 640,
      overflow:'hidden',
      background:'#000'
    }}>
      {/* video background */}
      <div style={{ position:'absolute', inset:0, zIndex:1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        >
          <source src="hero-video.mp4" type="video/mp4" />
        </video>
        {/* dark overlay to keep text readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)'
        }} />
      </div>

      {/* particles */}
      <div style={{ position:'absolute', inset:0, zIndex: 2 }}>
        <Particles />
      </div>

      {/* vignette */}
      <div className="hero-vignette" style={{ zIndex: 3 }} />

      {/* animation stage */}
      <div style={{ position:'absolute', inset:0, zIndex:4 }}>
        {renderGroup()}

        {phase === 'identity' && (
          <div style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            display:'flex', flexDirection:'column', alignItems:'center',
            gap: 6, textAlign:'center'
          }}>
            {IDENTITY.slice(0, identityShown).map((t, i) => (
              <div key={i} className="identity-tag"
                   style={{ animationDelay: `${i * 80}ms` }}>{t}</div>
            ))}
          </div>
        )}
      </div>

      {/* Edge labels — small UI chrome */}
      <div style={{
        position:'absolute', top: 24, left: 32, zIndex:5,
        fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#F5A623',
        letterSpacing:'0.25em'
      }}>
        // PORTFOLIO_v2026
      </div>
      <div style={{
        position:'absolute', top: 24, right: 32, zIndex:5,
        fontFamily:"'IBM Plex Mono', monospace", fontSize: 10, color:'#A0A0A0',
        letterSpacing:'0.25em'
      }}>
        REC ● 00:0{(cycle % 9)+1}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:'absolute', bottom: 28, left:'50%',
        transform:'translateX(-50%)', textAlign:'center',
        zIndex: 5
      }}>
        <div style={{
          fontFamily:"'IBM Plex Mono', monospace", fontSize: 10,
          color:'#F5A623', letterSpacing:'0.35em'
        }}>SCROLL</div>
        <div className="scroll-arrow" style={{ color:'#F5A623', marginTop: 6 }}>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.4">
            <line x1="7" y1="2" x2="7" y2="16"/>
            <polyline points="2,11 7,17 12,11"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;

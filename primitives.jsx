/* global React */
const { useEffect, useRef, useState } = React;

/* ───────────── Custom cursor: dot + trailing ring ───────────── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y, raf;
    const onMove = e => { x = e.clientX; y = e.clientY; };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);

    const isTrigger = t => t && t.closest && t.closest('a, button, input, textarea, .ring-trigger');
    const onOver = e => { if (isTrigger(e.target)) setHover(true); };
    const onOut = e => { if (isTrigger(e.target)) setHover(false); };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={'cursor-ring' + (hover ? ' is-hover' : '')} />
    </>
  );
}

/* ───────────── Ticker ───────────── */
function Ticker() {
  const text = "DIVYANSHU BANSAL ✦ OPEN TO WORK ✦ BACKEND DEVELOPER ✦ FULL STACK DEVELOPER ✦ AI ENGINEER ✦ BASED IN INDIA ✦ AVAILABLE FOR FULL-TIME ROLES ✦ ";
  const block = <span className="ticker-item">{text}</span>;
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{block}{block}{block}{block}</div>
    </div>
  );
}

/* ───────────── Navbar with scroll progress + section path ───────────── */
function Navbar({ active, onNav }) {
  const [open, setOpen] = useState(false);
  const progRef = useRef(null);
  const links = ['About', 'Experience', 'Projects', 'Education', 'Achievements', 'Contact'];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (progRef.current) progRef.current.style.width = (p * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const click = l => { setOpen(false); onNav(l.toLowerCase()); };
  const path = active === 'top' ? '~' : `~/${active}`;

  return (
    <>
      <nav className="nav">
        <button onClick={() => onNav('top')} className="nav-logo" aria-label="Back to top">DB</button>

        <div className="nav-links">
          {links.map(l => (
            <a key={l} href={'#' + l.toLowerCase()}
               onClick={e => { e.preventDefault(); click(l); }}
               className={'nav-link' + (active === l.toLowerCase() ? ' is-active' : '')}>
              {l}
            </a>
          ))}
        </div>

        <span className="nav-path" aria-hidden="true">divyanshu@db:<b>{path}</b></span>

        <a href="divyanshu_bansal_main.pdf" download="Divyanshu_Bansal_Resume.pdf"
           className="btn btn-ghost nav-resume" style={{ padding: '9px 18px' }}>
          Resume <span className="arr">↓</span>
        </a>

        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open
              ? <><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></>
              : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
          </svg>
        </button>

        <div className="nav-progress" ref={progRef} />
      </nav>

      {open && (
        <div className="mobile-menu">
          {links.map((l, i) => (
            <a key={l} href={'#' + l.toLowerCase()}
               onClick={e => { e.preventDefault(); click(l); }}>
              {l} <span>0{i + 1}</span>
            </a>
          ))}
          <a href="#contact" onClick={e => { e.preventDefault(); click('Contact'); }}
             style={{ color: 'var(--gold)', borderBottom: 'none' }}>
            Resume ↓
          </a>
        </div>
      )}
    </>
  );
}

/* ───────────── Reveal-on-scroll wrapper ───────────── */
function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={'reveal ' + className} {...rest}>{children}</Tag>;
}

/* ───────────── Section header ───────────── */
function SectionHead({ num, label, title, note }) {
  return (
    <div className="sec-head">
      <Reveal>
        <div className="sec-eyebrow"><span className="idx">{num}</span>{label}</div>
      </Reveal>
      {title && (
        <Reveal delay={80}>
          <h2 className="t-title">{title}</h2>
        </Reveal>
      )}
      {note && (
        <Reveal delay={140}>
          <div className="sec-note">{note}</div>
        </Reveal>
      )}
    </div>
  );
}

/* ───────────── Count-up number ───────────── */
function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseFloat(value);
    if (isNaN(target)) { el.textContent = value; return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const start = performance.now(), dur = 1400;
        const step = now => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ───────────── Social icons ───────────── */
function SocialIcon({ kind }) {
  if (kind === 'github') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg>
  );
  if (kind === 'linkedin') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.32 0h4.37v1.91h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 7v7.45h-4.56v-6.61c0-1.58-.03-3.62-2.2-3.62-2.21 0-2.55 1.72-2.55 3.5V22H7.54V8Z"/></svg>
  );
  if (kind === 'twitter') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-7.064l-5.523-7.21L4.244 22H1l8.05-9.2L1 2h7.247l4.997 6.605L18.244 2Zm-1.24 18h1.8L7.05 3.85h-1.93l11.884 16.15Z"/></svg>
  );
  if (kind === 'external') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 5h5v5"/><path d="M19 5l-9 9"/><path d="M19 14v5H5V5h5"/></svg>
  );
  if (kind === 'mail') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
  );
  return null;
}

/* ───────────── Footer ───────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="brand">Divyanshu Bansal · 2026</div>
        <div className="tag">Built with React · Deployed on Vercel · Fueled by chai and deadlines ☕</div>
        <div className="socials">
          <a href="https://github.com/audicitty" className="icon-btn" aria-label="GitHub"><SocialIcon kind="github" /></a>
          <a href="https://www.linkedin.com/in/divyanshu-bansal-811820298/" className="icon-btn" aria-label="LinkedIn"><SocialIcon kind="linkedin" /></a>
          <a href="#" className="icon-btn" aria-label="Twitter/X"><SocialIcon kind="twitter" /></a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CustomCursor, Ticker, Navbar, Reveal, SectionHead, CountUp, SocialIcon, Footer });

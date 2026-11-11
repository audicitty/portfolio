'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/* ───────────────────────────── Custom cursor ───────────────────────────── */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [ring, setRing] = useState(false);

  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let cx = x, cy = y;
    let raf: number;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };

    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t || !t.closest) return;
      if (t.closest('a, button, .ring-trigger, input, textarea')) setRing(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t || !t.closest) return;
      if (t.closest('a, button, .ring-trigger, input, textarea')) setRing(false);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return <div ref={dotRef} className={'custom-cursor' + (ring ? ' ring' : '')} />;
}

/* ───────────────────────────── Ticker ───────────────────────────── */
export function Ticker() {
  const text = "DIVYANSHU BANSAL  ✦  OPEN TO WORK  ✦  BACKEND DEVELOPER  ✦  FULL STACK DEVELOPER  ✦  AI ENGINEER  ✦  DIVYANSHU BANSAL  ✦  BASED IN INDIA  ✦  AVAILABLE FOR FULL TIME ROLES  ✦";
  const block = (
    <span className="ticker-item" style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: '0.18em',
      color: '#000'
    }}>{text}</span>
  );
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 28, background: '#F5A623',
      overflow: 'hidden', zIndex: 90,
      display: 'flex', alignItems: 'center'
    }}>
      <div className="ticker-track">
        {block}{block}{block}{block}{block}{block}
      </div>
    </div>
  );
}

/* ───────────────────────────── Navbar ───────────────────────────── */
export function Navbar({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const links = ['About', 'Experience', 'Projects', 'Education', 'Achievements', 'Contact'];

  const click = (l: string) => {
    setOpen(false);
    onNav(l.toLowerCase());
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 28, zIndex: 80,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,166,35,0.2)',
        height: 60,
        display: 'flex', alignItems: 'center',
        padding: '0 32px'
      }}>
        <button
          onClick={() => onNav('top')}
          className="ring-trigger"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 26,
            color: '#F5A623', border: '1px solid #F5A623',
            padding: '2px 10px', letterSpacing: '0.02em',
            background: 'transparent', lineHeight: 1
          }}
        >DB</button>

        <div className="hidden md:flex" style={{ gap: 32, margin: '0 auto' }}>
          {links.map(l => (
            <a key={l} href={'#' + l.toLowerCase()}
               onClick={e => { e.preventDefault(); click(l); }}
               className={'nav-link ' + (active === l.toLowerCase() ? 'is-active text-white' : 'text-[#A0A0A0]')}
               style={{
                 fontFamily: "'IBM Plex Mono', monospace",
                 fontWeight: 400,
                 fontSize: 11, textTransform: 'uppercase',
                 letterSpacing: '0.12em'
               }}>{l}</a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="/divyanshu_resume_1.pdf"
             download="Divyanshu_Bansal_Resume.pdf"
             className="btn-amber-outline"
             style={{
               fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 11,
               textTransform: 'uppercase', letterSpacing: '0.14em',
               padding: '8px 20px', textDecoration: 'none'
             }}>Resume ↓</a>
        </div>

        <button
          className="md:hidden ring-trigger"
          onClick={() => setOpen(o => !o)}
          style={{ marginLeft: 'auto', color: '#F5A623', background: 'transparent', border: 'none', padding: 8 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open
              ? <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>
              : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="mobile-menu md:hidden">
          {links.map(l => (
            <a key={l} href={'#' + l.toLowerCase()}
               onClick={e => { e.preventDefault(); click(l); }}
               className="text-[#A0A0A0]"
               style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {l}
            </a>
          ))}
          <a href="/divyanshu_resume_1.pdf"
             download="Divyanshu_Bansal_Resume.pdf"
             className="btn-amber-outline text-center"
             style={{
               fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
               textTransform: 'uppercase', letterSpacing: '0.1em', padding: '10px 20px', marginTop: 8,
               textDecoration: 'none'
             }}>Resume ↓</a>
        </div>
      )}
    </>
  );
}

/* ───────────────────────────── Reveal-on-scroll wrapper ───────────────────────────── */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...rest
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
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
  const Comp = Tag as React.ElementType;
  return <Comp ref={ref} className={'reveal ' + className} {...rest}>{children}</Comp>;
}

/* ───────────────────────────── Section label ───────────────────────────── */
export function SectionLabel({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="section-label" style={{ marginBottom: 12 }}>
      <span style={{ opacity: 0.5 }}>// {num}</span>{'  '}{children}
    </div>
  );
}

/* ───────────────────────────── Footer ───────────────────────────── */
export function Footer() {
  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 32px 36px',
      textAlign: 'center'
    }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.55)' }}>
        DIVYANSHU BANSAL  ·  2025
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
        Built with React · Deployed on Vercel · Fueled by chai and deadlines ☕
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 24 }}>
        {['github', 'linkedin', 'twitter'].map(s => (
          <a key={s} href="#" className="icon-btn ring-trigger" aria-label={s}>
            {s === 'github' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.52-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
            )}
            {s === 'linkedin' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8h4.56v14H.22V8Zm7.32 0h4.37v1.91h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 7v7.45h-4.56v-6.61c0-1.58-.03-3.62-2.2-3.62-2.21 0-2.55 1.72-2.55 3.5V22H7.54V8Z" /></svg>
            )}
            {s === 'twitter' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.5 8.57L23 22h-7.064l-5.523-7.21L4.244 22H1l8.05-9.2L1 2h7.247l4.997 6.605L18.244 2Zm-1.24 18h1.8L7.05 3.85h-1.93l11.884 16.15Z" /></svg>
            )}
          </a>
        ))}
      </div>
    </footer>
  );
}

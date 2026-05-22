/* global React, ReactDOM */
const { useState: useAppS, useEffect: useAppE } = React;

function App() {
  const [active, setActive] = useAppS('top');

  const handleNav = (id) => {
    const map = { top: 'top', about:'about', experience:'experience', projects:'projects',
                  education:'education', achievements:'achievements', contact:'contact', resume:'contact' };
    const target = map[id] || id;
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(target);
  };

  useAppE(() => {
    const ids = ['about','experience','projects','education','achievements','contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-30% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <Ticker />
      <Navbar active={active} onNav={handleNav} />

      <main>
        <Hero onNav={handleNav} />
        <About onNav={handleNav} />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

import { ReactNode, useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import { motion, useScroll, useTransform ,AnimatePresence , type MotionValue  } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';

/* ---------- reusable components ---------- */
type FadeProps = { children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; as?: keyof JSX.IntrinsicElements; className?: string; style?: CSSProperties };
const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = 'div', className, style }: FadeProps) => {
  const Comp = useMemo(() => motion.create(as as 'div'), [as]);
  return (
    <Comp className={className} style={style} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </Comp>
  );
};

const Magnet = ({ children, padding = 100, strength = 2, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out', className }:
  { children: ReactNode; padding?: number; strength?: number; activeTransition?: string; inactiveTransition?: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2, cy = top + height / 2;
      if (Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding) {
        setActive(true); setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength });
      } else { setActive(false); setPos({ x: 0, y: 0 }); }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [padding, strength]);
  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, transition: active ? activeTransition : inactiveTransition, willChange: 'transform' }}>{children}</div>
    </div>
  );
};

const Char = ({ c, i, n, p }: { c: string; i: number; n: number; p: MotionValue<number> }) => {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.2, 1]);
  return (
    <span className="relative">
      <span className="opacity-0">{c}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity: o }}>{c}</motion.span>
    </span>
  );
};
const AnimatedText = ({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  let idx = 0;
  return (
    <p ref={ref} className={className} style={style}>
      {text.split(' ').map((w, wi, arr) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {w.split('').map((c) => <Char key={idx} c={c} i={idx++} n={text.length} p={scrollYProgress} />)}
          {wi < arr.length - 1 && (idx++, '\u00A0')}
        </span>
      ))}
    </p>
  );
};

const ContactButton = () => (
  <button className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
    style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset', outline: '2px solid white', outlineOffset: '-3px' }}>
    Contact Me
  </button>
);
const LiveProjectButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 inline-flex items-center gap-2">
    Live Project <ArrowUpRight size={18} />
  </button>
);

const bigNum: CSSProperties = { fontSize: 'clamp(3rem, 10vw, 140px)' };
const bigHead: CSSProperties = { fontSize: 'clamp(3rem, 12vw, 160px)' };

/* ---------- sections ---------- */
const Hero = () => (
  <section className="relative h-screen flex flex-col overflow-x-clip">
    <FadeIn y={-20}>
      <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
        {['About', 'Price', 'Projects', 'Contact'].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:opacity-70 transition-opacity duration-200">{l}</a>
        ))}
      </nav>
    </FadeIn>
    <div className="overflow-hidden">
      <FadeIn delay={0.6} y={30}>
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full mt-6 sm:mt-4 md:-mt-5 text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Nishchay
        </h1>
      </FadeIn>
    </div>
    <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
      
    </div>
    <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
      <FadeIn delay={0.35} y={20}>
        <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
          a Full Stack developer driven by crafting striking and unforgettable projects
        </p>
      </FadeIn>
      <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
    </div>
  </section>
);

const G = 'https://motionsites.ai/assets/hero-';
//const gifs = ['space-voyage-preview-eECLH3Yc','codenest-preview-Cgppc2qV','vex-ventures-preview-BczMFIiw','stellar-ai-v2-preview-DjvxjG3C','asme-preview-B_nGDnTP','transform-data-preview-Cx5OU29N','vitara-preview-Cjz2QYyU','terra-preview-BFjrCr7T','skyelite-preview-DHaZIgUv','aethera-preview-DknSlcTa','designpro-preview-D8c5_een','stellar-ai-preview-D3HL6bw1','xportfolio-preview-D4A8maiC','orbit-web3-preview-BXt4OttD','nexora-preview-cx5HmUgo','evr-ventures-preview-DZxeVFEX','planet-orbit-preview-DWAP8Z1P','new-era-preview-CocuDUm9','wealth-preview-B70idl_u','luminex-preview-CxOP7ce6','celestia-preview-0yO3jXO8'].map((s) => `${G}${s}.gif`);
//const row1 = gifs.slice(0, 11), row2 = gifs.slice(11);
const row1 = [
  "/tech/python.svg",
  "/tech/django.svg",
  "/tech/react.svg",
  "/tech/typescript.svg",
  "/tech/nextdotjs.svg",
  "/tech/javascript.svg",
  "/tech/html5.svg",
];

const row2 = [
  "/tech/postgresql.svg",
  "/tech/mongodb.svg",
  "/tech/mysql.svg",
  "/tech/nodedotjs.svg",
  "/tech/tailwindcss.svg",
  "/tech/git.svg",
  "/tech/github.svg",
  "/tech/ollama.svg",
];
const Marquee = () => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const Row = ({ items, dx }: { items: string[]; dx: number }) => (
    <div className="flex gap-3 w-max" style={{ transform: `translateX(${dx}px)`, willChange: 'transform' }}>
      {[...items, ...items, ...items].map((u, i) => (
<img
  key={i}
  src={u}
  loading="lazy"
  alt=""
  className="shrink-0 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
  style={{ width: 80, height: 80 }}
/>
))}
    </div>
  );
  return (
  <section
    ref={ref}
    className="bg-[#0C0C0C] pt-16 sm:pt-20 pb-28 sm:pb-36 overflow-hidden flex flex-col gap-8"
  >
    <Row items={row1} dx={offset - 200} />
    <Row items={row2} dx={-(offset - 200)} />
  </section>
);
};


const CDN = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';
const corners = [
  { src: 'moon_icon.11395d36.png', c: 'w-[120px] sm:w-[160px] md:w-[210px]', p: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', d: 0.1, x: -80 },
  { src: 'p59_1.4659672e.png', c: 'w-[100px] sm:w-[140px] md:w-[180px]', p: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', d: 0.25, x: -80 },
  { src: 'lego_icon-1.703bb594.png', c: 'w-[120px] sm:w-[160px] md:w-[210px]', p: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', d: 0.15, x: 80 },
  { src: 'Group_134-1.2e04f3ce.png', c: 'w-[130px] sm:w-[170px] md:w-[220px]', p: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', d: 0.3, x: 80 },
];


const About = () => {
  const [flipped, setFlipped] = useState(false);

  const skills = ["Python", "Django", "React", "PostgreSQL"];

  return (
    <section
      id="about"
      className="bg-[#0C0C0C] px-3 pb-8 sm:px-5"
    >
      {/* Main rounded panel */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#E8EAED] text-[#111827] sm:rounded-[40px]">

        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-9">
          <span className="text-xs tracking-[0.35em] text-[#918674]">
            NM / PORTFOLIO
          </span>
          <span className="text-right text-xs text-[#6F6A62] sm:text-sm">
            ABOUT THE DEVELOPER
          </span>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 items-center gap-14 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_290px_minmax(0,1fr)] lg:gap-10 lg:px-12 lg:py-24">

          {/* LEFT: Introduction */}
          <div className="order-1 flex min-w-0 flex-col items-start">
            <p className="mb-5 text-xs tracking-[0.35em] text-[#918674]">
              ABOUT
            </p>

            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              Hi, I'm
              <br />
              <span className="font-serif font-normal italic">
                Nishchay.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[#696761] sm:text-lg">
              An MCA student and full-stack developer who enjoys
              building useful web applications, designing backend
              systems, and exploring AI-powered developer tools.
            </p>

            <p className="mt-4 max-w-md font-serif text-base leading-relaxed text-[#77736B]">
              I like turning ideas into working products, from
              database design and APIs to clean user interfaces.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/nishchaymodi/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#C8C1B5] px-5 py-3 text-sm transition-colors hover:bg-black/5 sm:px-6"
              >
                LinkedIn ↗
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#111827] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#293449] sm:px-6"
              >
                Resume ↗
              </a>

              <a
                href="https://github.com/Nishchaymodi8"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#C8C1B5] px-5 py-3 text-sm transition-colors hover:bg-black/5 sm:px-6"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* CENTER: Hanging ID card */}
          <div className="order-2 flex min-w-0 flex-col items-center">

            {/* Lanyard and card */}
            <div className="relative flex flex-col items-center pt-[90px]">
            

{/* Moving strap and connector */}
<motion.div
  aria-hidden="true"
  className="absolute top-0 z-20 flex flex-col items-center"
  animate={
    flipped
      ? {
          left: "50%",
          x: [-15, -27, -7, -15],
          y: [0, -8, 4, 0],
          rotateZ: [0, -5, 3, 0],
        }
      : {
          left: "50%",
          x: [-15, -5, -21, -15],
          y: [0, -6, 3, 0],
          rotateZ: [0, 4, -2, 0],
        }
  }
  transition={{
    left: { duration: 0 },
    x: { duration: 0.85, ease: "easeOut" },
    y: { duration: 0.85, ease: "easeOut" },
    rotateZ: { duration: 0.85, ease: "easeOut" },
  }}
  style={{
    width: "30px",
    transformOrigin: "50% 100%",
  }}
>
  {/* Stitched portfolio strap */}
  <div className="flex h-[76px] w-[30px] flex-col items-center border-x-2 border-dotted border-[#8C91A2] bg-[#171C30]">
    <span
      className="mt-2 text-[7px] font-bold tracking-[2px] text-[#E7E8EE]"
      style={{ writingMode: "vertical-rl" }}
    >
      - - - - - -
    </span>
  </div>

  {/* Metal connector */}
  <div className="-mt-[11px] flex h-[20px] w-[32px] items-center justify-center rounded-md border border-[#AEB3BA] bg-gradient-to-b from-[#F1F2F3] via-[#C5C8CD] to-[#969BA2] shadow-sm">
    <div className="h-[10px] w-[20px] rounded-sm border border-[#A1A5AA] bg-[#D7D9DC]" />
  </div>

  {/* Small connecting loop */}
  <div className="-mt-[5px] h-[12px] w-[12px] rounded-b-full border-[2px] border-t-0 border-[#A9ADB3]" />
</motion.div>





              {/* 3D perspective wrapper */}
              <div
                className="relative z-10 h-[420px] w-[270px] sm:h-[440px] sm:w-[290px]"
                style={{ perspective: "1100px" }}
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label="Flip developer ID card"
                  onClick={() => setFlipped((value) => !value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setFlipped((value) => !value);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer rounded-[22px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C59B45]"
                  animate={
                    flipped
                      ? {
                          rotateY: 180,
                          rotateX: [0, -12, 8, 0],
                          rotateZ: [0, -5, 3, 0],
                          x: [0, -12, 8, 0],
                          y: [0, -8, 4, 0],
                        }
                      : {
                          rotateY: 0,
                          rotateX: [0, 10, -6, 0],
                          rotateZ: [0, 4, -2, 0],
                          x: [0, 10, -6, 0],
                          y: [0, -6, 3, 0],
                        }
                  }
                  transition={{
                    rotateY: {
                      type: "spring",
                      stiffness: 75,
                      damping: 13,
                      mass: 1.1,
                    },
                    rotateX: { duration: 0.85, ease: "easeOut" },
                    rotateZ: { duration: 0.85, ease: "easeOut" },
                    x: { duration: 0.85, ease: "easeOut" },
                    y: { duration: 0.85, ease: "easeOut" },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >

                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-[#D9DDE3] bg-white shadow-[0_22px_45px_rgba(0,0,0,0.18)]"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-center gap-3 bg-[#111827] px-5 py-5 text-white">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EAED] text-sm font-bold text-[#111827]">
                        NM
                      </div>

                      <div>
                        <p className="text-sm font-bold tracking-wide">
                          DEVELOPER ID
                        </p>
                        <p className="text-[10px] text-white/60">
                          PORTFOLIO · 2026
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-5 pt-6">
                      {/* Photo placeholder */}
                      <div className="flex h-[125px] w-[112px] items-center justify-center overflow-hidden rounded-xl border-2 border-[#D9DDE3] bg-[#E8EAED]">
                        <span className="font-serif text-5xl text-[#111827]">
                          N
                        </span>
                      </div>

                      <h3 className="mt-4 text-center text-lg font-bold tracking-tight">
                        NISHCHAY MODI
                      </h3>

                      <p className="mt-1 text-center text-xs text-[#777B83]">
                        Full Stack Developer
                      </p>

                      <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-4">
                        <div>
                          <p className="text-[9px] tracking-wider text-[#858A93]">
                            ID NUMBER
                          </p>
                          <p className="mt-1 text-xs font-medium">
                            NM-2026
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] tracking-wider text-[#858A93]">
                            EDUCATION
                          </p>
                          <p className="mt-1 text-xs font-medium">
                            MCA · 2027
                          </p>
                        </div>
                      </div>

                      {/* Decorative barcode */}
                      <div
                        aria-hidden="true"
                        className="mt-auto mb-5 h-8 w-full opacity-75"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg,#111827 0px,#111827 2px,transparent 2px,transparent 4px,#111827 4px,#111827 5px,transparent 5px,transparent 8px)",
                        }}
                      />
                    </div>

                    <span className="absolute bottom-2 right-3 text-[9px] tracking-wide text-[#858A93]">
                      CLICK TO FLIP ↻
                    </span>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border border-[#D9DDE3] bg-white p-5 shadow-[0_22px_45px_rgba(0,0,0,0.18)] sm:p-6"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-[10px] tracking-[0.25em] text-[#858A93]">
                      PROFILE / 02
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold leading-tight">
                      What I
                      <br />
                      <span className="font-serif font-normal italic">
                        work on.
                      </span>
                    </h3>

                    <div className="mt-6 space-y-4 text-sm">
                      {[
                        "Full-stack web applications",
                        "Backend APIs and databases",
                        "AI-powered developer tools",
                        "Problem solving and system design",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[10px] text-white">
                            ✓
                          </span>
                          <span className="text-[#454B55]">{item}</span>
                        </div>
                      ))}
                    </div>

                      

                    <p className="mt-auto pt-5 font-serif text-sm italic text-[#777B83]">
                      Building useful things, one idea at a time.
                    </p>

                    <span className="absolute bottom-2 right-3 text-[9px] tracking-wide text-[#858A93]">
                      CLICK TO RETURN ↻
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-[#858A93]">
              CLICK THE CARD TO DISCOVER MORE
            </p>
          </div>

          {/* RIGHT: Quick facts */}
          <div className="order-3 flex min-w-0 flex-col">
            <p className="mb-5 text-xs tracking-[0.3em] text-[#918674]">
              QUICK FACTS
            </p>

            {[
              ["Based in", "Ahmedabad, India"],
              ["Studying", "MCA · GLS University"],
              ["Graduation", "2027"],
              ["Focus", "Full Stack & AI Tools"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4 border-b border-[#DDD5C8] py-4"
              >
                <span className="text-sm text-[#858078]">
                  {label}
                </span>
                <span className="text-right text-sm font-medium">
                  {value}
                </span>
              </div>
            ))}

            <blockquote className="mt-8 border-l-2 border-[#C9A24A] pl-5 font-serif text-xl italic leading-relaxed text-[#77736B]">
              “Learning by building. Improving with every project.”
            </blockquote>
          </div>

        </div>

        {/* Footer spacing */}
        <div className="h-4 sm:h-6" />
      </div>
    </section>
  );
};



const stackElements = [
  { number: "01", symbol: "Py", name: "Python", group: "Languages", level: "Core", position: "lg:col-start-1 lg:row-start-1" },
  { number: "02", symbol: "Js", name: "JavaScript", group: "Languages", level: "Core", position: "lg:col-start-2 lg:row-start-1" },
  { number: "03", symbol: "Ts", name: "TypeScript", group: "Languages", level: "Working", position: "lg:col-start-3 lg:row-start-1" },
  { number: "04", symbol: "Ht", name: "HTML", group: "Frontend", level: "Core", position: "lg:col-start-4 lg:row-start-1" },
  { number: "05", symbol: "Cs", name: "CSS", group: "Frontend", level: "Core", position: "lg:col-start-5 lg:row-start-1" },
  { number: "06", symbol: "Re", name: "React", group: "Frontend", level: "Working", position: "lg:col-start-6 lg:row-start-1" },
  { number: "07", symbol: "Nx", name: "Next.js", group: "Frontend", level: "Working", position: "lg:col-start-1 lg:row-start-2" },

  { number: "08", symbol: "Dj", name: "Django", group: "Backend", level: "Core", position: "lg:col-start-2 lg:row-start-2" },
  { number: "09", symbol: "DR", name: "REST API", group: "Backend", level: "Working", position: "lg:col-start-3 lg:row-start-2" },
  { number: "10", symbol: "Nd", name: "Node.js", group: "Backend", level: "Learning", position: "lg:col-start-4 lg:row-start-2" },
  
  { number: "11", symbol: "Pg", name: "PostgreSQL", group: "Databases", level: "Working", position: "lg:col-start-5 lg:row-start-2" },
  { number: "12", symbol: "Mo", name: "MongoDB", group: "Databases", level: "Working", position: "lg:col-start-6 lg:row-start-2" },
  { number: "13", symbol: "My", name: "MySQL", group: "Databases", level: "Learning", position: "lg:col-start-1 lg:row-start-3" },
  { number: "14", symbol: "Sq", name: "SQLite", group: "Databases", level: "Learning", position: "lg:col-start-2 lg:row-start-3" },
  { number: "15", symbol: "Ch", name: "Chroma", group: "AI / Concepts", level: "Working", position: "lg:col-start-3 lg:row-start-3" },
  { number: "16", symbol: "Pv", name: "pgvector", group: "AI / Concepts", level: "Working", position: "lg:col-start-4 lg:row-start-3" },
  { number: "17", symbol: "Rg", name: "RAG", group: "AI / Concepts", level: "Working", position: "lg:col-start-5 lg:row-start-3" },
  { number: "18", symbol: "Ol", name: "Ollama", group: "AI / Concepts", level: "Core", position: "lg:col-start-6 lg:row-start-3" },
  { number: "19", symbol: "Eb", name: "Embeddings", group: "AI / Concepts", level: "Core", position: "lg:col-start-1 lg:row-start-4" },
  { number: "20", symbol: "Vs", name: "Vector Search", group: "AI / Concepts", level: "Learning", position: "lg:col-start-2 lg:row-start-4" },

];

const stackGroups = [
  { name: "Languages", color: "#060606" },
  { name: "Frontend", color: "#6A6A6A" },
  { name: "Backend", color: "#898989" },
  { name: "Databases", color: "#BFBFBF" },
  { name: "AI / Concepts", color: "#D8D8D8" },
];

const stackShades = [
  "#060606",
  "#292929",
  "#454545",
  "#6A6A6A",
  "#858585",
  "#A0A0A0",
  "#BFBFBF",
  "#CBCBCB",
  "#D8D8D8",
  "#E5E2DC",
  "#F7F5F0",
];

const StackElement = ({
  element,
  index,
  activeFilter,
  selected,
  onSelect,
}: {
  element: (typeof stackElements)[number];
  index: number;
  activeFilter: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  const matches = activeFilter === "All" || element.group === activeFilter;
  const shade = stackShades[
    Math.round((index / (stackElements.length - 1)) * (stackShades.length - 1))
  ];
  const isDark = index < 5;

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        opacity: matches ? 1 : 0.2,
        scale: selected ? 1.035 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative flex min-h-[112px] flex-col items-start overflow-hidden rounded-[9px] border p-3 text-left sm:min-h-[132px] sm:p-4 ${element.position}`}
      style={{
        backgroundColor: selected ? "#6A6A6A" : shade,
        borderColor: selected ? "#060606" : "rgba(6,6,6,0.12)",
        color: selected || isDark ? "#FFFFFF" : "#060606",
        boxShadow: selected ? "0 0 0 2px #060606" : "none",
      }}
    >
      <span className="text-[9px] tracking-widest opacity-70">
        {element.number}
      </span>

      <span className="mt-1 text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
        {element.symbol}
      </span>

      <span className="mt-auto pt-3 text-[10px] font-semibold sm:text-xs">
        {element.name}
      </span>

      <span className="mt-1 text-[8px] uppercase tracking-wider opacity-70 sm:text-[9px]">
        {selected ? element.level : element.group}
      </span>
    </motion.button>
  );
};

const Services = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const filters = ["All", ...stackGroups.map((group) => group.name)];

  return (
    <section
      id="price"
      className="rounded-t-[40px] bg-[#F7F5F0] px-5 py-20 text-[#060606] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn y={40}>
          <div className="mb-10 sm:mb-14">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#6A6A6A] sm:text-xs">
              Skills / 03
            </p>

            <h2
              className="max-w-5xl font-black leading-[0.96] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
            >
              The periodic table
              <br />
              <span className="font-serif font-normal italic">
                of my stack.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#6A6A6A] sm:text-base">
              {String(
              activeFilter === "All"
                ? stackElements.length
                : stackElements.filter((item) => item.group === activeFilter)
                    .length
            ).padStart(2, "0")}{" "}
            elements {activeFilter === "All" ? "in my stack" : `· ${activeFilter}`} elements in my stack. Select a family to explore the
              technologies I use to build applications and developer tools.
            </p>
          </div>
        </FadeIn>

        {/* Category filters */}
        <div className="mb-7 flex flex-wrap gap-2 sm:mb-9">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            const color =
              stackGroups.find((group) => group.name === filter)?.color ??
              "#060606";

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className="flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium transition-all duration-200 sm:text-xs"
                style={{
                  borderColor: isActive ? "#060606" : "#D8D8D8",
                  backgroundColor: isActive ? "#060606" : "transparent",
                  color: isActive ? "#F7F5F0" : "#6A6A6A",
                }}
              >
                {filter !== "All" && (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: isActive ? "#F7F5F0" : color,
                    }}
                  />
                )}
                {filter}
              </button>
            );
          })}
        </div>

        {/* Periodic table: staggered on desktop */}
        <motion.div
          layout
          className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:grid-rows-4 lg:gap-3"
        >
          {stackElements.map((element, index) => (
            <StackElement
              key={element.number}
              element={element}
              index={index}
              activeFilter={activeFilter}
              selected={selectedElement === element.number}
              onSelect={() =>
                setSelectedElement((current) =>
                  current === element.number ? null : element.number
                )
              }
            />
          ))}
        </motion.div>

       
      </div>
    </section>
  );
};


const img = (id: string) => `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_${id}.png&w=1280&q=85`;
const projects = [
  { name: 'Nextlevel Studio', cat: 'Client', a: '20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db', b: '20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8', c: '20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327' },
  { name: 'Aura Brand Identity', cat: 'Personal', a: '20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f', b: '20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1', c: '20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea' },
  { name: 'Solaris Digital', cat: 'Client', a: '20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f', b: '20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b', c: '20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee' },
];
const R = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

const Card = ({ p, i, n, progress }: { p: typeof projects[number]; i: number; n: number; progress: MotionValue<number> }) => {
  const target = 1 - (n - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  return (
    <div className="sticky h-[85vh] [--t:6rem] md:[--t:8rem]" style={{ top: `calc(var(--t) + ${i * 28}px)` }}>
      <motion.div className={`border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top ${R}`} style={{ scale }}>
        <div className="flex items-center gap-3 sm:gap-6 mb-3 sm:mb-5 text-[#D7E2EA]">
          <span className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}>{`0${i + 1}`}</span>
          <div className="flex-1 flex flex-col gap-1">
            <p className="font-bold uppercase tracking-wide leading-none" style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.5rem)' }}>{p.cat}</p>
            <h3 className="font-normal leading-none opacity-90" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1.1rem)' }}>{p.name}</h3>
          </div>
          <div className="hidden sm:block"><LiveProjectButton /></div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col gap-3" style={{ width: '40%' }}>
            <img src={img(p.a)} alt="" loading="lazy" className={`w-full object-cover ${R}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <img src={img(p.b)} alt="" loading="lazy" className={`w-full object-cover ${R}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <img src={img(p.c)} alt="" loading="lazy" className={`object-cover ${R}`} style={{ width: '60%' }} />
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="projects" className="relative z-10 bg-[#0C0C0C] -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28" style={bigHead}>Project</h2>
      <div ref={ref}>
        {projects.map((p, i) => <Card key={p.name} p={p} i={i} n={projects.length} progress={scrollYProgress} />)}
      </div>
    </section>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return (
    <main id="contact" className="bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      <Hero /><Marquee /><About /><Services /><Projects />
    </main>
  );
}

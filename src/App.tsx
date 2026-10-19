import { ReactNode, useEffect, useMemo, useRef, useState, CSSProperties } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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
const gifs = ['space-voyage-preview-eECLH3Yc','codenest-preview-Cgppc2qV','vex-ventures-preview-BczMFIiw','stellar-ai-v2-preview-DjvxjG3C','asme-preview-B_nGDnTP','transform-data-preview-Cx5OU29N','vitara-preview-Cjz2QYyU','terra-preview-BFjrCr7T','skyelite-preview-DHaZIgUv','aethera-preview-DknSlcTa','designpro-preview-D8c5_een','stellar-ai-preview-D3HL6bw1','xportfolio-preview-D4A8maiC','orbit-web3-preview-BXt4OttD','nexora-preview-cx5HmUgo','evr-ventures-preview-DZxeVFEX','planet-orbit-preview-DWAP8Z1P','new-era-preview-CocuDUm9','wealth-preview-B70idl_u','luminex-preview-CxOP7ce6','celestia-preview-0yO3jXO8'].map((s) => `${G}${s}.gif`);
const row1 = gifs.slice(0, 11), row2 = gifs.slice(11);

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
        <img key={i} src={u} loading="lazy" alt="" className="rounded-2xl object-cover shrink-0" style={{ width: 420, height: 270 }} />
      ))}
    </div>
  );
  return (
    <section ref={ref} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3">
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
const About = () => (
  <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-16 sm:gap-20 md:gap-24">
    {corners.map((c) => (
      <div key={c.src} className={`absolute ${c.p}`}>
        <FadeIn delay={c.d} x={c.x} y={0} duration={0.9}><img src={CDN + c.src} alt="" className={c.c} /></FadeIn>
      </div>
    ))}
    <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-[1]">
      <FadeIn y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={bigHead}>About me</h2></FadeIn>
      <AnimatedText className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
    </div>
    <div className="relative z-[1]"><ContactButton /></div>
  </section>
);

const services = [
  ['3D Modeling', 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.'],
  ['Rendering', 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.'],
  ['Motion Design', 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.'],
  ['Branding', 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.'],
  ['Web Design', 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.'],
];
const ServiceItem = ({ n, d, i, last }: { n: string; d: string; i: number; last: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.98', 'start 0.7'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, y, borderTop: '1px solid rgba(12, 12, 12, 0.15)', borderBottom: last ? '1px solid rgba(12, 12, 12, 0.15)' : undefined }}
      className="flex items-start gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 text-[#0C0C0C]">
      <span className="font-black leading-none shrink-0" style={{ ...bigNum, minWidth: 'clamp(4.5rem, 14vw, 200px)' }}>{`0${i + 1}`}</span>
      <div className="flex flex-col gap-2 sm:gap-3">
        <h3 className="font-medium uppercase leading-none" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{n}</h3>
        <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>{d}</p>
      </div>
    </motion.div>
  );
};
const Services = () => (
  <section id="price" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <FadeIn y={40}><h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 leading-none" style={bigHead}>Services</h2></FadeIn>
    <div className="max-w-5xl mx-auto">
      {services.map(([n, d], i) => <ServiceItem key={n} n={n} d={d} i={i} last={i === services.length - 1} />)}
    </div>
  </section>
);

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

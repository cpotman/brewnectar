import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Star,
  ChevronRight,
  Brain,
  Zap,
  Shield,
  Coffee,
  Clock,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Quote,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

/*
 * DESIGN: BrewNectar Advertorial / Listicle
 * Style: Warm cream editorial — matches main site aesthetic
 * Structure: Numbered listicle with sticky section nav, multiple CTAs
 * Goal: Pre-sell and educate, then drive to /product
 */

// === IMAGES ===
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  pour: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  stir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  lockIn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
  product: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  botanical: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/botanical-stipple-YXHqjKQEjP2LspSUm3f2Gh.webp",
};

// === SECTIONS for sticky nav ===
const SECTIONS = [
  { id: "problem", label: "The Problem" },
  { id: "mechanism", label: "How It Works" },
  { id: "ingredients", label: "Ingredients" },
  { id: "proof", label: "The Proof" },
  { id: "testimonials", label: "Reviews" },
  { id: "difference", label: "Why Us" },
  { id: "guarantee", label: "Guarantee" },
];

// === FadeUp animation wrapper ===
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// === CTA Button Component ===
function CTAButton({ variant = "primary", className = "" }: { variant?: "primary" | "secondary"; className?: string }) {
  return (
    <Link href="/product">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 cursor-pointer ${
          variant === "primary"
            ? "bg-[#1C1917] text-white px-8 py-4 text-base shadow-lg hover:bg-[#292524]"
            : "bg-[#B45309] text-white px-7 py-3.5 text-sm shadow-md hover:bg-[#92400E]"
        } ${className}`}
      >
        Get BrewNectar — Save Up to 45%
        <ArrowRight size={18} />
      </motion.div>
    </Link>
  );
}

// === Inline CTA Banner ===
function CTABanner({ text }: { text: string }) {
  return (
    <FadeUp>
      <div className="my-12 md:my-16 bg-gradient-to-r from-[#FEF3C7] via-[#FDE68A]/40 to-[#FEF3C7] rounded-2xl p-8 md:p-10 text-center border border-amber-200/60">
        <p className="text-[#78350F] font-medium text-base md:text-lg mb-5">{text}</p>
        <CTAButton />
      </div>
    </FadeUp>
  );
}

// === Testimonial Card ===
function TestimonialCard({ name, role, text, rating }: { name: string; role: string; text: string; rating: number }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-100 shadow-sm">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-[#D97706] text-[#D97706]" />
        ))}
      </div>
      <Quote size={24} className="text-amber-300 mb-3" />
      <p className="text-[#44403C] text-[15px] leading-relaxed mb-5 italic">"{text}"</p>
      <div>
        <p className="font-semibold text-[#1C1917] text-sm">{name}</p>
        <p className="text-[#78716C] text-xs">{role}</p>
      </div>
    </div>
  );
}

// === MAIN PAGE ===
export default function Advertorial() {
  const [activeSection, setActiveSection] = useState("problem");
  const [stickyNavVisible, setStickyNavVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Show sticky nav after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => {
      setStickyNavVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll the nav pill into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(`[data-section="${activeSection}"]`);
      if (activeEl) {
        (activeEl as HTMLElement).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* ===== STICKY SECTION NAV ===== */}
      <motion.div
        ref={navRef}
        initial={{ y: -80 }}
        animate={{ y: stickyNavVisible ? 0 : -80 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/60 shadow-sm"
      >
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between gap-3 h-14">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1"
          >
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                data-section={id}
                onClick={() => scrollToSection(id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeSection === id
                    ? "bg-[#1C1917] text-white"
                    : "text-[#78716C] hover:text-[#1C1917] hover:bg-stone-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Link href="/product">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#B45309] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#92400E] transition-colors cursor-pointer whitespace-nowrap">
              Get Offer <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ===== EDITORIAL HEADER ===== */}
      <header className="bg-[#FDFBF7] border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="font-display text-xl font-bold text-[#1C1917] tracking-tight cursor-pointer">BrewNectar</span>
          </Link>
          <span className="text-xs text-[#A8A29E] uppercase tracking-widest">Advertorial</span>
        </div>
      </header>

      {/* ===== HERO / ARTICLE HEADER ===== */}
      <section className="pt-10 pb-8 md:pt-16 md:pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#D97706] text-[#D97706]" />
                ))}
              </div>
              <span className="text-sm text-[#78716C]">Trusted by <strong className="text-[#1C1917]">12,000+</strong> high performers</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight text-[#1C1917] mb-5">
              7 Reasons Why High Performers Are Adding This{" "}
              <span className="text-[#B45309]">Nootropic Syrup</span> to Their Morning Coffee
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-lg md:text-xl text-[#57534E] leading-relaxed mb-6 max-w-2xl">
              The science-backed way to upgrade your focus, memory, and mental clarity — without switching your coffee.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                <span className="text-sm font-bold text-[#78350F]">DR</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1C1917]">Dr. Rachel Kim, PhD</p>
                <p className="text-xs text-[#A8A29E]">Neuroscience Researcher · Updated March 2026</p>
              </div>
              <BadgeCheck size={18} className="text-blue-500 ml-1" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-2xl overflow-hidden aspect-[16/8] md:aspect-[16/7] relative">
              <img
                src={IMAGES.hero}
                alt="BrewNectar nootropic coffee syrup bottle with coffee"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap items-center gap-2">
                <span className="bg-white/90 backdrop-blur-sm text-[#78350F] text-xs font-semibold px-3 py-1.5 rounded-full">
                  Works with ANY coffee you already drink
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Just Restocked
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <article className="pb-20">
        <div className="max-w-3xl mx-auto px-4">

          {/* ---------- 1. THE PROBLEM ---------- */}
          <section id="problem" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6 mt-8">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">1</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">Your Coffee Is Leaving Performance on the Table</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-5">
                You drink coffee every morning. It wakes you up, gives you a jolt, and gets you moving. But here's what most people don't realize: <strong>caffeine alone is a blunt instrument.</strong>
              </p>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-5">
                It spikes your cortisol, gives you a narrow window of alertness, and then drops you into an afternoon crash. You're left jittery, anxious, and reaching for another cup — or worse, giving up on the afternoon entirely.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="bg-red-50/70 rounded-xl p-5 border border-red-100/60 text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-red-600 mb-1">73%</p>
                  <p className="text-xs md:text-sm text-red-700/80">of professionals report afternoon energy crashes</p>
                </div>
                <div className="bg-red-50/70 rounded-xl p-5 border border-red-100/60 text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-red-600 mb-1">85%</p>
                  <p className="text-xs md:text-sm text-red-700/80">say brain fog affects their work quality</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-5">
                The real issue isn't that you need more caffeine. It's that <strong>caffeine without the right co-factors is incomplete.</strong> Your brain needs specific compounds — neuroprotective mushrooms, phospholipids, amino acids — to convert that caffeine energy into sustained, calm focus.
              </p>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed">
                That's exactly what BrewNectar was designed to do. And unlike nootropic coffee brands that force you to switch your coffee, <strong>BrewNectar works with whatever coffee you already love.</strong>
              </p>
            </FadeUp>
          </section>

          <CTABanner text="Ready to upgrade your morning coffee? Join 12,000+ high performers." />

          {/* ---------- 2. HOW IT WORKS ---------- */}
          <section id="mechanism" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">2</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">The 3-Second Ritual That Changes Everything</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-5">
                BrewNectar is a vanilla bean nootropic syrup. One tablespoon. Stir it into your coffee. That's it. No pills, no powders, no blender required.
              </p>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-6">
                Here's what happens inside your brain over the next few hours:
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-6 mb-8">
                {[
                  {
                    icon: <Coffee size={20} />,
                    time: "0–15 min",
                    title: "L-Theanine smooths the caffeine curve",
                    desc: "Instead of a cortisol spike, you get calm alertness. The jitters disappear. Your mind sharpens without the anxiety.",
                  },
                  {
                    icon: <Brain size={20} />,
                    time: "15–45 min",
                    title: "Cognizin® floods your brain with acetylcholine",
                    desc: "This is the neurotransmitter responsible for learning, memory, and focus. Cognizin (citicoline) is the most clinically studied form available.",
                  },
                  {
                    icon: <Zap size={20} />,
                    time: "45 min – 4 hrs",
                    title: "Lion's Mane stimulates Nerve Growth Factor",
                    desc: "NGF is the protein that builds and repairs neurons. Lion's Mane is the only known food compound that crosses the blood-brain barrier to stimulate it.",
                  },
                  {
                    icon: <Shield size={20} />,
                    time: "Ongoing",
                    title: "B Vitamins sustain cellular energy production",
                    desc: "Your mitochondria need B vitamins to convert food into ATP — the energy currency of every cell. No crash. Just sustained output.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#B45309]">
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-full w-fit">{step.time}</span>
                        <h3 className="font-semibold text-[#1C1917] text-sm sm:text-[15px]">{step.title}</h3>
                      </div>
                      <p className="text-[#57534E] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={IMAGES.stir} alt="Stirring BrewNectar into coffee" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={IMAGES.lockIn} alt="Focused work after BrewNectar" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-[#78716C] text-sm text-center italic mb-2">Left: One tablespoon stirred into any coffee. Right: Sustained deep work, no crash.</p>
            </FadeUp>
          </section>

          <CTABanner text="One tablespoon. Your coffee. Calm focus all day." />

          {/* ---------- 3. INGREDIENTS ---------- */}
          <section id="ingredients" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">3</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">4 Clinically-Studied Ingredients (Not Pixie Dust)</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-8">
                Every ingredient in BrewNectar has peer-reviewed research behind it. No proprietary blends. No hidden doses. Here's exactly what's inside:
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-6 mb-8">
                {[
                  {
                    name: "Lion's Mane Mushroom",
                    studies: "30+",
                    icon: <Brain size={20} />,
                    color: "bg-purple-50 text-purple-600 border-purple-100",
                    desc: "The only known natural compound that stimulates Nerve Growth Factor (NGF) in the brain. A 2023 study in Nutrients found significant improvements in cognitive function after just 28 days of supplementation.",
                    source: "Docherty et al., Nutrients, 2023",
                  },
                  {
                    name: "Cognizin® (Citicoline)",
                    studies: "20+",
                    icon: <Zap size={20} />,
                    color: "bg-blue-50 text-blue-600 border-blue-100",
                    desc: "A patented form of citicoline that increases brain energy by 13.6% and enhances the formation of brain cell membranes by 26%. Used in clinical settings for cognitive support worldwide.",
                    source: "Nakazaki et al., J Nutrition, 2021",
                  },
                  {
                    name: "L-Theanine",
                    studies: "25+",
                    icon: <Shield size={20} />,
                    color: "bg-green-50 text-green-600 border-green-100",
                    desc: "An amino acid found in green tea that promotes alpha brain waves — the state associated with calm alertness. When paired with caffeine, it eliminates jitters while enhancing focus and attention.",
                    source: "Hidese et al., Nutrients, 2019",
                  },
                  {
                    name: "B-Vitamin Complex",
                    studies: "100+",
                    icon: <Sparkles size={20} />,
                    color: "bg-amber-50 text-amber-600 border-amber-100",
                    desc: "Essential cofactors for neurotransmitter synthesis and cellular energy production. The VITACOG trial showed B vitamins slowed brain atrophy by 30% in participants with elevated homocysteine.",
                    source: "Smith et al., PLoS ONE, 2010",
                  },
                ].map((ingredient, i) => (
                  <div key={i} className={`rounded-2xl p-6 border ${ingredient.color.split(" ")[2]} bg-white`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${ingredient.color.split(" ")[0]} flex items-center justify-center ${ingredient.color.split(" ")[1]}`}>
                          {ingredient.icon}
                        </div>
                        <h3 className="font-semibold text-[#1C1917] text-lg">{ingredient.name}</h3>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#B45309] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                        <FlaskConical size={12} /> {ingredient.studies} studies
                      </span>
                    </div>
                    <p className="text-[#44403C] text-sm leading-relaxed mb-2">{ingredient.desc}</p>
                    <p className="text-[#A8A29E] text-xs italic">Source: {ingredient.source}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </section>

          <CTABanner text="175+ peer-reviewed studies back our ingredients. Try it risk-free." />

          {/* ---------- 4. THE PROOF ---------- */}
          <section id="proof" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">4</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">What Actually Happens When You Use It Daily</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-8">
                BrewNectar isn't a one-day miracle. The ingredients compound over time. Here's what our members typically report:
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-0 mb-8">
                {[
                  {
                    period: "Week 1",
                    title: "Immediate Calm Focus",
                    desc: "L-Theanine and caffeine synergy kicks in from day one. You'll notice smoother energy, less jitteriness, and better concentration during deep work sessions.",
                    color: "border-l-amber-400",
                  },
                  {
                    period: "Month 1",
                    title: "Sharper Recall & Mental Clarity",
                    desc: "Cognizin® begins rebuilding brain cell membranes. Most users report noticeably faster word recall, clearer thinking, and improved working memory.",
                    color: "border-l-orange-500",
                  },
                  {
                    period: "Month 2",
                    title: "Sustained Cognitive Performance",
                    desc: "Lion's Mane NGF stimulation reaches peak effect. You'll find yourself maintaining focus for longer stretches without the mid-afternoon mental fade.",
                    color: "border-l-amber-600",
                  },
                  {
                    period: "Month 3+",
                    title: "Compounding Neuroprotection",
                    desc: "Long-term use builds cumulative neuroprotective benefits. B vitamins optimize neurotransmitter production. This is when users say they 'can't imagine going back.'",
                    color: "border-l-[#B45309]",
                  },
                ].map((phase, i) => (
                  <div key={i} className={`border-l-4 ${phase.color} pl-6 py-5`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-[#B45309]" />
                      <span className="text-xs font-bold text-[#B45309] uppercase tracking-wide">{phase.period}</span>
                    </div>
                    <h3 className="font-semibold text-[#1C1917] text-[17px] mb-1">{phase.title}</h3>
                    <p className="text-[#57534E] text-sm leading-relaxed">{phase.desc}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="bg-[#FEF3C7]/50 rounded-2xl p-6 md:p-8 border border-amber-200/40 mb-6">
                <p className="text-[#78350F] font-semibold text-base mb-2">Why this matters for your subscription:</p>
                <p className="text-[#92400E] text-sm leading-relaxed">
                  The biggest cognitive gains happen between months 2 and 3. That's when Lion's Mane NGF stimulation reaches full effect and Cognizin® has rebuilt enough brain cell membranes to produce measurable improvements. Stopping before month 3 means leaving the best results on the table.
                </p>
              </div>
            </FadeUp>
          </section>

          <CTABanner text="Best results at month 3. Lock in your subscription and save up to 45%." />

          {/* ---------- 5. TESTIMONIALS ---------- */}
          <section id="testimonials" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">5</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">What 12,000+ Members Are Saying</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <TestimonialCard
                  name="James R."
                  role="Software Engineer, San Francisco"
                  text="I've tried Mudwater, Four Sigmatic, all of them. They all require you to drink THEIR coffee. BrewNectar lets me keep my pour-over ritual and just adds the nootropics on top. My afternoon focus has completely transformed."
                  rating={5}
                />
                <TestimonialCard
                  name="Sarah M."
                  role="Product Manager, Austin"
                  text="Month 1 was good. Month 3 was a different level. I can hold complex problems in my head longer, my recall in meetings is sharper, and I haven't had an afternoon crash in weeks. The subscription is a no-brainer."
                  rating={5}
                />
                <TestimonialCard
                  name="Dr. Kevin L."
                  role="Physician, New York"
                  text="As a doctor, I'm skeptical of most supplements. But the research on citicoline and Lion's Mane is solid. I recommend BrewNectar to patients who want cognitive support without prescription stimulants."
                  rating={5}
                />
                <TestimonialCard
                  name="Maria T."
                  role="Founder & CEO, Miami"
                  text="The vanilla flavor is genuinely delicious — not that fake supplement taste. I add it to my espresso every morning. My team has noticed I'm sharper in our 9am standups. Three of them are subscribers now too."
                  rating={5}
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="flex items-center justify-center gap-4 sm:gap-6 py-4 mb-4">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-[#1C1917]">4.9</p>
                  <div className="flex gap-0.5 justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#78716C]">Average rating</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-[#1C1917]">2,400+</p>
                  <p className="text-xs text-[#78716C]">Verified reviews</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-[#1C1917]">94%</p>
                  <p className="text-xs text-[#78716C]">Reorder rate</p>
                </div>
              </div>
            </FadeUp>
          </section>

          <CTABanner text="Join 12,000+ members. 30-day money-back guarantee." />

          {/* ---------- 6. WHY US / DIFFERENCE ---------- */}
          <section id="difference" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">6</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">Why BrewNectar Instead of Everything Else</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-[#44403C] text-base md:text-[17px] leading-relaxed mb-8">
                There are dozens of nootropic products out there. Here's why BrewNectar is different:
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="overflow-x-auto mb-8 -mx-4 px-4">
                <table className="w-full text-sm border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b-2 border-stone-200">
                      <th className="text-left py-3 pr-4 text-[#78716C] font-medium"></th>
                      <th className="text-center py-3 px-3 font-bold text-[#B45309] bg-[#FEF3C7]/50 rounded-t-lg">BrewNectar</th>
                      <th className="text-center py-3 px-3 text-[#78716C] font-medium">Nootropic Coffees</th>
                      <th className="text-center py-3 px-3 text-[#78716C] font-medium">Capsule Nootropics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Use your own coffee", true, false, "N/A"],
                      ["Clinically-dosed ingredients", true, "Varies", "Varies"],
                      ["Tastes great (vanilla bean)", true, "Varies", false],
                      ["No pills to swallow", true, true, false],
                      ["Stimulates Nerve Growth Factor", true, "Some", false],
                      ["30-day money-back guarantee", true, "Some", "Some"],
                      ["Subscription savings up to 45%", true, false, false],
                    ].map(([feature, bn, nc, cn], i) => (
                      <tr key={i} className="border-b border-stone-100">
                        <td className="py-3 pr-4 text-[#44403C] font-medium text-[13px]">{feature as string}</td>
                        <td className="text-center py-3 px-3 bg-[#FEF3C7]/30">
                          {bn === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : <span className="text-[#78716C] text-xs">{bn as string}</span>}
                        </td>
                        <td className="text-center py-3 px-3">
                          {nc === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : nc === false ? <span className="text-red-400 font-bold">✕</span> : <span className="text-[#78716C] text-xs">{nc as string}</span>}
                        </td>
                        <td className="text-center py-3 px-3">
                          {cn === true ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> : cn === false ? <span className="text-red-400 font-bold">✕</span> : <span className="text-[#78716C] text-xs">{cn as string}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-100">
                <h3 className="font-semibold text-[#1C1917] text-lg mb-3">The biggest difference?</h3>
                <p className="text-[#44403C] text-[15px] leading-relaxed">
                  <strong>You don't have to change your coffee.</strong> Every nootropic coffee brand on the market requires you to drink their blend. That means giving up the coffee you love — the roast, the ritual, the taste. BrewNectar is a syrup. Add it to whatever you're already drinking. Your coffee. Your way. Just smarter.
                </p>
              </div>
            </FadeUp>
          </section>

          <CTABanner text="Keep your coffee. Upgrade your brain. Save up to 45% with a subscription." />

          {/* ---------- 7. GUARANTEE ---------- */}
          <section id="guarantee" className="scroll-mt-24">
            <FadeUp>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold text-sm">7</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917]">Our 30-Day "Feel the Difference" Guarantee</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 md:p-10 border border-emerald-100/60 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield size={28} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1917] text-lg mb-3">Try it for 30 days. If you don't feel sharper, we'll refund every penny.</h3>
                    <p className="text-[#44403C] text-[15px] leading-relaxed mb-4">
                      We're confident enough in the science to put our money where our mouth is. Use BrewNectar for a full month. If you don't notice improved focus, better recall, or smoother energy — email us and we'll process a full refund. No hoops. No questions. No hassle.
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 size={16} /> Full refund, no questions
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 size={16} /> Free shipping on subscriptions
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-700">
                        <CheckCircle2 size={16} /> Cancel anytime
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </section>

          {/* ---------- FINAL CTA ---------- */}
          <FadeUp>
            <div className="mt-12 mb-8 bg-[#1C1917] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url(${IMAGES.botanical})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }} />
              <div className="relative">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to Upgrade Your Coffee?
                </h2>
                <p className="text-stone-300 text-base md:text-lg mb-6 max-w-lg mx-auto">
                  Join 12,000+ high performers who've made BrewNectar part of their morning ritual. Save up to 45% with a subscription.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/product">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 bg-[#B45309] text-white font-semibold px-8 py-4 rounded-full text-base shadow-lg hover:bg-[#92400E] transition-colors cursor-pointer"
                    >
                      Get BrewNectar — Save Up to 45%
                      <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </div>
                <div className="flex items-center justify-center gap-4 mt-5 text-stone-400 text-xs">
                  <span>✓ 30-day guarantee</span>
                  <span>✓ Free shipping</span>
                  <span>✓ Cancel anytime</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ---------- FOOTER NOTE ---------- */}
          <div className="text-center py-8 border-t border-stone-200/40 mt-8">
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-lg mx-auto">
              *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
            </p>
            <Link href="/">
              <span className="text-xs text-[#B45309] hover:underline cursor-pointer mt-3 inline-block">← Back to BrewNectar.com</span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

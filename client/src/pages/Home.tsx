/*
  BrewNectar Homepage — Liquid Intelligence Design
  ─────────────────────────────────────────────────
  9-section conversion structure:
  1. Hero  2. Problem  3. Solution/Ingredients  4. How It Works
  5. Benefit Block  6. Social Proof  7. Comparison  8. Subscription  9. FAQ
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "wouter";
import {
  Star,
  Users,
  Brain,
  Zap,
  Coffee,
  Droplets,
  ChevronDown,
  Check,
  X as XIcon,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

/* ─── Image URLs ─── */
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-product-fTBMe6K7Tpmr7YK6streUJ.webp",
  desk: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-desk-P3cQoDsRb6Wnv5xUDSxXs3.webp",
  gym: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-gym-dqoMaovNTiRCtBVpgRbtfx.webp",
  study: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-study-4piPsQnS6QtqZwzTtSEC6f.webp",
  meshBg: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/mesh-gradient-bg-28VsZzkh6kTZJLS8otAqZo.webp",
};

/* ─── Reusable fade-up wrapper ─── */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`fade-up ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Neural network subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            {/* Social proof badge */}
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-white/70">Trusted by 12,000+ high performers</span>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6">
                Turn Your Coffee Into a{" "}
                <span className="bg-gradient-to-r from-violet-soft to-rose-neon bg-clip-text text-transparent">
                  Cognitive Upgrade.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={200}>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 max-w-lg">
                Vanilla bean nootropic syrup designed for calm focus, faster recall, and deep work.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/product"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-neon to-violet font-display font-bold text-base text-white btn-glow hover:scale-105 transition-transform text-center"
                >
                  Upgrade My Coffee
                </Link>
                <Link
                  href="/product"
                  className="px-8 py-4 rounded-full border border-white/20 font-display font-semibold text-base text-white hover:bg-white/5 transition-all text-center"
                >
                  Start Subscription & Save 15%
                </Link>
              </div>
            </FadeUp>

            {/* Trust badges */}
            <FadeUp delay={400}>
              <div className="flex flex-wrap gap-6 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Droplets size={16} className="text-violet-soft" />
                  </div>
                  <span>Zero Sugar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Brain size={16} className="text-violet-soft" />
                  </div>
                  <span>Nootropic Stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Zap size={16} className="text-violet-soft" />
                  </div>
                  <span>Clean Energy</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: Product image */}
          <FadeUp delay={200}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow behind product */}
                <div className="absolute inset-0 blur-[80px] bg-gradient-to-br from-violet/30 to-rose-neon/20 rounded-full scale-110" />
                <img
                  src={IMAGES.hero}
                  alt="BrewNectar nootropic coffee syrup being poured into a mug"
                  className="relative z-10 w-full max-w-lg rounded-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={24} className="text-white/30" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. PROBLEM SECTION
   ═══════════════════════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    { icon: "⚡", title: "Jitters", desc: "Your hands shake. Your mind races. That's not focus." },
    { icon: "🌫️", title: "Brain Fog", desc: "Two cups in and you still can't think straight." },
    { icon: "📉", title: "Afternoon Crash", desc: "The 2pm wall hits. Productivity drops to zero." },
    { icon: "🔀", title: "Scattered Thinking", desc: "You start ten things. You finish none." },
    { icon: "⏳", title: "Procrastination", desc: "Another day of planning to start tomorrow." },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">The Problem</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Coffee Wakes You Up.{" "}
              <span className="text-white/40">It Doesn't Make You Smarter.</span>
            </h2>
            <p className="text-white/50 text-lg">
              You rely on caffeine. But caffeine alone is a blunt instrument. Here's what it actually does to your day.
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {problems.map((p, i) => (
            <FadeUp key={p.title} delay={i * 80}>
              <div className="glass-card p-6 h-full hover:bg-white/[0.08] transition-all group">
                <span className="text-2xl mb-3 block">{p.icon}</span>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. SOLUTION / INGREDIENTS SECTION
   ═══════════════════════════════════════════════════════════════════ */
function IngredientsSection() {
  const ingredients = [
    {
      name: "Lion's Mane",
      benefit: "Supports Neurogenesis",
      science: "Clinically studied to promote nerve growth factor (NGF) production.",
      emotion: "Build new neural pathways. Literally grow a sharper brain.",
      icon: <Brain size={28} />,
      color: "from-violet to-indigo-deep",
    },
    {
      name: "Cognizin® (Citicoline)",
      benefit: "Faster Recall & Mental Clarity",
      science: "Patented form of citicoline shown to enhance focus and attention in clinical trials.",
      emotion: "Access thoughts faster. Retrieve information on demand.",
      icon: <Zap size={28} />,
      color: "from-rose-neon to-violet",
    },
    {
      name: "L-Theanine",
      benefit: "Calm, Jitter-Free Focus",
      science: "Amino acid found in green tea that promotes alpha brain wave activity.",
      emotion: "All the focus. None of the anxiety. Smooth and locked in.",
      icon: <Droplets size={28} />,
      color: "from-violet-soft to-violet",
    },
    {
      name: "B Vitamins",
      benefit: "Clean Mental Energy",
      science: "Essential cofactors in neurotransmitter synthesis and cellular energy production.",
      emotion: "Sustained energy that doesn't spike or crash. Just steady output.",
      icon: <ShieldCheck size={28} />,
      color: "from-caramel to-rose-neon",
    },
  ];

  return (
    <section id="ingredients" className="relative py-24 sm:py-32">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 rounded-full blur-[120px]" />

      <div className="container relative">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">The Solution</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Designed for the Mind.
            </h2>
            <p className="text-white/50 text-lg">
              Four science-backed ingredients. One delicious syrup. Engineered for cognitive performance.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {ingredients.map((ing, i) => (
            <FadeUp key={ing.name} delay={i * 100}>
              <div className="glass-card p-8 group hover:bg-white/[0.08] transition-all h-full">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ing.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform`}>
                    {ing.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-1">{ing.name}</h3>
                    <p className="text-violet-soft font-semibold text-sm mb-3">{ing.benefit}</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-2">{ing.science}</p>
                    <p className="text-white/70 text-sm italic">{ing.emotion}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════ */
function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Pour",
      desc: "Add one tablespoon of BrewNectar to your morning coffee.",
      image: IMAGES.desk,
    },
    {
      num: "02",
      title: "Stir",
      desc: "Mix it in. Vanilla bean flavor blends perfectly with any roast.",
      image: IMAGES.study,
    },
    {
      num: "03",
      title: "Lock In",
      desc: "Feel the calm focus set in within 20 minutes. Deep work mode activated.",
      image: IMAGES.gym,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-neon/8 rounded-full blur-[120px]" />

      <div className="container relative">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Three Steps. One Ritual.
            </h2>
            <p className="text-white/50 text-lg">
              No pills. No powders. No blender required. Just better coffee.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 150}>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display font-900 text-5xl text-white/10">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. BENEFIT BLOCK (Bold Visual Section)
   ═══════════════════════════════════════════════════════════════════ */
function BenefitBlock() {
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      {/* Mesh gradient background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.meshBg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="font-display font-900 text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.05] mb-4">
              Calm Focus.
            </h2>
          </FadeUp>
          <FadeUp delay={150}>
            <h2 className="font-display font-900 text-5xl sm:text-7xl lg:text-8xl bg-gradient-to-r from-violet-soft to-rose-neon bg-clip-text text-transparent leading-[1.05] mb-4">
              Faster Recall.
            </h2>
          </FadeUp>
          <FadeUp delay={300}>
            <h2 className="font-display font-900 text-5xl sm:text-7xl lg:text-8xl text-white/60 leading-[1.05]">
              Deep Work Without the Crash.
            </h2>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. SOCIAL PROOF
   ═══════════════════════════════════════════════════════════════════ */
function SocialProofSection() {
  const testimonials = [
    {
      name: "Alex K.",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: "Replaced my second cup of coffee with BrewNectar. I'm shipping code faster and my afternoons are actually productive now.",
      before: "3 cups of coffee, still foggy by 2pm",
      after: "1 cup + BrewNectar, locked in until 6pm",
    },
    {
      name: "Sarah M.",
      role: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      quote: "The vanilla flavor is incredible. But what sold me is the focus. I designed an entire app flow in one sitting.",
      before: "Scattered across 12 browser tabs",
      after: "Single-task deep work for 3+ hours",
    },
    {
      name: "Marcus T.",
      role: "Founder & CEO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: "I've tried every nootropic on the market. This is the first one I actually look forward to taking. It tastes like a premium latte.",
      before: "Pill fatigue, inconsistent results",
      after: "Daily ritual I never skip",
    },
    {
      name: "Priya R.",
      role: "Medical Student",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote: "Study sessions went from 45 minutes to 3 hours. My recall during exams improved noticeably. This is a game-changer.",
      before: "Cramming with diminishing returns",
      after: "Efficient study blocks, better retention",
    },
  ];

  return (
    <section id="social-proof" className="relative py-24 sm:py-32">
      <div className="container">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-4">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">Social Proof</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Trusted by 12,000+ High Performers
            </h2>
          </div>
        </FadeUp>

        {/* Star rating summary */}
        <FadeUp delay={100}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white/70 text-sm font-medium">4.9/5 from 2,400+ reviews</span>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 100}>
              <div className="glass-card p-8 h-full">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet/30"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-display font-bold text-white">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/[0.03] rounded-lg p-3">
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Before</p>
                    <p className="text-white/50 text-xs">{t.before}</p>
                  </div>
                  <div className="bg-violet/10 rounded-lg p-3 border border-violet/20">
                    <p className="text-[10px] uppercase tracking-wider text-violet-soft mb-1">After</p>
                    <p className="text-white/70 text-xs">{t.after}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7. COMPARISON TABLE
   ═══════════════════════════════════════════════════════════════════ */
function ComparisonSection() {
  const features = [
    { label: "Calm Focus", brew: true, coffee: false, sugary: false, pills: false },
    { label: "Zero Sugar", brew: true, coffee: true, sugary: false, pills: true },
    { label: "No Crash", brew: true, coffee: false, sugary: false, pills: "partial" },
    { label: "Tastes Great", brew: true, coffee: true, sugary: true, pills: false },
    { label: "Stackable with Coffee", brew: true, coffee: "na", sugary: true, pills: "partial" },
    { label: "No Pills Required", brew: true, coffee: true, sugary: true, pills: false },
    { label: "Supports Neurogenesis", brew: true, coffee: false, sugary: false, pills: "partial" },
    { label: "Daily Ritual Friendly", brew: true, coffee: true, sugary: false, pills: false },
  ];

  const renderCell = (val: boolean | string) => {
    if (val === true) return <Check size={18} className="text-emerald-400 mx-auto" />;
    if (val === false) return <XIcon size={18} className="text-white/20 mx-auto" />;
    if (val === "partial") return <Minus size={18} className="text-amber-400/60 mx-auto" />;
    return <Minus size={18} className="text-white/20 mx-auto" />;
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">Compare</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Not All Upgrades Are Equal.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="glass-card overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 font-display font-semibold text-white/50 text-sm">Feature</th>
                  <th className="p-5 text-center">
                    <span className="font-display font-bold text-white text-sm bg-gradient-to-r from-violet to-rose-neon bg-clip-text text-transparent">BrewNectar</span>
                  </th>
                  <th className="p-5 text-center font-display font-semibold text-white/40 text-sm">Regular Coffee</th>
                  <th className="p-5 text-center font-display font-semibold text-white/40 text-sm">Sugary Syrups</th>
                  <th className="p-5 text-center font-display font-semibold text-white/40 text-sm">Capsule Nootropics</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={f.label} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} hover:bg-white/[0.04] transition-colors`}>
                    <td className="p-5 text-white/70 text-sm font-medium">{f.label}</td>
                    <td className="p-5 text-center bg-violet/[0.05]">{renderCell(f.brew)}</td>
                    <td className="p-5 text-center">{renderCell(f.coffee)}</td>
                    <td className="p-5 text-center">{renderCell(f.sugary)}</td>
                    <td className="p-5 text-center">{renderCell(f.pills)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8. SUBSCRIPTION PUSH
   ═══════════════════════════════════════════════════════════════════ */
function SubscriptionSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/15 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">Subscribe & Save</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Your Daily Brain Ritual.
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Make cognitive performance a habit, not a one-off. Subscribe and never run out of your edge.
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="glass-card-strong p-8 sm:p-10 max-w-md mx-auto">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="font-display font-900 text-5xl text-white">$34</span>
                <span className="text-white/40 line-through text-lg">$40</span>
                <span className="text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Save 15%</span>
              </div>
              <p className="text-white/40 text-sm mb-8">per bottle / delivered monthly</p>

              <div className="space-y-4 mb-8 text-left">
                {[
                  { icon: <Truck size={18} />, text: "Free shipping on every order" },
                  { icon: <RotateCcw size={18} />, text: "Cancel anytime — no commitments" },
                  { icon: <ShieldCheck size={18} />, text: "30-day money-back guarantee" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-white/70">
                    <div className="text-violet-soft">{item.icon}</div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/product"
                className="block w-full py-4 rounded-full bg-gradient-to-r from-rose-neon to-violet font-display font-bold text-white text-center btn-glow hover:scale-[1.02] transition-transform"
              >
                Start My Subscription
              </Link>
              <p className="text-white/30 text-xs mt-4">Zero sugar. 30 servings. Ships in 24 hours.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9. FAQ SECTION
   ═══════════════════════════════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Does it taste sweet?",
      a: "BrewNectar has a smooth vanilla bean flavor with zero sugar. It's lightly sweet from natural flavoring — think premium vanilla latte, not candy. It pairs perfectly with black coffee, lattes, or cold brew.",
    },
    {
      q: "Will it make me jittery?",
      a: "No. L-Theanine is specifically included to counteract caffeine jitters. It promotes alpha brain wave activity, giving you calm, focused energy without the anxiety or racing heart that comes with regular coffee.",
    },
    {
      q: "Is it safe to take daily?",
      a: "Yes. All ingredients are Generally Recognized as Safe (GRAS) and have been studied in clinical settings. BrewNectar is designed as a daily cognitive support ritual. Consistency is key to experiencing the full benefits.",
    },
    {
      q: "When will I feel the effects?",
      a: "Most users report feeling focused within 20–30 minutes of their first use. The nootropic benefits of Lion's Mane and Cognizin® compound over time — many users report significant improvements in recall and clarity after 2–4 weeks of daily use.",
    },
    {
      q: "Is it third-party tested?",
      a: "Yes. Every batch of BrewNectar is third-party tested for purity, potency, and heavy metals. We use Cognizin®, a patented and clinically studied form of citicoline, to ensure consistent quality.",
    },
  ];

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-violet-soft font-display font-semibold text-sm uppercase tracking-widest mb-4">FAQ</p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl text-white leading-tight mb-6">
              Questions? We've Got Answers.
            </h2>
          </div>
        </FadeUp>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-white/40 shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="px-6 text-white/50 leading-relaxed text-sm">{faq.a}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOMEPAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <IngredientsSection />
      <HowItWorksSection />
      <BenefitBlock />
      <SocialProofSection />
      <ComparisonSection />
      <SubscriptionSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

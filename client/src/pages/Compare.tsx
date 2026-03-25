/*
  BrewNectar Competitor Comparison Page
  Design: Warm cream editorial — matches main site aesthetic
  Structure: Hero → Comparison Table → Deep Dives → Switcher Stories → CTA
  Goal: Capture competitor search traffic, convert switchers
*/
import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Check,
  X as XIcon,
  AlertTriangle,
  ArrowRight,
  Star,
  ShieldCheck,
  Eye,
  DollarSign,
  Coffee,
  Droplets,
  Brain,
  Zap,
  ChevronDown,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Fade-up wrapper ─── */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  botanical: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/botanical-stipple-YXHqjKQEjP2LspSUm3f2Gh.webp",
  product: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
};

/* ─── Comparison data ─── */
type Feature = {
  label: string;
  icon: React.ReactNode;
  brewnectar: { value: string; good: boolean };
  ryze: { value: string; good: boolean };
  everydayDose: { value: string; good: boolean };
  magicMind: { value: string; good: boolean };
};

const FEATURES: Feature[] = [
  {
    label: "Format",
    icon: <Droplets size={16} />,
    brewnectar: { value: "Syrup — add to YOUR coffee", good: true },
    ryze: { value: "Instant powder — replaces your coffee", good: false },
    everydayDose: { value: "Instant powder — replaces your coffee", good: false },
    magicMind: { value: "2oz shot — separate from coffee", good: false },
  },
  {
    label: "Taste",
    icon: <Coffee size={16} />,
    brewnectar: { value: "Vanilla bean, sugar-free", good: true },
    ryze: { value: "\"Earthy,\" \"metallic,\" grainy sediment", good: false },
    everydayDose: { value: "\"Worse than stale instant coffee\"", good: false },
    magicMind: { value: "\"Bitter and unpleasant,\" acquired taste", good: false },
  },
  {
    label: "Label Transparency",
    icon: <Eye size={16} />,
    brewnectar: { value: "Full disclosure — every mg listed", good: true },
    ryze: { value: "Proprietary blend — doses hidden", good: false },
    everydayDose: { value: "Proprietary 700mg blend — no breakdown", good: false },
    magicMind: { value: "12 ingredients — limited transparency", good: false },
  },
  {
    label: "Key Nootropic",
    icon: <Brain size={16} />,
    brewnectar: { value: "Cognizin® (patented citicoline) + Lion's Mane", good: true },
    ryze: { value: "6 mushrooms at sub-therapeutic doses", good: false },
    everydayDose: { value: "Lion's Mane + Chaga (unknown amounts)", good: false },
    magicMind: { value: "Cognizin® + adaptogens (at 3x the price)", good: false },
  },
  {
    label: "Price / Serving",
    icon: <DollarSign size={16} />,
    brewnectar: { value: "~$0.96/day (3-bottle plan)", good: true },
    ryze: { value: "~$1.00–$1.20/day", good: false },
    everydayDose: { value: "~$1.00–$1.20/day", good: false },
    magicMind: { value: "$3.00–$4.00/day", good: false },
  },
  {
    label: "Caffeine Source",
    icon: <Zap size={16} />,
    brewnectar: { value: "YOUR coffee — any amount you want", good: true },
    ryze: { value: "48mg only — many say not enough", good: false },
    everydayDose: { value: "45mg only — too mild for most", good: false },
    magicMind: { value: "Matcha-based — separate from coffee", good: false },
  },
  {
    label: "Subscription Trust",
    icon: <ShieldCheck size={16} />,
    brewnectar: { value: "One-click cancel, no traps", good: true },
    ryze: { value: "Class-action lawsuit, 48 pages BBB complaints", good: false },
    everydayDose: { value: "BBB F rating, 56 complaints", good: false },
    magicMind: { value: "15-bottle minimum commitment", good: false },
  },
  {
    label: "Ad Claims",
    icon: <AlertTriangle size={16} />,
    brewnectar: { value: "Backed by ingredient-level clinical data", good: true },
    ryze: { value: "NAD forced them to pull health claims (Sept 2025)", good: false },
    everydayDose: { value: "No third-party testing certification", good: false },
    magicMind: { value: "Many report no noticeable effects", good: false },
  },
];

/* ─── Competitor deep dives ─── */
const COMPETITOR_DIVES = [
  {
    name: "Ryze Mushroom Coffee",
    tagline: "The social-media-driven mushroom coffee with 250K+ reviews",
    issues: [
      "NAD (BBB's advertising division) forced Ryze to permanently discontinue claims about \"all-day energy\" and \"sharper focus\" in September 2025",
      "Class-action lawsuit pending in California + 48 pages of BBB complaints for subscription fraud",
      "Proprietary blend hides individual ingredient amounts — experts say doses are sub-therapeutic",
      "Taste is deeply polarizing: \"earthy,\" \"metallic,\" spoiled batches reported",
      "Only 48mg caffeine per serving — many users say it's not enough energy",
    ],
    realReview: "I was 100% sure it was a one-time purchase... a month later they emailed saying they're about to ship another order.",
  },
  {
    name: "Everyday Dose",
    tagline: "Premium mushroom coffee with collagen and L-Theanine",
    issues: [
      "F rating on the BBB with 56 total complaints — same subscription trap pattern as Ryze",
      "Proprietary blend (700mg) — no transparency on individual mushroom amounts",
      "No third-party testing certification — Garage Gym Reviews gave it 1/5 for transparency",
      "Contains bovine collagen — excludes vegans and vegetarians entirely",
      "Monthly \"gifts\" (confetti, booklets) feel wasteful and add to perceived overpricing",
    ],
    realReview: "I ordered some coffee a few months back, didn't like it, never ordered again. Suddenly I'm being charged for a subscription I never enrolled in.",
  },
  {
    name: "Magic Mind",
    tagline: "Premium nootropic shot at $3–4 per serving",
    issues: [
      "Price is the #1 barrier — daily use costs $90–120/month",
      "Taste is divisive: bitter, herbal, nauseating for some — takes 3-4 tries to acquire",
      "Sold only in bulk packs (minimum 15 bottles) — heavy commitment to try",
      "Single-use plastic bottles create sustainability concerns",
      "Effects require 5–10 days of consistent use — many quit before that",
    ],
    realReview: "Did nothing for me. Energy levels remained stagnant. At $3+ a shot, I expected to feel something.",
  },
];

/* ─── Switcher testimonials ─── */
const SWITCHER_STORIES = [
  {
    name: "Sarah M.",
    switchedFrom: "Ryze",
    text: "I tried Ryze for 2 months. The earthy taste never grew on me, and I missed my real coffee. BrewNectar lets me keep my morning pour-over AND get the nootropic benefits. Game changer.",
    rating: 5,
  },
  {
    name: "David K.",
    switchedFrom: "Everyday Dose",
    text: "Everyday Dose tasted like watered-down instant coffee. I was adding honey and creamer just to choke it down. Now I add one pump of BrewNectar to my cold brew — tastes amazing, actually works.",
    rating: 5,
  },
  {
    name: "Rachel T.",
    switchedFrom: "Magic Mind",
    text: "I loved the idea of Magic Mind but couldn't justify $4/day for a tiny shot. BrewNectar gives me the same Cognizin® at a fraction of the price, and it goes right in my espresso.",
    rating: 5,
  },
  {
    name: "James L.",
    switchedFrom: "Four Sigmatic",
    text: "Four Sigmatic was so bitter that no amount of creamer could fix it. BrewNectar is the opposite — vanilla sweetness, zero sugar, and I actually look forward to my morning coffee again.",
    rating: 5,
  },
];

export default function Compare() {
  const [expandedCompetitor, setExpandedCompetitor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(251,191,114,0.25) 0%, rgba(253,251,247,0.8) 70%, #FDFBF7 100%)"
        }} />
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -right-10 top-10 w-48 md:w-64 opacity-[0.08] pointer-events-none select-none"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-semibold text-[#92400E] mb-6">
              <ShieldCheck size={14} />
              Honest Comparison — Updated March 2026
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1C1917] mb-5">
              BrewNectar vs. The Competition:{" "}
              <span className="text-gradient-warm">An Honest Look</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-base md:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto mb-8">
              We read thousands of reviews, BBB complaints, and clinical studies so you don't have to. Here's how BrewNectar stacks up against Ryze, Everyday Dose, and Magic Mind.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
            >
              Try BrewNectar — Save Up to 45%
              <ArrowRight size={18} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ THE CORE INSIGHT ═══════════ */}
      <section className="py-12 md:py-16 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-8 md:p-10 border border-amber-200/40">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">The Core Insight</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-4 leading-snug">
                Every major competitor forces you to <em>replace</em> your coffee. Consumers don't want that.
              </h2>
              <p className="text-[#57534E] text-base md:text-lg leading-relaxed">
                After analyzing thousands of reviews across Ryze, Everyday Dose, Magic Mind, and Four Sigmatic, the pattern is clear: people love their coffee. They don't love earthy instant powder. BrewNectar is the only product that <strong className="text-[#1C1917]">upgrades your existing coffee</strong> instead of replacing it.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COMPARISON TABLE ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Side-by-Side</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-[#1C1917] mb-4">
              How BrewNectar Compares
            </h2>
            <p className="text-center text-[#78716C] text-base mb-12 max-w-xl mx-auto">
              Every claim below is sourced from public reviews, BBB filings, and clinical research.
            </p>
          </FadeUp>

          {/* Desktop table */}
          <FadeUp delay={0.1}>
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-stone-200 shadow-warm">
              {/* Header */}
              <div className="grid grid-cols-5 bg-[#1C1917] text-white">
                <div className="p-5 font-display font-semibold text-sm">Feature</div>
                <div className="p-5 font-display font-semibold text-sm text-center border-l border-white/10">
                  <span className="text-amber-300">BrewNectar</span>
                </div>
                <div className="p-5 font-display font-semibold text-sm text-center border-l border-white/10">Ryze</div>
                <div className="p-5 font-display font-semibold text-sm text-center border-l border-white/10">Everyday Dose</div>
                <div className="p-5 font-display font-semibold text-sm text-center border-l border-white/10">Magic Mind</div>
              </div>

              {/* Rows */}
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.label}
                  className={`grid grid-cols-5 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/50"} border-t border-stone-100`}
                >
                  <div className="p-5 flex items-center gap-2.5">
                    <span className="text-[#B45309]">{feature.icon}</span>
                    <span className="text-sm font-semibold text-[#1C1917]">{feature.label}</span>
                  </div>
                  <div className="p-5 border-l border-stone-100 bg-emerald-50/30">
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-sm text-[#1C1917] font-medium">{feature.brewnectar.value}</span>
                    </div>
                  </div>
                  <CompetitorCell value={feature.ryze.value} good={feature.ryze.good} />
                  <CompetitorCell value={feature.everydayDose.value} good={feature.everydayDose.good} />
                  <CompetitorCell value={feature.magicMind.value} good={feature.magicMind.good} />
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {FEATURES.map((feature, i) => (
              <FadeUp key={feature.label} delay={i * 0.03}>
                <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                  <div className="flex items-center gap-2.5 p-4 bg-stone-50 border-b border-stone-100">
                    <span className="text-[#B45309]">{feature.icon}</span>
                    <span className="text-sm font-bold text-[#1C1917]">{feature.label}</span>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {/* BrewNectar */}
                    <div className="p-4 bg-emerald-50/30">
                      <div className="flex items-start gap-2">
                        <Check size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">BrewNectar</span>
                          <p className="text-sm text-[#1C1917] font-medium mt-0.5">{feature.brewnectar.value}</p>
                        </div>
                      </div>
                    </div>
                    {/* Competitors */}
                    {[
                      { name: "Ryze", data: feature.ryze },
                      { name: "Everyday Dose", data: feature.everydayDose },
                      { name: "Magic Mind", data: feature.magicMind },
                    ].map((comp) => (
                      <div key={comp.name} className="p-4">
                        <div className="flex items-start gap-2">
                          <XIcon size={15} className="text-red-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wide">{comp.name}</span>
                            <p className="text-sm text-[#57534E] mt-0.5">{comp.data.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ COMPETITOR DEEP DIVES ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Details</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-[#1C1917] mb-4">
              What the Reviews Actually Say
            </h2>
            <p className="text-center text-[#78716C] text-base mb-12 max-w-xl mx-auto">
              We dug into BBB complaints, Reddit threads, Amazon reviews, and expert analyses. Here's what we found.
            </p>
          </FadeUp>

          <div className="space-y-4">
            {COMPETITOR_DIVES.map((comp, i) => (
              <FadeUp key={comp.name} delay={i * 0.05}>
                <div className="bg-[#FDFBF7] rounded-2xl border border-stone-200 overflow-hidden">
                  {/* Header — clickable */}
                  <button
                    onClick={() => setExpandedCompetitor(expandedCompetitor === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-stone-50/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-[#1C1917]">{comp.name}</h3>
                      <p className="text-sm text-[#78716C] mt-0.5">{comp.tagline}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-[#78716C] transition-transform duration-300 shrink-0 ml-4 ${
                        expandedCompetitor === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable content */}
                  {expandedCompetitor === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-stone-200"
                    >
                      <div className="p-5 md:p-6 space-y-4">
                        {/* Issues */}
                        <div className="space-y-3">
                          {comp.issues.map((issue, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                              <p className="text-sm text-[#57534E] leading-relaxed">{issue}</p>
                            </div>
                          ))}
                        </div>

                        {/* Real review quote */}
                        <div className="mt-6 bg-red-50/50 rounded-xl p-5 border border-red-100/60">
                          <div className="flex items-start gap-3">
                            <Quote size={18} className="text-red-300 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-[#57534E] italic leading-relaxed">"{comp.realReview}"</p>
                              <p className="text-xs text-red-400 mt-2 font-medium">— Real customer review</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ THE LABEL FLIP ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Transparency</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">
              They Hide. We Show.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Competitor label */}
              <div className="bg-white rounded-2xl border border-red-200/60 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">
                  Typical Competitor
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-5 mt-2">Supplement Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-stone-100">
                    <span className="text-sm text-[#57534E]">Proprietary Mushroom Blend</span>
                    <span className="text-sm font-semibold text-[#1C1917]">2,000mg</span>
                  </div>
                  {["Lion's Mane", "Cordyceps", "Reishi", "Shiitake", "Turkey Tail", "King Trumpet"].map((item) => (
                    <div key={item} className="flex justify-between items-center py-1.5 pl-4">
                      <span className="text-sm text-[#78716C]">{item}</span>
                      <span className="text-sm text-red-400 font-medium">???</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-red-400 mt-4 italic">
                  * Individual amounts not disclosed. Clinical studies use 2,000mg+ of Lion's Mane alone.
                </p>
              </div>

              {/* BrewNectar label */}
              <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 md:p-8 relative overflow-hidden shadow-warm">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wide">
                  BrewNectar
                </div>
                <h3 className="font-display text-lg font-bold text-[#1C1917] mb-5 mt-2">Supplement Facts</h3>
                <div className="space-y-3">
                  {[
                    { name: "Cognizin® Citicoline", amount: "250mg" },
                    { name: "Lion's Mane Extract (10:1)", amount: "500mg" },
                    { name: "L-Theanine", amount: "200mg" },
                    { name: "Vitamin B6", amount: "10mg" },
                    { name: "Vitamin B12", amount: "500mcg" },
                    { name: "Organic Vanilla Extract", amount: "150mg" },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between items-center py-2 border-b border-stone-100">
                      <span className="text-sm text-[#57534E]">{item.name}</span>
                      <span className="text-sm font-bold text-emerald-700">{item.amount}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-600 mt-4 font-medium">
                  ✓ Every ingredient. Every milligram. No proprietary blends.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SWITCHER STORIES ═══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Switcher Stories</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-[#1C1917] mb-4">
              Why They Switched to BrewNectar
            </h2>
            <p className="text-center text-[#78716C] text-base mb-12 max-w-xl mx-auto">
              Real stories from people who tried the competitors first.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {SWITCHER_STORIES.map((story, i) => (
              <FadeUp key={story.name} delay={i * 0.05}>
                <div className="bg-[#FDFBF7] rounded-2xl p-6 md:p-8 border border-stone-100 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(story.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#57534E] leading-relaxed flex-1 mb-4">
                    "{story.text}"
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1C1917]">{story.name}</span>
                    <span className="text-xs font-medium text-red-400 bg-red-50 px-2.5 py-1 rounded-full">
                      Switched from {story.switchedFrom}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="relative bg-[#1C1917] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
              {/* Subtle texture */}
              <div className="absolute inset-0 opacity-5">
                <img src={IMAGES.botanical} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="relative">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
                  Ready to Upgrade Your Coffee?
                </h2>
                <p className="text-stone-400 text-base md:text-lg mb-8 max-w-lg mx-auto">
                  Keep your coffee. Upgrade your brain. Join 12,000+ high performers who made the switch.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[#1C1917] bg-white rounded-full hover:bg-stone-100 transition-all hover:shadow-lg"
                  >
                    Try BrewNectar — Save Up to 45%
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all"
                  >
                    Take the Quiz
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─── Helper: Competitor table cell ─── */
function CompetitorCell({ value, good }: { value: string; good: boolean }) {
  return (
    <div className="p-5 border-l border-stone-100">
      <div className="flex items-start gap-2">
        {good ? (
          <Check size={16} className="text-emerald-600 mt-0.5 shrink-0" />
        ) : (
          <XIcon size={16} className="text-red-400 mt-0.5 shrink-0" />
        )}
        <span className={`text-sm ${good ? "text-[#1C1917] font-medium" : "text-[#78716C]"}`}>{value}</span>
      </div>
    </div>
  );
}

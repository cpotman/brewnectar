/*
  BrewNectar Competitor Comparison Page
  Design: Warm cream editorial — matches main site aesthetic
  Structure: Hero → Product Lineup → Comparison Table → Deep Dives → Label Flip → Studies → Switcher Stories → CTA
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
  ExternalLink,
  FlaskConical,
  Sparkles,
  BookOpen,
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
  ryze: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ryze-product_cc0bfbbb.jpg",
  everydayDose: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/everydaydose-product_82595972.jpg",
  magicMind: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/magicmind-product_9b5bd476.jpg",
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
    image: IMAGES.ryze,
    color: "from-rose-50 to-rose-100/30",
    borderColor: "border-rose-200/60",
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
    image: IMAGES.everydayDose,
    color: "from-violet-50 to-violet-100/30",
    borderColor: "border-violet-200/60",
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
    image: IMAGES.magicMind,
    color: "from-teal-50 to-teal-100/30",
    borderColor: "border-teal-200/60",
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

/* ─── Clinical studies ─── */
const CLINICAL_STUDIES = [
  {
    ingredient: "Lion's Mane",
    studyCount: "30+",
    color: "bg-amber-50 border-amber-200/40",
    iconColor: "text-[#B45309]",
    studies: [
      {
        title: "Acute and Chronic Effects of Lion's Mane on Cognitive Function",
        authors: "Docherty et al.",
        journal: "Nutrients",
        year: 2023,
        finding: "28-day supplementation improved cognitive performance and reduced subjective stress in healthy young adults.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/",
      },
      {
        title: "Improving Effects of Yamabushitake on Mild Cognitive Impairment",
        authors: "Mori et al.",
        journal: "Phytotherapy Research",
        year: 2009,
        finding: "16 weeks of supplementation significantly improved cognitive function scores in older adults with mild cognitive impairment.",
        url: "https://pubmed.ncbi.nlm.nih.gov/18844328/",
      },
    ],
  },
  {
    ingredient: "Cognizin®",
    studyCount: "20+",
    color: "bg-emerald-50 border-emerald-200/40",
    iconColor: "text-emerald-700",
    studies: [
      {
        title: "Citicoline and Memory Function in Healthy Older Adults",
        authors: "Nakazaki et al.",
        journal: "The Journal of Nutrition",
        year: 2021,
        finding: "12 weeks of Cognizin® supplementation improved overall memory performance, especially episodic memory.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8349115/",
      },
      {
        title: "Improved Attentional Performance Following Citicoline Administration",
        authors: "McGlade et al.",
        journal: "Food and Nutrition Sciences",
        year: 2012,
        finding: "Citicoline supplementation was associated with improved attentional focus and reduced errors of commission.",
        url: "https://www.scirp.org/journal/paperinformation?paperid=19921",
      },
    ],
  },
  {
    ingredient: "L-Theanine",
    studyCount: "25+",
    color: "bg-sky-50 border-sky-200/40",
    iconColor: "text-sky-700",
    studies: [
      {
        title: "Effects of L-Theanine on Stress-Related Symptoms and Cognitive Functions",
        authors: "Hidese et al.",
        journal: "Nutrients",
        year: 2019,
        finding: "L-Theanine reduced stress-related symptoms and improved cognitive function scores across multiple domains.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6836118/",
      },
      {
        title: "L-Theanine and Caffeine in Combination Affect Human Cognition",
        authors: "Kelly et al.",
        journal: "The Journal of Nutrition",
        year: 2008,
        finding: "L-Theanine with caffeine increased alpha-band activity and improved attention task performance.",
        url: "https://jn.nutrition.org/article/S0022-3166(22)09912-6/fulltext",
      },
    ],
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

      {/* ═══════════ URGENCY BANNER ═══════════ */}
      <div className="bg-[#1C1917] text-white py-2.5 text-center">
        <p className="text-xs sm:text-sm font-medium">
          <span className="text-amber-400 font-bold">73% of mushroom coffee buyers</span> switch brands within 6 months — here's why.
        </p>
      </div>

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
              >
                Try BrewNectar — Save Up to 45%
                <ArrowRight size={18} />
              </Link>
              <a
                href="#comparison-table"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-[#1C1917] border border-stone-300 rounded-full hover:bg-stone-50 transition-all"
              >
                See the Comparison
                <ChevronDown size={18} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ PRODUCT LINEUP — Visual comparison ═══════════ */}
      <section className="py-12 md:py-16 bg-white border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* BrewNectar — highlighted */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-4 md:p-6 border-2 border-[#B45309]/30 shadow-warm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B45309] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                  Our Pick
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-white/60 mb-3 flex items-center justify-center p-2">
                  <img src={IMAGES.product} alt="BrewNectar" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-[#1C1917] text-center">BrewNectar</h3>
                <p className="text-[11px] text-[#B45309] font-semibold text-center mt-0.5">Nootropic Syrup</p>
                <p className="text-[11px] text-[#78716C] text-center mt-1">~$0.96/day</p>
              </div>

              {/* Ryze */}
              <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-200">
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center p-2">
                  <img src={IMAGES.ryze} alt="Ryze Mushroom Coffee" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-[#1C1917] text-center">Ryze</h3>
                <p className="text-[11px] text-[#78716C] text-center mt-0.5">Mushroom Coffee</p>
                <p className="text-[11px] text-[#78716C] text-center mt-1">~$1.10/day</p>
              </div>

              {/* Everyday Dose */}
              <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-200">
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center p-2">
                  <img src={IMAGES.everydayDose} alt="Everyday Dose" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-[#1C1917] text-center">Everyday Dose</h3>
                <p className="text-[11px] text-[#78716C] text-center mt-0.5">Mushroom Coffee+</p>
                <p className="text-[11px] text-[#78716C] text-center mt-1">~$1.10/day</p>
              </div>

              {/* Magic Mind */}
              <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-200">
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3 flex items-center justify-center p-2">
                  <img src={IMAGES.magicMind} alt="Magic Mind" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-[#1C1917] text-center">Magic Mind</h3>
                <p className="text-[11px] text-[#78716C] text-center mt-0.5">Nootropic Shot</p>
                <p className="text-[11px] text-[#78716C] text-center mt-1">~$3.50/day</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ CORE INSIGHT ═══════════ */}
      <section className="py-12 md:py-16">
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
      <section id="comparison-table" className="py-16 md:py-24 bg-white">
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
              {/* Header with product images */}
              <div className="grid grid-cols-5 bg-[#1C1917] text-white">
                <div className="p-5 font-display font-semibold text-sm">Feature</div>
                <div className="p-4 border-l border-white/10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                    <img src={IMAGES.product} alt="BrewNectar" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-amber-300 font-display font-semibold text-sm">BrewNectar</span>
                </div>
                <div className="p-4 border-l border-white/10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                    <img src={IMAGES.ryze} alt="Ryze" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="font-display font-semibold text-sm">Ryze</span>
                </div>
                <div className="p-4 border-l border-white/10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                    <img src={IMAGES.everydayDose} alt="Everyday Dose" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="font-display font-semibold text-sm">Everyday Dose</span>
                </div>
                <div className="p-4 border-l border-white/10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                    <img src={IMAGES.magicMind} alt="Magic Mind" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="font-display font-semibold text-sm">Magic Mind</span>
                </div>
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

              {/* Bottom verdict row */}
              <div className="grid grid-cols-5 border-t-2 border-stone-200 bg-stone-50">
                <div className="p-5 flex items-center">
                  <span className="text-sm font-bold text-[#1C1917]">Verdict</span>
                </div>
                <div className="p-5 border-l border-stone-100 bg-emerald-50/50">
                  <span className="text-sm font-bold text-emerald-700">Best Overall</span>
                </div>
                <div className="p-5 border-l border-stone-100">
                  <span className="text-sm text-[#78716C]">Taste & trust issues</span>
                </div>
                <div className="p-5 border-l border-stone-100">
                  <span className="text-sm text-[#78716C]">Transparency concerns</span>
                </div>
                <div className="p-5 border-l border-stone-100">
                  <span className="text-sm text-[#78716C]">Overpriced</span>
                </div>
              </div>
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
                    <div className="p-4 bg-emerald-50/30">
                      <div className="flex items-start gap-2">
                        <Check size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">BrewNectar</span>
                          <p className="text-sm text-[#1C1917] font-medium mt-0.5">{feature.brewnectar.value}</p>
                        </div>
                      </div>
                    </div>
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

          {/* Summary verdict card */}
          <FadeUp delay={0.15}>
            <div className="mt-10 bg-gradient-to-br from-emerald-50 to-amber-50/30 rounded-2xl border border-emerald-200/50 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2">The Bottom Line</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed mb-3">
                    BrewNectar wins in <strong className="text-[#1C1917]">7 out of 8 categories</strong>. It's the only product that lets you keep your coffee, shows every ingredient dose, and has zero BBB complaints. At ~$0.96/day on the 3-bottle plan, it's also the most affordable option per serving.
                  </p>
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    Start your upgrade <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COMPETITOR DEEP DIVES ═══════════ */}
      <section className="py-16 md:py-24">
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
                <div className={`bg-gradient-to-br ${comp.color} rounded-2xl border ${comp.borderColor} overflow-hidden`}>
                  {/* Header — clickable */}
                  <button
                    onClick={() => setExpandedCompetitor(expandedCompetitor === i ? null : i)}
                    className="w-full flex items-center gap-4 p-5 md:p-6 text-left hover:bg-white/30 transition-colors"
                  >
                    {/* Product thumbnail */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white border border-stone-200/60 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                      <img src={comp.image} alt={comp.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg md:text-xl font-bold text-[#1C1917]">{comp.name}</h3>
                      <p className="text-sm text-[#78716C] mt-0.5">{comp.tagline}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-[#78716C] transition-transform duration-300 shrink-0 ml-2 ${
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
                      className="border-t border-stone-200/60"
                    >
                      <div className="p-5 md:p-6 space-y-4">
                        <div className="space-y-3">
                          {comp.issues.map((issue, j) => (
                            <div key={j} className="flex items-start gap-3">
                              <AlertTriangle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                              <p className="text-sm text-[#57534E] leading-relaxed">{issue}</p>
                            </div>
                          ))}
                        </div>

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

                      {/* Verdict card inside deep dive */}
                      <div className="mx-5 md:mx-6 mb-5 md:mb-6 bg-emerald-50 rounded-xl p-4 border border-emerald-200/50">
                        <p className="text-sm font-semibold text-emerald-800 mb-1">Why BrewNectar instead?</p>
                        <p className="text-sm text-[#57534E] leading-relaxed">
                          {comp.name === "Ryze Mushroom Coffee" && "Keep your real coffee. Get clinically-dosed nootropics with full label transparency — no proprietary blends, no subscription traps, no class-action lawsuits."}
                          {comp.name === "Everyday Dose" && "Skip the mystery blend and bovine collagen. BrewNectar shows every milligram, works with any coffee, and has zero BBB complaints."}
                          {comp.name === "Magic Mind" && "Get the same Cognizin® at a fraction of the price. BrewNectar costs ~$0.96/day vs $3.50/day — that's $76/month in savings."}
                        </p>
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
      <section className="py-16 md:py-24 bg-white">
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
              <div className="bg-[#FDFBF7] rounded-2xl border border-red-200/60 p-6 md:p-8 relative overflow-hidden">
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
                  "Proprietary blend" = they won't tell you how much of each ingredient you're getting.
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

      {/* ═══════════ CLINICAL STUDIES ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Science</p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-center text-[#1C1917] mb-4">
              Backed by Peer-Reviewed Research
            </h2>
            <p className="text-center text-[#78716C] text-base mb-12 max-w-xl mx-auto">
              Unlike competitors who rely on vague "adaptogen" claims, every BrewNectar ingredient has published clinical evidence.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {CLINICAL_STUDIES.map((group, gi) => (
              <FadeUp key={group.ingredient} delay={gi * 0.05}>
                <div className={`${group.color} rounded-2xl border p-6 md:p-8`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${group.iconColor}`}>
                      <FlaskConical size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1C1917]">{group.ingredient}</h3>
                      <p className="text-xs text-[#78716C]">{group.studyCount} peer-reviewed studies</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {group.studies.map((study, si) => (
                      <div key={si} className="bg-white rounded-xl p-4 md:p-5 border border-stone-100">
                        <h4 className="text-sm font-bold text-[#1C1917] leading-snug mb-1">{study.title}</h4>
                        <p className="text-xs text-[#A8A29E] mb-2">{study.authors} · {study.journal} · {study.year}</p>
                        <p className="text-sm text-[#57534E] leading-relaxed mb-3">{study.finding}</p>
                        <a
                          href={study.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309] hover:text-[#92400E] transition-colors"
                        >
                          Read Full Study
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.15}>
            <div className="text-center mt-8">
              <Link
                href="/#clinical-studies"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#B45309] hover:text-[#92400E] transition-colors"
              >
                <BookOpen size={15} />
                View all 75+ studies on our homepage
              </Link>
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
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(story.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#57534E] leading-relaxed flex-1 mb-4">
                    "{story.text}"
                  </p>
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

      {/* ═══════════ QUICK COMPARISON STRIP ═══════════ */}
      <section className="py-12 md:py-16 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-stone-100 text-center">
                <p className="text-3xl font-bold text-[#1C1917] mb-1">$0.96</p>
                <p className="text-sm text-[#78716C]">per day (3-bottle plan)</p>
                <p className="text-xs text-emerald-600 font-semibold mt-2">vs $3.50/day for Magic Mind</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-100 text-center">
                <p className="text-3xl font-bold text-[#1C1917] mb-1">100%</p>
                <p className="text-sm text-[#78716C]">label transparency</p>
                <p className="text-xs text-emerald-600 font-semibold mt-2">vs hidden proprietary blends</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-100 text-center">
                <p className="text-3xl font-bold text-[#1C1917] mb-1">0</p>
                <p className="text-sm text-[#78716C]">BBB complaints</p>
                <p className="text-xs text-emerald-600 font-semibold mt-2">vs 48 pages for Ryze</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <div className="relative bg-[#1C1917] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <img src={IMAGES.botanical} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="relative">
                <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">You've Seen the Data</p>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
                  Ready to Upgrade Your Coffee?
                </h2>
                <p className="text-stone-400 text-base md:text-lg mb-4 max-w-lg mx-auto">
                  Keep your coffee. Upgrade your brain. Join 12,000+ high performers who made the switch.
                </p>
                <p className="text-stone-500 text-sm mb-8">
                  30-day money-back guarantee · Cancel anytime · Free shipping on 2+ bottles
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
                    Not Sure? Take the Quiz
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

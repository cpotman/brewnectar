/*
  BrewNectar Home — Warm Light Theme
  Design: Bright, airy, premium wellness aesthetic
  Palette: Warm cream base, amber/honey accents, sage green secondary, rich charcoal text
  Features: Sliding ticker, video social proof carousel, clean FAQ accordion
*/
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Star, Check, X as XIcon, Zap, Brain, Coffee, Clock, Sparkles, ExternalLink, FlaskConical, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

/* ─── Fade-up animation wrapper ─── */
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Image URLs ─── */
const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  warmGradient: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/warm-gradient-bg-LWJsvAnDJnqPdXt4YEzJjg.webp",
  botanical: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/botanical-stipple-YXHqjKQEjP2LspSUm3f2Gh.webp",
  lifestylePour: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  benefitTexture: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/benefit-texture-bg-7Q84t6rmotySQdZXZXCNVa.webp",
  howStir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  howLockIn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
};

/* ─── Clinical studies data ─── */
const CLINICAL_STUDIES = [
  {
    ingredient: "Lion\u2019s Mane",
    studyCount: "30+",
    tagline: "Peer-reviewed studies on neurogenesis & cognitive function",
    icon: Brain,
    color: "bg-amber-50 border-amber-200/60 text-[#B45309]",
    dotColor: "bg-[#D97706]",
    studies: [
      {
        title: "Acute and Chronic Effects of Lion\u2019s Mane on Cognitive Function",
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
      {
        title: "Neurotrophic and Neuroprotective Effects of Hericium erinaceus",
        authors: "Szućko-Kociuba et al.",
        journal: "Int J Mol Sci",
        year: 2023,
        finding: "Comprehensive review confirming Lion\u2019s Mane promotes nerve growth factor (NGF) production and neuronal differentiation.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10650066/",
      },
    ],
  },
  {
    ingredient: "Cognizin\u00AE",
    studyCount: "20+",
    tagline: "Clinical trials on memory, focus & attentional performance",
    icon: Zap,
    color: "bg-emerald-50 border-emerald-200/60 text-emerald-700",
    dotColor: "bg-emerald-500",
    studies: [
      {
        title: "Citicoline and Memory Function in Healthy Older Adults",
        authors: "Nakazaki et al.",
        journal: "The Journal of Nutrition",
        year: 2021,
        finding: "12 weeks of Cognizin\u00AE supplementation improved overall memory performance, especially episodic memory.",
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
      {
        title: "Citicoline Improves Human Vigilance and Visual Working Memory",
        authors: "Al-Kuraishy & Al-Gareeb",
        journal: "Basic and Clinical Neuroscience",
        year: 2020,
        finding: "Citicoline significantly improved psychomotor vigilance, arousal, and visual working memory vs. placebo.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7878037/",
      },
    ],
  },
  {
    ingredient: "L-Theanine",
    studyCount: "25+",
    tagline: "Clinical studies on calm focus, alpha waves & stress reduction",
    icon: Sparkles,
    color: "bg-sky-50 border-sky-200/60 text-sky-700",
    dotColor: "bg-sky-500",
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
        title: "Effects of l-Theanine on Cognitive Function in Middle-Aged and Older Subjects",
        authors: "Baba et al.",
        journal: "Journal of Medicinal Food",
        year: 2021,
        finding: "L-Theanine improved attention and working memory, enhancing executive function in middle-aged adults.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8080935/",
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
  {
    ingredient: "B Vitamins",
    studyCount: "100+",
    tagline: "Research on neural energy, neurotransmitter synthesis & brain health",
    icon: Coffee,
    color: "bg-rose-50 border-rose-200/60 text-rose-700",
    dotColor: "bg-rose-500",
    studies: [
      {
        title: "B Vitamins and the Brain: Mechanisms, Dose and Efficacy",
        authors: "Kennedy",
        journal: "Nutrients",
        year: 2016,
        finding: "Comprehensive review establishing B vitamins as essential cofactors in neurotransmitter synthesis and cellular energy production.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4772032/",
      },
      {
        title: "B Vitamins to Prevent Cognitive Decline in Older MCI Patients",
        authors: "Kwok et al.",
        journal: "Clinical Nutrition",
        year: 2020,
        finding: "B vitamin supplementation slowed cognitive decline and brain atrophy in patients with mild cognitive impairment.",
        url: "https://www.sciencedirect.com/science/article/pii/S0261561419331322",
      },
      {
        title: "B Vitamins in the Nervous System: Current Knowledge",
        authors: "Calder\u00F3n-Ospina & Nava-Mesa",
        journal: "Nutrients",
        year: 2019,
        finding: "B vitamins are critical for myelin formation, neurotransmitter synthesis, and overall nervous system function.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6930825/",
      },
    ],
  },
];

/* ─── Clinical Studies Component ─── */
function ClinicalStudies() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="clinical-studies" className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <FlaskConical size={16} className="text-[#D97706]" />
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">Backed by Science</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
            The Research Behind Every Drop.
          </h2>
          <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
            Every ingredient in BrewNectar is supported by peer-reviewed clinical research. Tap any ingredient to explore the studies.
          </p>
        </motion.div>

        {/* Ingredient study cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {CLINICAL_STUDIES.map((item, i) => {
            const isExpanded = expandedIdx === i;
            return (
              <motion.div
                key={item.ingredient}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                  <button
                  onClick={() => setExpandedIdx(isExpanded ? null : i)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                    isExpanded
                      ? `${item.color} shadow-warm ring-1 ring-current/10`
                      : "bg-white border-stone-100 hover:border-stone-200 hover:shadow-warm"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isExpanded ? "bg-white/60" : item.color.split(" ")[0] + " " + item.color.split(" ").slice(-1)[0]
                    }`}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-display font-bold text-base truncate ${
                        isExpanded ? "" : "text-[#1C1917]"
                      }`}>
                        {item.ingredient}
                      </h3>
                    </div>
                  </div>

                  {/* Study count — large number */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`font-display text-2xl md:text-3xl font-bold ${
                      isExpanded ? "" : "text-[#1C1917]"
                    }`}>
                      {item.studyCount}
                    </span>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      isExpanded ? "opacity-70" : "text-[#A8A29E]"
                    }`}>
                      Studies
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${
                    isExpanded ? "opacity-80" : "text-[#78716C]"
                  }`}>
                    {item.tagline}
                  </p>

                  {/* Expand indicator */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <BookOpen size={13} className={isExpanded ? "opacity-70" : "text-[#A8A29E]"} />
                    <span className={`text-xs font-medium ${
                      isExpanded ? "opacity-70" : "text-[#A8A29E]"
                    }`}>
                      {isExpanded ? "Tap to close" : "View studies"}
                    </span>
                    <ChevronDown size={13} className={`transition-transform duration-300 ${
                      isExpanded ? "rotate-180 opacity-70" : "text-[#A8A29E]"
                    }`} />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded study details */}
        <AnimatePresence mode="wait">
          {expandedIdx !== null && (
            <motion.div
              key={expandedIdx}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-2 h-2 rounded-full ${CLINICAL_STUDIES[expandedIdx].dotColor}`} />
                  <h3 className="font-display font-bold text-lg text-[#1C1917]">
                    Key Studies — {CLINICAL_STUDIES[expandedIdx].ingredient}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {CLINICAL_STUDIES[expandedIdx].studies.map((study, j) => (
                    <a
                      key={j}
                      href={study.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-xl border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                          <span className={`w-1.5 h-1.5 rounded-full ${CLINICAL_STUDIES[expandedIdx].dotColor}`} />
                          {study.journal} &middot; {study.year}
                        </span>
                        <ExternalLink size={14} className="text-[#A8A29E] group-hover:text-[#D97706] transition-colors flex-shrink-0 mt-0.5" />
                      </div>

                      <h4 className="font-display font-semibold text-sm text-[#1C1917] mb-1.5 leading-snug group-hover:text-[#B45309] transition-colors">
                        {study.title}
                      </h4>
                      <p className="text-xs text-[#A8A29E] mb-3">{study.authors}</p>

                      <p className="text-xs text-[#78716C] leading-relaxed">
                        <span className="font-semibold text-[#44403C]">Finding:</span> {study.finding}
                      </p>
                    </a>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-2">
                  <FlaskConical size={13} className="text-[#A8A29E]" />
                  <p className="text-xs text-[#A8A29E]">
                    All studies are published in peer-reviewed journals. Click any study to read the full paper.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Ticker messages ─── */
const TICKER_MESSAGES = [
  "Free shipping on orders over $50",
  "30-day money-back guarantee",
  "Zero sugar \u00B7 30 servings per bottle",
  "Trusted by 12,000+ high performers",
  "Third-party tested for purity",
  "Subscribe & save 15%",
];

/* ─── Video testimonials data ─── */
const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    name: "Alex K.",
    title: "Software Engineer",
    quote: "Replaced my second cup of coffee with BrewNectar. I'm shipping code faster and my afternoons are actually productive now.",
    rating: 5,
    thumbnail: IMAGES.howLockIn,
  },
  {
    id: 2,
    name: "Sarah M.",
    title: "Product Designer",
    quote: "The vanilla flavor is incredible. But what sold me is the focus. I designed an entire app flow in one sitting.",
    rating: 5,
    thumbnail: IMAGES.lifestylePour,
  },
  {
    id: 3,
    name: "Marcus T.",
    title: "Founder & CEO",
    quote: "I've tried every nootropic on the market. This is the first one I actually look forward to taking.",
    rating: 5,
    thumbnail: IMAGES.howStir,
  },
  {
    id: 4,
    name: "Priya R.",
    title: "Medical Student",
    quote: "Study sessions went from 45 minutes to 3 hours. My recall during exams improved noticeably.",
    rating: 5,
    thumbnail: IMAGES.howLockIn,
  },
  {
    id: 5,
    name: "Jordan L.",
    title: "Creative Director",
    quote: "BrewNectar is part of my morning ritual now. The calm focus is unlike anything I've experienced with regular coffee.",
    rating: 5,
    thumbnail: IMAGES.hero,
  },
];

/* ─── FAQ data ─── */
const FAQ_DATA = [
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
    a: "Most users report feeling focused within 20\u201330 minutes of their first use. The nootropic benefits of Lion's Mane and Cognizin\u00AE compound over time — many users report significant improvements in recall and clarity after 2\u20134 weeks of daily use.",
  },
  {
    q: "Is it third-party tested?",
    a: "Yes. Every batch of BrewNectar is third-party tested for purity, potency, and heavy metals. We use Cognizin\u00AE, a patented and clinically studied form of citicoline, to ensure consistent quality.",
  },
];

/* ─── Ingredient data ─── */
const INGREDIENTS = [
  {
    name: "Lion's Mane",
    tag: "Supports Neurogenesis",
    science: "Clinically studied to promote nerve growth factor (NGF) production.",
    emotion: "Build new neural pathways. Literally grow a sharper brain.",
    icon: Brain,
    color: "bg-amber-50 text-[#B45309]",
  },
  {
    name: "Cognizin\u00AE (Citicoline)",
    tag: "Faster Recall & Mental Clarity",
    science: "Patented form of citicoline shown to enhance focus and attention in clinical trials.",
    emotion: "Access thoughts faster. Retrieve information on demand.",
    icon: Zap,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "L-Theanine",
    tag: "Calm, Jitter-Free Focus",
    science: "Amino acid found in green tea that promotes alpha brain wave activity.",
    emotion: "All the focus. None of the anxiety. Smooth and locked in.",
    icon: Sparkles,
    color: "bg-sky-50 text-sky-700",
  },
  {
    name: "B Vitamins",
    tag: "Clean Mental Energy",
    science: "Essential cofactors in neurotransmitter synthesis and cellular energy production.",
    emotion: "Sustained energy that doesn't spike or crash. Just steady output.",
    icon: Coffee,
    color: "bg-rose-50 text-rose-700",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* ═══════════ SLIDING TICKER ═══════════ */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#1C1917] text-white overflow-hidden h-8 flex items-center" style={{ marginTop: 0 }}>
        <div className="ticker-animate flex whitespace-nowrap">
          {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
            <span key={i} className="inline-flex items-center px-8 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mr-3 flex-shrink-0" />
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/* Push navbar down below ticker */}
      <style>{`nav.fixed { top: 32px !important; }`}</style>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        {/* Full-bleed warm gradient background */}
        <div className="absolute inset-0">
          <img src={IMAGES.warmGradient} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/60 via-[#FDFBF7]/40 to-[#FDFBF7]" />
        </div>
        {/* Botanical decoration */}
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -right-10 top-10 w-48 md:w-72 lg:w-96 opacity-[0.07] pointer-events-none select-none"
        />
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -left-16 bottom-0 w-40 md:w-56 opacity-[0.05] pointer-events-none select-none rotate-180 hidden md:block"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200/60 mb-6">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#D97706] text-[#D97706]" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#92400E]">Trusted by 12,000+ high performers</span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#1C1917] mb-5 md:mb-6">
                  Turn Your Coffee Into a{" "}
                  <span className="text-gradient-warm">Cognitive Upgrade.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-base md:text-lg lg:text-xl text-[#57534E] leading-relaxed mb-6 md:mb-8 max-w-lg">
                  Vanilla bean nootropic syrup designed for calm focus, faster recall, and deep work.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
                  <Link
                    href="/product"
                    className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
                  >
                    Upgrade My Coffee
                  </Link>
                  <Link
                    href="/product"
                    className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#92400E] bg-amber-50 border border-amber-200 rounded-full hover:bg-amber-100 transition-all"
                  >
                    Start Subscription & Save 15%
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "Zero Sugar", icon: "✦" },
                    { label: "Nootropic Stack", icon: "◆" },
                    { label: "Clean Energy", icon: "●" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2">
                      <span className="text-[#D97706] text-sm">{badge.icon}</span>
                      <span className="text-sm font-medium text-[#57534E]">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: Hero image */}
            <FadeUp delay={0.2} className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 to-orange-100/20 rounded-3xl -rotate-3 scale-105" />
                <img
                  src={IMAGES.hero}
                  alt="BrewNectar nootropic coffee syrup"
                  className="relative w-full rounded-3xl shadow-warm-lg"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════ PROBLEM SECTION ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Problem</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-4 max-w-3xl mx-auto">
              Coffee Wakes You Up. It Doesn't Make You Smarter.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              You rely on caffeine. But caffeine alone is a blunt instrument. Here's what it actually does to your day.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { icon: "⚡", title: "Jitters", desc: "Your hands shake. Your mind races. That's not focus." },
              { icon: "🌫️", title: "Brain Fog", desc: "Two cups in and you still can't think straight." },
              { icon: "📉", title: "Afternoon Crash", desc: "The 2pm wall hits. Productivity drops to zero." },
              { icon: "🔀", title: "Scattered Thinking", desc: "You start ten things. You finish none." },
              { icon: "⏳", title: "Procrastination", desc: "Another day of planning to start tomorrow." },
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 md:p-6 h-full hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  <span className="text-xl md:text-2xl mb-2 md:mb-3 block">{item.icon}</span>
                  <h3 className="font-display font-semibold text-sm md:text-base text-[#1C1917] mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-[#78716C] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ INGREDIENTS ═══════════ */}
      <section id="ingredients" className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden">
        {/* Botanical decoration */}
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -left-16 bottom-0 w-56 opacity-[0.06] pointer-events-none select-none rotate-180"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Solution</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-4">
              Designed for the Mind.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              Four science-backed ingredients. One delicious syrup. Engineered for cognitive performance.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {INGREDIENTS.map((ing, i) => (
              <FadeUp key={ing.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-stone-100 p-5 md:p-8 hover:shadow-warm hover:border-amber-100 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`w-12 h-12 rounded-xl ${ing.color} flex items-center justify-center flex-shrink-0`}>
                      <ing.icon size={22} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg text-[#1C1917] mb-1">{ing.name}</h3>
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full mb-3">
                        {ing.tag}
                      </span>
                      <p className="text-sm text-[#78716C] leading-relaxed mb-2">{ing.science}</p>
                      <p className="text-sm font-medium text-[#44403C] italic">{ing.emotion}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-4">
              Three Steps. One Ritual.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              No pills. No powders. No blender required. Just better coffee.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                step: "01",
                title: "Pour",
                desc: "Add one tablespoon of BrewNectar to your morning coffee.",
                image: IMAGES.lifestylePour,
              },
              {
                step: "02",
                title: "Stir",
                desc: "Mix it in. Vanilla bean flavor blends perfectly with any roast.",
                image: IMAGES.howStir,
              },
              {
                step: "03",
                title: "Lock In",
                desc: "Feel the calm focus set in within 20 minutes. Deep work mode activated.",
                image: IMAGES.howLockIn,
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.12}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center font-display font-bold text-sm text-[#B45309]">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#1C1917] mb-2">{item.title}</h3>
                  <p className="text-[#78716C] leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BENEFIT BLOCK ═══════════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.benefitTexture} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] mb-4 leading-tight">
              Calm Focus.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-[#78716C] mb-4 leading-tight">
              Faster Recall.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-warm mb-8 leading-tight">
              Deep Work Without the Crash.
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/product"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
            >
              Try BrewNectar Today
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ CLINICAL STUDIES ═══════════ */}
      <ClinicalStudies />

      {/* ═══════════ SOCIAL PROOF — VIDEO TESTIMONIALS ═══════════ */}
      <section id="social-proof" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">Social Proof</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917]">
                  Trusted by 12,000+ High Performers
                </h2>
                <p className="text-[#78716C] text-lg mt-2">4.9/5 from 2,400+ reviews</p>
              </div>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollTestimonials("left")}
                  className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:border-stone-300 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollTestimonials("right")}
                  className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#78716C] hover:text-[#1C1917] hover:border-stone-300 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* Horizontal scroll carousel */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VIDEO_TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.id} delay={i * 0.08} className="flex-shrink-0 w-[300px] snap-start">
                <div className="bg-stone-50 border border-stone-100 rounded-2xl overflow-hidden hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  {/* Video thumbnail */}
                  <div className="relative aspect-[9/12] overflow-hidden group cursor-pointer">
                    <img
                      src={t.thumbnail}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={22} className="text-[#1C1917] ml-1" fill="#1C1917" />
                      </div>
                    </div>
                    {/* TikTok-style handle */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-white text-xs font-semibold">@{t.name.toLowerCase().replace(/\s/g, "")}</p>
                      </div>
                    </div>
                  </div>
                  {/* Card content */}
                  <div className="p-5">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                      ))}
                    </div>
                    <p className="text-sm text-[#44403C] leading-relaxed mb-3 line-clamp-3">"{t.quote}"</p>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917]">{t.name}</p>
                      <p className="text-xs text-[#A8A29E]">{t.title}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Mobile scroll arrows */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            <button
              onClick={() => scrollTestimonials("left")}
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#78716C]"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollTestimonials("right")}
              className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-[#78716C]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ COMPARISON TABLE ═══════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Compare</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-12">
              Not All Upgrades Are Equal.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full text-xs md:text-sm min-w-[480px]">
                <thead>
                  <tr className="border-b-2 border-stone-200">
                    <th className="text-left py-4 pr-4 font-display font-semibold text-[#78716C]">Feature</th>
                    <th className="py-4 px-3 font-display font-bold text-[#1C1917] bg-amber-50/50 rounded-t-xl">BrewNectar</th>
                    <th className="py-4 px-3 font-display font-semibold text-[#A8A29E]">Regular Coffee</th>
                    <th className="py-4 px-3 font-display font-semibold text-[#A8A29E] hidden sm:table-cell">Sugary Syrups</th>
                    <th className="py-4 px-3 font-display font-semibold text-[#A8A29E] hidden sm:table-cell">Capsule Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Calm Focus", bn: true, rc: false, ss: false, cn: true },
                    { feature: "Zero Sugar", bn: true, rc: true, ss: false, cn: true },
                    { feature: "No Crash", bn: true, rc: false, ss: false, cn: true },
                    { feature: "Tastes Great", bn: true, rc: true, ss: true, cn: false },
                    { feature: "Stackable with Coffee", bn: true, rc: false, ss: true, cn: false },
                    { feature: "No Pills Required", bn: true, rc: true, ss: true, cn: false },
                    { feature: "Supports Neurogenesis", bn: true, rc: false, ss: false, cn: true },
                    { feature: "Daily Ritual Friendly", bn: true, rc: true, ss: false, cn: false },
                  ].map((row, i) => (
                    <tr key={row.feature} className="border-b border-stone-100">
                      <td className="py-3.5 pr-4 font-medium text-[#44403C]">{row.feature}</td>
                      <td className="py-3.5 px-3 text-center bg-amber-50/30">
                        {row.bn ? <Check size={18} className="mx-auto text-[#16A34A]" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.rc ? <Check size={18} className="mx-auto text-[#16A34A]" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                        {row.ss ? <Check size={18} className="mx-auto text-[#16A34A]" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                      <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                        {row.cn ? <Check size={18} className="mx-auto text-[#16A34A]" /> : <XIcon size={16} className="mx-auto text-stone-300" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SUBSCRIPTION PUSH ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeUp>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl -rotate-2 scale-105" />
                <img
                  src={IMAGES.lifestylePour}
                  alt="BrewNectar daily ritual"
                  className="relative w-full rounded-3xl shadow-warm"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">Subscribe & Save</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-4">
                  Your Daily Brain Ritual.
                </h2>
                <p className="text-[#78716C] text-lg leading-relaxed mb-8">
                  Make cognitive performance a habit, not a one-off. Subscribe and never run out of your edge.
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-3xl md:text-4xl font-bold text-[#1C1917]">$34</span>
                  <span className="text-xl text-[#A8A29E] line-through">$40</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">Save 15%</span>
                </div>
                <p className="text-sm text-[#78716C] mb-6">per bottle / delivered monthly</p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {[
                    "Free shipping on every order",
                    "Cancel anytime — no commitments",
                    "30-day money-back guarantee",
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-emerald-600" />
                      </div>
                      <span className="text-sm text-[#44403C]">{b}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/product"
                  className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
                >
                  Start My Subscription
                </Link>
                <p className="text-xs text-[#A8A29E] mt-3">Zero sugar. 30 servings. Ships in 24 hours.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section id="faq" className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Got Questions About BrewNectar?
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-12">
              Get quick answers to your most common questions.
            </p>
          </FadeUp>

          <div className="space-y-0">
            {FAQ_DATA.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="border-b border-stone-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="font-display font-semibold text-[#1C1917] text-base pr-4 group-hover:text-[#B45309] transition-colors">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? "bg-[#1C1917] border-[#1C1917] rotate-180" : "group-hover:border-stone-300"}`}>
                      <ChevronDown size={16} className={openFaq === i ? "text-white" : "text-[#78716C]"} />
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[#78716C] leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

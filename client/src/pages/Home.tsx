/*
  BrewNectar Home — Warm Light Theme
  Design: Bright, airy, premium wellness aesthetic
  Palette: Warm cream base, amber/honey accents, sage green secondary, rich charcoal text
  Features: Sliding ticker, video social proof carousel, clean FAQ accordion
*/
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, Star, Check, X as XIcon, Zap, Brain, Coffee, Clock, Sparkles, ExternalLink, FlaskConical, BookOpen, Volume2, VolumeX, Pause, Gift, Lock, GraduationCap, Trophy, ShieldCheck, Truck, RotateCcw, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnergyClaritySlider from "@/components/EnergyClaritySlider";
import VideoCard from "@/components/VideoCard";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
  ugcVideo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ugcvid-web_4e0ef815.mp4",
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
  "30-day keep-the-bottle guarantee",
  "Zero sugar \u00B7 30 servings per bottle",
  "Trusted by 12,000+ high performers",
  "Third-party tested for purity",
  "Subscribe & save up to 45%",
  "\u2728 Just Restocked \u2014 Limited Supply",
];

/* ─── Video testimonials data ─── */
const VIDEO_TESTIMONIALS = [
  {
    id: 0,
    name: "Real Customer",
    title: "UGC Review",
    quote: "Watch this real customer review to see how BrewNectar fits into a daily coffee ritual.",
    rating: 5,
    thumbnail: IMAGES.hero,
    videoSrc: IMAGES.ugcVideo,
  },
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
    q: "Do I need to switch to a special coffee?",
    a: "Not at all! That's what makes BrewNectar different from nootropic coffees. You keep drinking whatever coffee you already love — drip, cold brew, espresso, latte, even decaf. Just add a pump of BrewNectar and you're upgraded. No new brand, no new routine.",
  },
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
    dosage: "1.2g per serving",
    tag: "Supports Neurogenesis",
    science: "Clinically studied to promote nerve growth factor (NGF) production.",
    emotion: "Build new neural pathways. Literally grow a sharper brain.",
    icon: Brain,
    color: "bg-amber-50 text-[#B45309]",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-lions-mane_c905f004.png",
  },
  {
    name: "Cognizin\u00AE (Citicoline)",
    dosage: "250mg per serving",
    tag: "Faster Recall & Mental Clarity",
    science: "Patented form of citicoline shown to enhance focus and attention in clinical trials.",
    emotion: "Access thoughts faster. Retrieve information on demand.",
    icon: Zap,
    color: "bg-emerald-50 text-emerald-700",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-cognizin_3fb446ba.png",
  },
  {
    name: "L-Theanine",
    dosage: "75mg per serving",
    tag: "Calm, Jitter-Free Focus",
    science: "Amino acid found in green tea that promotes alpha brain wave activity.",
    emotion: "All the focus. None of the anxiety. Smooth and locked in.",
    icon: Sparkles,
    color: "bg-sky-50 text-sky-700",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-l-theanine_dc3b4af3.png",
  },
  {
    name: "B Vitamins (B6 + B12)",
    dosage: "250% DV each",
    tag: "Clean Mental Energy",
    science: "Essential cofactors in neurotransmitter synthesis and cellular energy production.",
    emotion: "Sustained energy that doesn't spike or crash. Just steady output.",
    icon: Coffee,
    color: "bg-rose-50 text-rose-700",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-b-vitamins_1072f364.png",
  },
];

/* ─── Plan types & data (mirrored from Product page) ─── */
type PlanType = "subscribe-3" | "subscribe-2" | "subscribe-1" | "one-time";

const PLANS: Record<PlanType, {
  label: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  perMonth: string;
  perDay: string;
  discount: string;
  badge: string;
  badgeColor: string;
  perks: { text: string; positive: boolean }[];
  isSubscription: boolean;
}> = {
  "subscribe-3": {
    label: "3 Bottles",
    subtitle: "Billed $81 every 12 weeks",
    price: 81,
    originalPrice: 147,
    perMonth: "27",
    perDay: "0.96",
    discount: "45% OFF",
    badge: "Best Value",
    badgeColor: "bg-emerald-600",
    perks: [
      { text: "\ud83c\udf93 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
      { text: "\ud83d\udcb0 Maximum savings \u2014 lowest price per serving", positive: true },
      { text: "\ud83d\udd12 Lock in savings \u2014 price guaranteed even if we raise it", positive: true },
      { text: "🛡️ Try it 30 days — if you don't feel sharper, keep the bottle. We'll refund every penny.", positive: true },
      { text: "🏆 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
      { text: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67 Share with family and friends", positive: true },
      { text: "\ud83d\ude9a Fast & FREE Shipping", positive: true },
      { text: "\ud83d\udd04 Cancel or pause anytime", positive: true },
      { text: "\u2728 Priority access to new flavors", positive: true },
    ],
    isSubscription: true,
  },
  "subscribe-2": {
    label: "2 Bottles",
    subtitle: "Billed $64 every 8 weeks",
    price: 64,
    originalPrice: 98,
    perMonth: "32",
    perDay: "1.14",
    discount: "35% OFF",
    badge: "Most Popular",
    badgeColor: "bg-[#B45309]",
    perks: [
      { text: "\ud83c\udf93 Exclusive Focus & Clarity Masterclass ($25 value)", positive: true },
      { text: "\ud83d\udcb0 Great value \u2014 $32/bottle, share with a partner", positive: true },
      { text: "\ud83d\udd12 Lock in savings \u2014 price guaranteed even if we raise it", positive: true },
      { text: "\ud83d\udee1\ufe0f Try it 30 days \u2014 keep the bottle if you're not sharper. Full refund.", positive: true },
      { text: "\ud83c\udfc6 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
      { text: "\ud83d\ude9a Fast & FREE Shipping", positive: true },
      { text: "\ud83d\udd04 Cancel or pause anytime", positive: true },
    ],
    isSubscription: true,
  },
  "subscribe-1": {
    label: "1 Bottle",
    subtitle: "Billed $36 every 4 weeks",
    price: 36,
    originalPrice: 49,
    perMonth: "36",
    perDay: "1.29",
    discount: "27% OFF",
    badge: "",
    badgeColor: "",
    perks: [
      { text: "Free Shipping", positive: true },
      { text: "Cancel anytime", positive: true },
      { text: "Lock in subscriber pricing", positive: true },
      { text: "No giveaway entries", positive: false },
    ],
    isSubscription: true,
  },
  "one-time": {
    label: "1 Bottle",
    subtitle: "One-time purchase",
    price: 49,
    originalPrice: 49,
    perMonth: "49",
    perDay: "1.75",
    discount: "",
    badge: "",
    badgeColor: "",
    perks: [
      { text: "No free shipping ($5.99 flat rate)", positive: false },
      { text: "No discount applied", positive: false },
      { text: "2nd order at full price", positive: false },
    ],
    isSubscription: false,
  },
};

const PLAN_ORDER: PlanType[] = ["subscribe-3", "subscribe-2", "subscribe-1"];

/* ─── Extended text reviews ─── */
const EXTENDED_REVIEWS = [
  {
    name: "Dr. Rachel W.",
    title: "Neurologist",
    rating: 5,
    date: "March 2026",
    heading: "Finally, a nootropic I can recommend to patients",
    text: "As a neurologist, I\u2019m extremely cautious about supplements. Most nootropic products use proprietary blends with undisclosed dosages. BrewNectar is different \u2014 every ingredient is clinically dosed and transparently labeled. The Cognizin\u00AE (citicoline) at the dosage they use has solid evidence for memory and attention. I\u2019ve been using it myself for 3 months and recommending it to patients who want cognitive support alongside their existing coffee habit. The fact that it\u2019s a syrup rather than another pill makes compliance much easier.",
  },
  {
    name: "James P.",
    title: "Day Trader",
    rating: 5,
    date: "February 2026",
    heading: "My edge in the markets",
    text: "I trade futures from 6:30 AM to 4 PM. That\u2019s nearly 10 hours of intense decision-making where a single lapse in focus can cost thousands. I used to rely on 4-5 cups of coffee, but by noon I\u2019d be jittery and making impulsive trades. Switched to 2 cups of coffee with BrewNectar and the difference is night and day. My screen time analytics show I\u2019m making fewer but better trades. The L-Theanine keeps me calm during volatile moves. I\u2019m on the 3-bottle plan because running out is not an option.",
  },
  {
    name: "Michelle K.",
    title: "Working Mom of 3",
    rating: 5,
    date: "March 2026",
    heading: "From zombie mom to present mom",
    text: "I have a 2-year-old, a 5-year-old, and a 7-year-old. By 2 PM I used to be running on fumes \u2014 snapping at the kids, forgetting school pickups, staring at my laptop unable to form a sentence. My husband found BrewNectar and honestly I was skeptical. But after two weeks of adding it to my morning latte, the afternoon crash just... stopped. I\u2019m more patient, more present, and I\u2019m actually getting work done during nap time instead of doom-scrolling. This is the only \u2018supplement\u2019 that\u2019s ever actually worked for me.",
  },
  {
    name: "David S.",
    title: "PhD Candidate, Neuroscience",
    rating: 5,
    date: "January 2026",
    heading: "The science checks out \u2014 and so does the experience",
    text: "I study neuroplasticity for a living, so I know exactly what Lion\u2019s Mane and citicoline do at the cellular level. Most supplement companies underdose these ingredients or use inferior forms. BrewNectar uses Cognizin\u00AE (the patented citicoline) and specifies the beta-glucan content of their Lion\u2019s Mane \u2014 that\u2019s how you know it\u2019s the real deal. I\u2019ve been using it daily for 4 months while writing my dissertation. My writing sessions went from fragmented 30-minute bursts to solid 2-3 hour deep work blocks. My advisor noticed the difference before I told her what I was taking.",
  },
  {
    name: "Tanya R.",
    title: "Yoga Instructor & Wellness Coach",
    rating: 5,
    date: "February 2026",
    heading: "Clean ingredients, real results",
    text: "I\u2019m very particular about what goes into my body. No artificial sweeteners, no fillers, no proprietary blends. BrewNectar passed every check. Zero sugar, clean label, and I can actually pronounce every ingredient. I add it to my matcha on days I don\u2019t drink coffee and it works just as well. The vanilla flavor is subtle and natural \u2014 not that fake sweetness you get from most supplements. My clients have started asking what changed because my class cues are sharper and I\u2019m remembering everyone\u2019s modifications without checking my notes.",
  },
  {
    name: "Robert M.",
    title: "Retired Engineer, Age 68",
    rating: 5,
    date: "March 2026",
    heading: "Keeping my mind sharp in retirement",
    text: "At 68, I was starting to notice the little things \u2014 forgetting where I put my keys, losing my train of thought mid-sentence, struggling with crossword puzzles I used to breeze through. My daughter bought me BrewNectar for Christmas. I\u2019ve been adding it to my morning coffee for 3 months now. The crosswords are easier again. I\u2019m reading two books a week instead of one. And last week I beat my grandson at chess for the first time in a year. The Lion\u2019s Mane research on neurogenesis in older adults is what convinced me to stick with it.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("subscribe-3");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileCta(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pdpImages = [
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
    IMAGES.hero,
    IMAGES.lifestylePour,
    IMAGES.howStir,
  ];

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
        {/* Full-bleed warm gradient background — clearly visible across entire section */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 140% 100% at 50% 30%, rgba(251,191,114,0.38) 0%, rgba(245,158,66,0.22) 25%, rgba(255,237,213,0.35) 50%, rgba(253,251,247,0.8) 80%, #FDFBF7 100%), radial-gradient(ellipse 90% 70% at 15% 55%, rgba(217,119,6,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 85% 25%, rgba(251,191,114,0.18) 0%, transparent 50%), #FDFBF7"
        }} />
        {/* Warm gradient image overlay for texture */}
        <div className="absolute inset-0">
          <img src={IMAGES.warmGradient} alt="" className="w-full h-full object-cover opacity-40 mix-blend-multiply" />
        </div>
        {/* Botanical decoration */}
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -right-10 top-10 w-48 md:w-72 lg:w-96 opacity-[0.12] pointer-events-none select-none"
        />
        <img
          src={IMAGES.botanical}
          alt=""
          className="absolute -left-16 bottom-0 w-40 md:w-56 opacity-[0.08] pointer-events-none select-none rotate-180 hidden md:block"
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
                  Add a pump of vanilla bean nootropic syrup to <em>your</em> coffee for calm focus, faster recall, and deep work. No new coffee required.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
                  <Link
                    href="/product"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg group"
                  >
                    Upgrade My Coffee
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "Works with Any Coffee", icon: "☕" },
                    { label: "Zero Sugar", icon: "✦" },
                    { label: "Nootropic Stack", icon: "◆" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2">
                      <span className="text-[#D97706] text-sm">{badge.icon}</span>
                      <span className="text-sm font-medium text-[#57534E]">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>

              {/* Mini social proof strip */}
              <FadeUp delay={0.5}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-[#D97706] text-[#D97706]" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    ))}
                    <span className="text-sm font-bold text-[#1C1917] ml-1">4.9/5</span>
                    <span className="text-sm text-[#78716C]">from 2,400+ reviews</span>
                  </div>
                  <span className="hidden sm:inline text-stone-300">·</span>
                  <p className="text-sm text-[#57534E] italic">"Replaced my afternoon coffee crash" — Sarah M.</p>
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
              Four science-backed ingredients in one delicious syrup. Just add it to whatever coffee you already drink.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {INGREDIENTS.map((ing, i) => (
              <FadeUp key={ing.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-warm hover:border-amber-100 transition-all duration-300 h-full">
                  {/* Ingredient image */}
                  {(ing as any).image && (
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <img src={(ing as any).image} alt={ing.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${ing.color} flex items-center justify-center flex-shrink-0`}>
                            <ing.icon size={16} />
                          </div>
                          <h3 className="font-display font-bold text-lg text-white drop-shadow-md">{ing.name}</h3>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full">
                        {ing.tag}
                      </span>
                      {(ing as any).dosage && (
                        <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          {(ing as any).dosage}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#78716C] leading-relaxed mb-2">{ing.science}</p>
                    <p className="text-sm font-medium text-[#44403C] italic">{ing.emotion}</p>
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
                desc: "Add one pump of BrewNectar to whatever coffee you're already drinking. Latte, cold brew, drip — it all works.",
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

      {/* ═══════════ ENERGY CLARITY SLIDER (hidden — uncomment to restore) ═══════════ */}
      {/* <EnergyClaritySlider /> */}

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

      {/* ═══════════ WHAT TO EXPECT — TIMELINE ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Your Journey</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              What to Expect with BrewNectar
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Best results come with consistency. Here's what happens when you make BrewNectar part of your daily ritual.
            </p>
          </FadeUp>

          {/* Visual graph — dotted line with milestones */}
          <div className="relative mb-16">
            {/* Dotted timeline connector */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-[#D97706]/30" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {[
                {
                  period: "Week 1",
                  title: "Immediate Clarity",
                  desc: "L-Theanine and Cognizin kick in within 20 minutes. You'll notice calmer focus, reduced jitters, and smoother energy from your very first cup.",
                  ingredients: ["L-Theanine", "Cognizin"],
                  color: "bg-amber-50 border-amber-200",
                  iconColor: "text-[#D97706]",
                  dotColor: "bg-[#D97706]",
                  level: "40%",
                },
                {
                  period: "1 Month",
                  title: "Sharper Recall",
                  desc: "Cognizin builds up in your system, improving working memory and mental processing speed. Tasks that felt hard start feeling effortless.",
                  ingredients: ["Cognizin", "B Vitamins"],
                  color: "bg-emerald-50 border-emerald-200",
                  iconColor: "text-emerald-600",
                  dotColor: "bg-emerald-600",
                  level: "60%",
                },
                {
                  period: "2 Months",
                  title: "Compounding Focus",
                  desc: "Lion's Mane begins stimulating nerve growth factor (NGF). Neural pathways strengthen. Deep work sessions get longer and more productive.",
                  ingredients: ["Lion's Mane", "Cognizin"],
                  color: "bg-sky-50 border-sky-200",
                  iconColor: "text-sky-600",
                  dotColor: "bg-sky-600",
                  level: "80%",
                },
                {
                  period: "3 Months",
                  title: "Peak Performance",
                  desc: "Full neurogenesis benefits from Lion's Mane. Your brain is literally building new connections. This is where the magic compounds.",
                  ingredients: ["Lion's Mane", "Full Stack"],
                  color: "bg-violet-50 border-violet-200",
                  iconColor: "text-violet-600",
                  dotColor: "bg-violet-600",
                  level: "95%",
                },
              ].map((milestone, i) => (
                <FadeUp key={milestone.period} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full ${milestone.color} border-2 flex items-center justify-center mb-4`}>
                      <span className={`font-display font-bold text-sm ${milestone.iconColor}`}>{milestone.level}</span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-2">{milestone.period}</span>

                    {/* Card */}
                    <div className={`${milestone.color} border rounded-2xl p-5 w-full`}>
                      <h3 className="font-display font-bold text-base text-[#1C1917] mb-2">{milestone.title}</h3>
                      <p className="text-xs text-[#57534E] leading-relaxed mb-3">{milestone.desc}</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {milestone.ingredients.map((ing) => (
                          <span key={ing} className="px-2.5 py-1 rounded-full bg-white/80 text-[10px] font-semibold text-[#44403C] border border-stone-100">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Visual energy graph */}
          <FadeUp delay={0.3}>
            <div className="bg-[#FDFBF7] rounded-2xl border border-stone-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1C1917]">Cognitive Performance Over Time</h3>
                  <p className="text-xs text-[#78716C] mt-1">Based on clinical research of individual ingredients</p>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-stone-300" style={{ borderTop: '2px dotted #A8A29E' }} />
                    <span className="text-xs text-[#A8A29E] font-medium">Coffee Only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-[#D97706]" style={{ borderTop: '2px dotted #D97706' }} />
                    <span className="text-xs text-[#D97706] font-medium">With BrewNectar</span>
                  </div>
                </div>
              </div>

              {/* SVG Graph */}
              <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
                <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  <line x1="50" y1="30" x2="50" y2="170" stroke="#E7E5E4" strokeWidth="1" />
                  <line x1="50" y1="170" x2="570" y2="170" stroke="#E7E5E4" strokeWidth="1" />
                  {/* Y-axis labels */}
                  <text x="40" y="35" textAnchor="end" className="fill-[#A8A29E]" fontSize="9" fontFamily="system-ui">High</text>
                  <text x="40" y="105" textAnchor="end" className="fill-[#A8A29E]" fontSize="9" fontFamily="system-ui">Med</text>
                  <text x="40" y="170" textAnchor="end" className="fill-[#A8A29E]" fontSize="9" fontFamily="system-ui">Low</text>
                  {/* X-axis labels */}
                  <text x="115" y="190" textAnchor="middle" className="fill-[#78716C]" fontSize="9" fontWeight="600" fontFamily="system-ui">Week 1</text>
                  <text x="245" y="190" textAnchor="middle" className="fill-[#78716C]" fontSize="9" fontWeight="600" fontFamily="system-ui">Month 1</text>
                  <text x="375" y="190" textAnchor="middle" className="fill-[#78716C]" fontSize="9" fontWeight="600" fontFamily="system-ui">Month 2</text>
                  <text x="505" y="190" textAnchor="middle" className="fill-[#78716C]" fontSize="9" fontWeight="600" fontFamily="system-ui">Month 3</text>

                  {/* Coffee Only line — peaks early then crashes */}
                  <path
                    d="M 70 120 Q 115 70, 160 95 Q 200 110, 245 130 Q 310 145, 375 140 Q 440 138, 505 142 L 550 145"
                    fill="none"
                    stroke="#A8A29E"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />
                  {/* BrewNectar line — steady climb */}
                  <path
                    d="M 70 120 Q 115 80, 160 72 Q 200 65, 245 55 Q 310 45, 375 38 Q 440 33, 505 30 L 550 28"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                  />

                  {/* Milestone dots on BrewNectar line */}
                  <circle cx="115" cy="80" r="5" fill="#D97706" />
                  <circle cx="245" cy="55" r="5" fill="#D97706" />
                  <circle cx="375" cy="38" r="5" fill="#D97706" />
                  <circle cx="505" cy="30" r="5" fill="#D97706" />

                  {/* Milestone labels */}
                  <text x="115" y="68" textAnchor="middle" className="fill-[#B45309]" fontSize="7" fontWeight="600" fontFamily="system-ui">L-Theanine</text>
                  <text x="245" y="43" textAnchor="middle" className="fill-[#B45309]" fontSize="7" fontWeight="600" fontFamily="system-ui">Cognizin</text>
                  <text x="375" y="26" textAnchor="middle" className="fill-[#B45309]" fontSize="7" fontWeight="600" fontFamily="system-ui">Lion's Mane</text>
                  <text x="505" y="18" textAnchor="middle" className="fill-[#B45309]" fontSize="7" fontWeight="600" fontFamily="system-ui">Full Stack</text>

                  {/* Milestone dots on Coffee Only line */}
                  <circle cx="115" cy="70" r="4" fill="#A8A29E" />
                  <circle cx="245" cy="130" r="4" fill="#A8A29E" />
                  <circle cx="375" cy="140" r="4" fill="#A8A29E" />
                  <circle cx="505" cy="142" r="4" fill="#A8A29E" />
                </svg>
              </div>

              {/* Mobile legend */}
              <div className="flex sm:hidden items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-stone-300" />
                  <span className="text-xs text-[#A8A29E] font-medium">Coffee Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-[#D97706]" />
                  <span className="text-xs text-[#D97706] font-medium">With BrewNectar</span>
                </div>
              </div>

              <p className="text-center text-xs text-[#A8A29E] mt-4">
                This is why we recommend subscribing for at least 3 months to experience the full compounding benefits.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ COMPARISON TABLE — REDESIGNED ═══════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Why BrewNectar Wins</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              Stop Settling. Start Upgrading.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Other options force you to compromise — bad taste, new coffee, hidden blends, or sugar crashes. BrewNectar is the only upgrade with zero trade-offs.
            </p>
          </FadeUp>

          {/* Visual comparison cards */}
          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* BrewNectar — the winner */}
              <div className="relative rounded-2xl border-2 border-[#B45309] bg-white p-6 md:p-8 shadow-warm">
                <div className="absolute -top-3.5 left-6 px-4 py-1 bg-[#B45309] text-white text-xs font-bold rounded-full uppercase tracking-wide">The Upgrade</div>
                <h3 className="font-display text-2xl font-bold text-[#1C1917] mt-2 mb-1">BrewNectar</h3>
                <p className="text-sm text-[#78716C] mb-5">Add to your existing coffee. Done.</p>
                <div className="space-y-3">
                  {[
                    { text: "Clinical-dose nootropics (Lion's Mane 1.2g, Cognizin® 250mg)", bold: true },
                    { text: "Works with ANY coffee you already love" },
                    { text: "Zero sugar, zero calories" },
                    { text: "Calm focus without jitters or crash" },
                    { text: "100% transparent label — every mg disclosed" },
                    { text: "Supports neurogenesis & long-term brain health" },
                    { text: "Vanilla bean flavor that actually tastes good" },
                    { text: "From $0.90/day (less than your coffee)" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} strokeWidth={3} className="text-emerald-600" />
                      </div>
                      <span className={`text-sm ${item.bold ? "font-semibold text-[#1C1917]" : "text-[#44403C]"}`}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}</div>
                    <span className="text-xs font-semibold text-[#1C1917]">4.9/5</span>
                    <span className="text-xs text-[#78716C]">from 2,400+ reviews</span>
                  </div>
                </div>
              </div>

              {/* The alternatives — stacked losers */}
              <div className="space-y-4">
                {[
                  {
                    name: "Mushroom Coffees",
                    subtitle: "Ryze, Everyday Dose, Four Sigmatic",
                    cons: ["Forces you to switch your coffee", "Earthy taste most people dislike", "Proprietary blends hide real dosages", "48 BBB complaints (Ryze alone)"],
                  },
                  {
                    name: "Sugary Coffee Syrups",
                    subtitle: "Torani, Monin, Starbucks",
                    cons: ["10-15g sugar per pump", "Zero cognitive benefits", "Blood sugar spike → crash", "Empty calories, no function"],
                  },
                  {
                    name: "Nootropic Pills",
                    subtitle: "Alpha Brain, Thesis, etc.",
                    cons: ["Another pill to remember", "Doesn't integrate into your routine", "Often underdosed ingredients", "No ritual, no enjoyment"],
                  },
                ].map((alt) => (
                  <div key={alt.name} className="rounded-xl border border-stone-200 bg-white/60 p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-display font-bold text-[#1C1917] text-sm">{alt.name}</h4>
                        <p className="text-xs text-[#A8A29E]">{alt.subtitle}</p>
                      </div>
                      <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Trade-offs</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {alt.cons.map((con) => (
                        <div key={con} className="flex items-start gap-1.5">
                          <XIcon size={12} strokeWidth={3} className="text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[#78716C]">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Bottom verdict strip */}
          <FadeUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-5 rounded-2xl bg-[#1C1917] text-white">
              <div className="text-center">
                <p className="text-2xl font-display font-bold">8/8</p>
                <p className="text-xs text-stone-400">features checked</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">$0.90</p>
                <p className="text-xs text-stone-400">per day (3-bottle plan)</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">0</p>
                <p className="text-xs text-stone-400">trade-offs</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-700" />
              <Link href="/product" className="px-6 py-2.5 rounded-full bg-[#B45309] hover:bg-[#92400E] text-sm font-bold transition-colors">
                Try BrewNectar →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE & SAVE — FULL OFFER ═══════════ */}
      <section id="offers" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading above the two-column layout */}
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">Subscribe & Save</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] mb-4">
                Keep Your Coffee. Upgrade Your Brain.
              </h2>
              <p className="text-[#78716C] text-lg leading-relaxed max-w-3xl mx-auto">
                Formulated with clinical-dose Lion's Mane, patented Cognizin®, and L-Theanine, one pump transforms any coffee into a precision nootropic stack—delivering calm focus, faster recall, and sustained mental energy without the jitters, crash, or need to change your coffee.
              </p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: PDP Images — sticky on desktop, swipeable on mobile */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-24 lg:self-start">
              {/* Swipeable gallery on mobile */}
              <div
                className="relative rounded-2xl overflow-hidden aspect-square bg-stone-50 touch-pan-y"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  (e.currentTarget as any)._touchStartX = touch.clientX;
                  (e.currentTarget as any)._touchStartY = touch.clientY;
                }}
                onTouchEnd={(e) => {
                  const startX = (e.currentTarget as any)._touchStartX;
                  const startY = (e.currentTarget as any)._touchStartY;
                  if (startX == null || startY == null) return;
                  const endX = e.changedTouches[0].clientX;
                  const endY = e.changedTouches[0].clientY;
                  const diffX = startX - endX;
                  const diffY = Math.abs(startY - endY);
                  if (Math.abs(diffX) > 40 && diffY < 80) {
                    if (diffX > 0 && selectedImage < pdpImages.length - 1) setSelectedImage(selectedImage + 1);
                    if (diffX < 0 && selectedImage > 0) setSelectedImage(selectedImage - 1);
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={pdpImages[selectedImage]}
                    alt={`BrewNectar product ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {pdpImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${selectedImage === i ? "bg-[#B45309] w-5" : "bg-white/70"}`}
                    />
                  ))}
                </div>
              </div>
              {/* Thumbnail strip */}
              <div className="hidden sm:flex gap-2 mt-3">
                {pdpImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedImage === i
                        ? "border-[#B45309] ring-2 ring-amber-200"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                    style={{ width: "calc(25% - 6px)" }}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              {/* Trust badges below images */}
              <div className="mt-4 flex items-center justify-center gap-6">
                {[
                  { icon: ShieldCheck, label: "30-Day Guarantee" },
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RotateCcw, label: "Cancel Anytime" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-[#78716C]">
                    <badge.icon size={14} />
                    <span className="text-xs font-medium">{badge.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right: Full offer */}
            <FadeUp delay={0.15}>
              <div>
                {/* Trust strip — Back in Stock + Stars + Reviews + Members */}
                <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-[#FDFBF7] border border-stone-100">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                    Back in Stock
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-sm font-bold text-[#1C1917]">4.9</span>
                    <span className="text-sm text-[#78716C]">stars from</span>
                    <span className="text-sm font-bold text-[#1C1917]">2,400+</span>
                    <span className="text-sm text-[#78716C]">reviews</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 border-l border-stone-200 pl-3">
                    <span className="text-sm font-bold text-[#1C1917]">12,000+</span>
                    <span className="text-sm text-[#78716C]">members</span>
                  </div>
                </div>

                {/* Plan cards */}
                <div className="space-y-3 mb-4">
                  {PLAN_ORDER.map((planKey) => {
                    const plan = PLANS[planKey];
                    const isSelected = selectedPlan === planKey && selectedPlan !== "one-time";
                    return (
                      <button
                        key={planKey}
                        onClick={() => setSelectedPlan(planKey)}
                        className={`w-full text-left rounded-2xl border-2 transition-all duration-200 relative overflow-hidden ${
                          isSelected
                            ? "border-[#B45309] bg-white shadow-warm"
                            : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                      >
                        {plan.badge && (
                          <span className={`absolute -top-0 right-0 px-3 py-1 ${plan.badgeColor} text-white text-[10px] font-bold rounded-bl-xl uppercase tracking-wide`}>
                            {plan.badge}
                          </span>
                        )}
                        <div className={`flex items-center justify-between gap-3 p-4 md:p-5 ${plan.badge ? "pt-7 md:pt-5" : ""}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? "border-[#B45309]" : "border-stone-300"
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-display font-bold text-base text-[#1C1917]">{plan.label}</h3>
                                {plan.discount && (
                                  <span className="text-sm font-semibold text-emerald-600">
                                    (Save {plan.discount.replace(' OFF', '')})
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#78716C] mt-0.5">{plan.subtitle}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end">
                              <span className="font-display text-xl sm:text-2xl font-bold text-[#1C1917]">${plan.perMonth}</span>
                              <span className="text-sm text-[#57534E] font-medium">/mo</span>
                            </div>
                            <p className="text-[11px] text-[#78716C]">${plan.perDay} USD / DAY</p>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-stone-100 mt-0">
                                <div className="pt-3 space-y-1.5">
                                  {plan.perks.map((perk) => (
                                    <div key={perk.text} className="flex items-center gap-2">
                                      {perk.positive ? (
                                        <Check size={16} strokeWidth={3} className="text-emerald-600 flex-shrink-0" />
                                      ) : (
                                        <XIcon size={16} strokeWidth={3} className="text-red-500 flex-shrink-0" />
                                      )}
                                      <span className={`text-sm ${perk.positive ? "text-[#44403C]" : "text-red-500 font-semibold"}`}>
                                        {perk.text}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>

                {/* Free Gifts */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift size={16} className="text-[#B45309]" />
                    <span className="text-sm font-bold text-[#1C1917]">Free gifts with your order</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { if (selectedPlan === "one-time") setSelectedPlan("subscribe-1"); }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan !== "one-time"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan === "one-time" && <div className="absolute top-2 right-2"><Lock size={12} className="text-stone-400" /></div>}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan !== "one-time" ? "bg-[#B45309]/10" : "bg-stone-200"}`}>
                        <GraduationCap size={16} className={selectedPlan !== "one-time" ? "text-[#B45309]" : "text-stone-400"} />
                      </div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">Focus & Clarity Masterclass</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-stone-400 line-through">$25</span>
                        <span className={`text-[10px] font-bold ${selectedPlan !== "one-time" ? "text-emerald-600" : "text-stone-400"}`}>FREE</span>
                      </div>
                      {selectedPlan !== "one-time" && (
                        <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>
                      )}
                    </button>
                    <button
                      onClick={() => { if (selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2") setSelectedPlan("subscribe-2"); }}
                      className={`flex-1 relative rounded-xl border-2 p-3 transition-all duration-200 text-left ${
                        selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2"
                          ? "border-[#B45309]/30 bg-amber-50/60"
                          : "border-stone-200 bg-stone-50 opacity-60 cursor-pointer hover:border-stone-300"
                      }`}
                    >
                      {selectedPlan !== "subscribe-3" && selectedPlan !== "subscribe-2" && <div className="absolute top-2 right-2"><Lock size={12} className="text-stone-400" /></div>}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "bg-[#B45309]/10" : "bg-stone-200"}`}>
                        <Trophy size={16} className={selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "text-[#B45309]" : "text-stone-400"} />
                      </div>
                      <p className="text-xs font-bold text-[#1C1917] leading-tight">La Marzocco Espresso Machine ($4500) Giveaway</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-stone-400">2+ bottles</span>
                        <span className={`text-[10px] font-bold ${selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "text-emerald-600" : "text-stone-400"}`}>
                          {selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2" ? "ENTERED" : "LOCKED"}
                        </span>
                      </div>
                      {(selectedPlan === "subscribe-3" || selectedPlan === "subscribe-2") && (
                        <div className="absolute -top-1.5 -left-1.5"><div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3} className="text-white" /></div></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* One Time Purchase link */}
                <div className="text-center mb-5">
                  <button
                    onClick={() => setSelectedPlan("one-time")}
                    className={`text-sm font-medium transition-colors ${
                      selectedPlan === "one-time"
                        ? "text-[#B45309] underline decoration-2 underline-offset-4"
                        : "text-[#78716C] underline decoration-dotted underline-offset-4 hover:text-[#B45309]"
                    }`}
                  >
                    One Time Purchase ${PLANS["one-time"].price}
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    const plan = PLANS[selectedPlan];
                    toast.success("Added to cart!", {
                      description: `${plan.label} (${plan.isSubscription ? "Subscription" : "One-time"}) — $${plan.isSubscription ? plan.perMonth + "/mo" : plan.price}`,
                    });
                  }}
                  className="w-full py-4 rounded-full text-base font-bold text-white bg-[#1C1917] hover:bg-[#292524] transition-all hover:shadow-lg"
                >
                  {selectedPlan === "one-time"
                    ? `BUY NOW — $${PLANS["one-time"].price}`
                    : `START MY ${PLANS[selectedPlan].label.toUpperCase()} PLAN — $${PLANS[selectedPlan].perMonth}/MO`}
                </button>

                {/* Shipping notice */}
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-[#57534E]">
                    <Truck size={14} className="text-[#78716C]" />
                    <span>Ships to United States in 4–5 days</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-semibold text-[#92400E]">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" /></span>
                    Faster Shipping due to high demand
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF — VIDEO TESTIMONIALS ═══════════ */}
      <section id="social-proof" className="py-20 md:py-28 bg-[#FDFBF7]">
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

          {/* Auto-scrolling horizontal carousel */}
          <style>{`
            @keyframes scrollReviews {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .reviews-track {
              animation: scrollReviews 40s linear infinite;
            }
            .reviews-track:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div
            ref={scrollRef}
            className="overflow-hidden pb-4"
          >
            <div className="reviews-track flex gap-5 w-max">
              {/* Duplicate testimonials for seamless loop */}
              {[...VIDEO_TESTIMONIALS, ...VIDEO_TESTIMONIALS].map((t, i) => {
                const origIdx = i % VIDEO_TESTIMONIALS.length;
                return (
                  <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[300px]">
                    {(t as any).videoSrc ? (
                      <VideoCard
                        videoSrc={(t as any).videoSrc}
                        name={t.name}
                        title={t.title}
                        quote={t.quote}
                        rating={t.rating}
                      />
                    ) : (
                      <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-warm hover:border-amber-100 transition-all duration-300 h-full flex flex-col">
                        <div className="p-5 pb-0 flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm ${
                            ["bg-amber-600", "bg-emerald-600", "bg-sky-600", "bg-violet-600", "bg-rose-600"][origIdx % 5]
                          }`}>
                            {t.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1C1917]">{t.name}</p>
                            <p className="text-xs text-[#A8A29E]">{t.title}</p>
                          </div>
                          <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                            <Check size={10} /> Verified
                          </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <div className="flex gap-0.5 mb-2">
                            {[...Array(t.rating)].map((_, j) => (
                              <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                            ))}
                          </div>
                          <p className="text-sm text-[#44403C] leading-relaxed line-clamp-4 flex-1">"{t.quote}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Manual scroll arrows */}
          <div className="flex justify-center gap-2 mt-4">
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

      {/* ═══════════ EXTENDED TEXT REVIEWS ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">In Their Words</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-[#1C1917] mb-3">
              Real Stories From Real Customers
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what people are saying after making BrewNectar part of their daily ritual.
            </p>
          </FadeUp>

          <div className="space-y-6">
            {EXTENDED_REVIEWS.map((review, i) => (
              <FadeUp key={review.name} delay={i * 0.08}>
                <div className="bg-[#FDFBF7] border border-stone-100 rounded-2xl p-6 md:p-8 hover:shadow-warm hover:border-amber-100 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(review.rating)].map((_, j) => (
                          <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
                        ))}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#1C1917]">{review.heading}</h3>
                    </div>
                    <span className="text-xs text-[#A8A29E] whitespace-nowrap mt-1">{review.date}</span>
                  </div>

                  {/* Body */}
                  <p className="text-[#57534E] leading-relaxed mb-4 text-sm md:text-base">
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                      <span className="font-display font-bold text-sm text-[#B45309]">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917]">{review.name}</p>
                      <p className="text-xs text-[#A8A29E]">{review.title} · Verified Buyer</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700">
                        <Check size={10} /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Bottom CTA */}
          <FadeUp delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/product"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
              >
                Join 12,000+ High Performers
              </Link>
              <p className="text-xs text-[#A8A29E] mt-3">30-day keep-the-bottle guarantee · Free shipping on subscriptions</p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />

      {/* ═══════════ STICKY MOBILE CTA BAR ═══════════ */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1C1917] truncate">Get BrewNectar</p>
                <p className="text-xs text-[#78716C]">From $27/mo · Free Shipping</p>
              </div>
              <a
                href="#offers"
                className="flex-shrink-0 px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all"
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

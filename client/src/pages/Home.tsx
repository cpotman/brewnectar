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
import { useVisualViewport } from "@/hooks/useVisualViewport";
import { toast } from "sonner";
import { useUserState } from "@/hooks/useUserState";

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
    ingredient: "Lion’s Mane",
    studyCount: "30+",
    tagline: "Peer-reviewed studies on neurogenesis & cognitive function",
    icon: Brain,
    color: "bg-amber-50 border-amber-200/60 text-[#B45309]",
    dotColor: "bg-[#D97706]",
    studies: [
      {
        title: "Acute and Chronic Effects of Lion’s Mane on Cognitive Function",
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
        finding: "Comprehensive review confirming Lion’s Mane promotes nerve growth factor (NGF) production and neuronal differentiation.",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10650066/",
      },
    ],
  },
  {
    ingredient: "Cognizin®",
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
        authors: "Calderón-Ospina & Nava-Mesa",
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706]">The Evidence</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
            We Don’t Ask You to Trust Us. We Show You the Papers.
          </h2>
          <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
            175+ peer-reviewed studies back the ingredients in every bottle. Tap any ingredient to read the research yourself.
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
  "Free shipping on every subscription",
  "30 days. If you don't feel sharper, keep the bottle. Full refund.",
  "Zero sugar · 30 servings · $0.90/day",
  "Smooth vanilla bean — not earthy, not bitter, not mushroom",
  "Every batch third-party tested for purity & potency",
  "Subscribe & save up to 45%",
  "4 research-backed nootropics in every pump",
];

/* ─── Video testimonials data ─── */
const VIDEO_TESTIMONIALS = [
  {
    id: 0,
    name: "Real Customer",
    title: "UGC Review",
    quote: "One pump. Same coffee. Completely different afternoon. Watch what happened.",
    rating: 5,
    thumbnail: IMAGES.hero,
    videoSrc: IMAGES.ugcVideo,
  },
  {
    id: 1,
    name: "Alex K.",
    title: "Software Engineer",
    quote: "I used to hit a wall at 2pm and stare at my IDE. Now I ship features until 5 without noticing the clock. Same one cup of coffee.",
    rating: 5,
    thumbnail: IMAGES.howLockIn,
  },
  {
    id: 2,
    name: "Sarah M.",
    title: "Product Designer",
    quote: "I designed an entire 40-screen app flow in one sitting. No second coffee. No snack break. Just… flow. That never happened before.",
    rating: 5,
    thumbnail: IMAGES.lifestylePour,
  },
  {
    id: 3,
    name: "Marcus T.",
    title: "Founder & CEO",
    quote: "I’ve wasted hundreds on nootropic pills I forgot to take. This goes in the coffee I already drink. That’s why it stuck.",
    rating: 5,
    thumbnail: IMAGES.howStir,
  },
  {
    id: 4,
    name: "Priya R.",
    title: "Medical Student",
    quote: "My study sessions went from 45 scattered minutes to 3 locked-in hours. During boards prep, I recalled details I read weeks ago.",
    rating: 5,
    thumbnail: IMAGES.howLockIn,
  },
  {
    id: 5,
    name: "Jordan L.",
    title: "Creative Director",
    quote: "The jitters are gone. The crash is gone. What’s left is this clean, quiet focus where ideas actually connect. I’m not going back.",
    rating: 5,
    thumbnail: IMAGES.hero,
  },
];

/* ─── FAQ data ─── */
const FAQ_DATA = [
  {
    q: "Do I need to switch my coffee?",
    a: "No. That’s the whole point. Mushroom coffees force you to drink their coffee. BrewNectar works with the coffee you already love. Drip, cold brew, espresso, latte, even decaf. One pump. Same mug. You’re upgraded. Most people tell us it’s the easiest health decision they’ve ever made.",
  },
  {
    q: "What does it taste like? (Mushroom coffee tastes awful.)",
    a: "We know. Most mushroom coffees taste like dirt mixed with cardboard. That's because they ARE the coffee. BrewNectar is a vanilla bean syrup — smooth, mildly sweet (zero sugar), and designed to make your existing coffee taste better. Think premium vanilla latte, not earthy supplement. It blends into black coffee, oat milk lattes, and cold brew without changing the character of your drink. Many customers tell us they actually prefer their coffee with it now. That's the difference between replacing your coffee and upgrading it.",
  },
  {
    q: "I’m already jittery from coffee. Won’t this make it worse?",
    a: "The opposite. L-Theanine is in the formula specifically to smooth out caffeine’s rough edges. It promotes alpha brain wave activity, which is the neurological state behind calm, sustained attention. The result: you keep the energy, lose the anxiety. Many customers report they’ve actually reduced their coffee intake because one cup with BrewNectar does more than three cups without it.",
  },
  {
    q: "Can I take it every day?",
    a: "Yes, and you should. Every ingredient is GRAS-certified and clinically studied for daily use. But here’s the real reason: Lion’s Mane and Cognizin® compound over time. The longer you use BrewNectar consistently, the more your brain builds new neural connections. Skipping days slows that process. Think of it less like a supplement and more like a daily investment in how your brain performs.",
  },
  {
    q: "How fast will I notice a difference?",
    a: "Most people feel calmer, sharper focus within 20 minutes of their first cup. That’s the L-Theanine and Cognizin® working immediately. The deeper benefits take longer. After 2–4 weeks, you’ll notice faster recall. After 2–3 months, Lion’s Mane’s neurogenesis effects kick in. That’s when people say things like ‘my brain feels different.’ The 3-bottle plan exists for exactly this reason.",
  },
  {
    q: "How do I know the ingredients are real and properly dosed?",
    a: "Every batch is third-party tested for purity, potency, and heavy metals. We use Cognizin®, a patented form of citicoline with 20+ clinical trials behind it. We disclose every milligram on the label. No proprietary blends. No hidden dosages. If a company won’t tell you exactly what’s in the bottle, ask yourself why.",
  },
  {
    q: "What if it doesn’t work for me?",
    a: "Then you keep the bottle and we refund every penny. No form. No return shipping. One email. We do this because the vast majority of subscribers stay past their first order. We're that confident. Try it for 30 days. If your coffee doesn’t feel different, you paid nothing.",
  },
];

/* ─── Ingredient data ─── */
const INGREDIENTS = [
  {
    name: "Lion's Mane",
    dosage: "1.2g per serving",
    tag: "Your Brain Builds New Connections*",
    science: "30+ peer-reviewed studies show Lion’s Mane stimulates nerve growth factor (NGF), the protein your brain uses to grow and repair neurons. This isn’t a temporary boost. It’s structural change.",
    emotion: "The reason your thinking may get sharper over weeks, not just hours.*",
    icon: Brain,
    color: "bg-amber-50 text-[#B45309]",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-lions-mane_c905f004.png",
  },
  {
    name: "Cognizin® (Citicoline)",
    dosage: "250mg per serving",
    tag: "Retrieve Names, Numbers, and Ideas On Demand*",
    science: "The only patented form of citicoline with 20+ clinical trials on focus and working memory. In one study, subjects improved attentional performance and reduced errors after just 28 days.",
    emotion: "That name on the tip of your tongue? You'll recall it faster.*",
    icon: Zap,
    color: "bg-emerald-50 text-emerald-700",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-cognizin_3fb446ba.png",
  },
  {
    name: "L-Theanine",
    dosage: "75mg per serving",
    tag: "The Reason You Won't Feel Jittery*",
    science: "This amino acid, found naturally in green tea, promotes alpha brain wave activity. That’s the neurological state behind calm, sustained attention. Combined with caffeine, clinical trials show it improves focus while reducing anxiety.",
    emotion: "Your hands stop shaking. Your mind stops racing. What's left is clean, quiet focus.*",
    icon: Sparkles,
    color: "bg-sky-50 text-sky-700",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/ingredient-l-theanine_dc3b4af3.png",
  },
  {
    name: "B Vitamins (B6 + B12)",
    dosage: "250% DV each",
    tag: "Steady Energy That Doesn’t Crash",
    science: "B vitamins are essential cofactors in the production of dopamine, serotonin, and norepinephrine. They support your brain's natural energy metabolism and neurotransmitter synthesis throughout the day.",
    emotion: "No spike at 9am. No wall at 2pm. Just steady, reliable output.*",
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
    label: "90-Day Supply",
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
      { text: "\ud83d\udcb0 Maximum savings — lowest price per serving", positive: true },
      { text: "\ud83d\udd12 Lock in savings — price guaranteed even if we raise it", positive: true },
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
    label: "60-Day Supply",
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
      { text: "\ud83d\udcb0 Great value — $32/mo, share with a partner", positive: true },
      { text: "\ud83d\udd12 Lock in savings — price guaranteed even if we raise it", positive: true },
      { text: "\ud83d\udee1\ufe0f Try it 30 days — keep the bottle if you're not sharper. Full refund.", positive: true },
      { text: "\ud83c\udfc6 La Marzocco Espresso Machine ($4500) Giveaway entries", positive: true },
      { text: "\ud83d\ude9a Fast & FREE Shipping", positive: true },
      { text: "\ud83d\udd04 Cancel or pause anytime", positive: true },
    ],
    isSubscription: true,
  },
  "subscribe-1": {
    label: "30-Day Supply",
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
    label: "30-Day Supply",
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
    heading: "I recommend this to patients. I also take it myself.",
    text: "I’m extremely cautious about supplements. Most nootropic products hide behind proprietary blends with undisclosed dosages. BrewNectar discloses every milligram. The Cognizin® at 250mg has solid evidence for memory and attention. The Lion’s Mane is dosed at 1.2g with specified beta-glucan content. I’ve been using it for 3 months and recommending it to patients who want cognitive support. The syrup format means they actually take it, unlike the pills that end up forgotten in a drawer.",
  },
  {
    name: "James P.",
    title: "Day Trader",
    rating: 5,
    date: "February 2026",
    heading: "A single lapse in focus costs me thousands. This fixed that.",
    text: "I trade futures from 6:30 AM to 4 PM. Nearly 10 hours of decisions where one impulsive move can wipe a week of gains. I used to rely on 4-5 cups of coffee. By noon I’d be jittery and making bad calls. Switched to 2 cups with BrewNectar. My screen time analytics show fewer trades, but better ones. The L-Theanine keeps me calm during volatile moves. I’m on the 3-bottle plan because running out is not an option.",
  },
  {
    name: "Michelle K.",
    title: "Working Mom of 3",
    rating: 5,
    date: "March 2026",
    heading: "The afternoon crash stopped. I’m not exaggerating.",
    text: "Three kids under 8. By 2 PM I used to be running on fumes. Snapping at the kids. Forgetting school pickups. Staring at my laptop unable to form a sentence. My husband found BrewNectar. I was skeptical. After two weeks of adding it to my morning latte, the crash just… stopped. I’m more patient. I’m getting work done during nap time instead of doom-scrolling. This is the only ‘supplement’ that’s ever actually changed my day.",
  },
  {
    name: "David S.",
    title: "PhD Candidate, Neuroscience",
    rating: 5,
    date: "January 2026",
    heading: "I study neuroplasticity. The formula is legit.",
    text: "I know exactly what Lion’s Mane and citicoline do at the cellular level. Most companies underdose or use inferior forms. BrewNectar uses Cognizin® (the patented citicoline) and specifies beta-glucan content in their Lion’s Mane. That’s how you know it’s real. I’ve used it daily for 4 months while writing my dissertation. My writing sessions went from fragmented 30-minute bursts to solid 2-3 hour deep work blocks. My advisor noticed the difference before I told her what I was taking.",
  },
  {
    name: "Tanya R.",
    title: "Yoga Instructor & Wellness Coach",
    rating: 5,
    date: "February 2026",
    heading: "I read every label. This one passed.",
    text: "No artificial sweeteners. No fillers. No proprietary blends. Zero sugar. I can pronounce every ingredient. I add it to matcha on days I skip coffee and it works the same. The vanilla is subtle and natural. Not that fake sweetness you get from most supplements. My clients started asking what changed because my class cues are sharper and I’m remembering everyone’s modifications without checking my notes.",
  },
  {
    name: "Robert M.",
    title: "Retired Engineer, Age 68",
    rating: 5,
    date: "March 2026",
    heading: "At 68, I beat my grandson at chess again.",
    text: "I was starting to notice the little things. Forgetting where I put my keys. Losing my train of thought mid-sentence. Struggling with crossword puzzles I used to breeze through. My daughter bought me BrewNectar for Christmas. Three months later: the crosswords are easier. I’m reading two books a week instead of one. And last week I won at chess for the first time in a year. The Lion’s Mane research on neurogenesis in older adults is what convinced me to stick with it.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("subscribe-3");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userRegion = useUserState();
  const stickyBottomOffset = useVisualViewport();

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
                  <span className="text-xs font-medium text-[#92400E]">Thousands of people made this switch</span>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-[#1C1917] mb-5 md:mb-6">
                  Your Coffee Gives You Energy.{" "}
                  <span className="text-gradient-warm">It Can't Give You Focus.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-base md:text-lg lg:text-xl text-[#57534E] leading-relaxed mb-6 md:mb-8 max-w-lg">
                  One pump of vanilla bean syrup adds four research-backed nootropics to the coffee you already drink. The result: calmer, sharper focus that many users notice within the first 20 minutes,* recall that may improve with consistent use,* and an afternoon that doesn't fall apart. No new coffee. No pills. No blender.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
                  <a
                    href="#offers"
                    onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg group cursor-pointer"
                  >
                    Give Me Calm Focus
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-6">
                  {[
                    { label: "Works with Any Coffee", icon: "☕" },
                    { label: "Smooth Vanilla Bean Flavor", icon: "🌿" },
                    { label: "Zero Sugar · Zero Calories", icon: "✦" },
                    { label: "4 Research-Backed Nootropics", icon: "◆" },
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
                  <p className="text-sm text-[#57534E] italic">"I look up and 3 hours have passed. That never happened with just coffee." — Priya R.</p>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Sound Familiar?</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-4 max-w-3xl mx-auto">
              You Drink the Coffee. The Focus Never Shows Up.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              You already know this feeling. You pour the cup. You wait for clarity. Instead, you get 45 minutes of scattered energy followed by a wall. Caffeine is a stimulant — it boosts alertness, but it doesn't support memory, recall, or sustained focus on its own. Here's what it's actually doing to your day.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { icon: "\u26A1", title: "The Jitters", desc: "Your hands shake. Your heart races. You mistake adrenaline for productivity." },
              { icon: "\uD83C\uDF2B\uFE0F", title: "The Fog", desc: "Two cups in. You re-read the same paragraph three times. Nothing sticks." },
              { icon: "\uD83D\uDCC9", title: "The 2pm Wall", desc: "Your morning energy vanishes. You stare at your screen. The afternoon is gone." },
              { icon: "\uD83D\uDD00", title: "The Scatter", desc: "You open 12 tabs. Start 4 tasks. Finish zero. Your brain won't hold a thread." },
              { icon: "\u23F3", title: "The Delay", desc: "You know what you need to do. You can't make yourself start. Another day lost." },
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
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">What's Inside</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-4">
              Caffeine Gives You Energy. These Give You Focus.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              Four ingredients. Every milligram disclosed. No proprietary blends. Each one chosen for a specific job your coffee can't do alone.
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
              10 Seconds. Same Mug. Smarter Coffee.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-16 max-w-2xl mx-auto">
              You don't change your coffee. You don't add a step. You upgrade the one you already have.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                step: "01",
                title: "Pour",
                desc: "One pump into the coffee you’re already holding. Drip, cold brew, espresso, oat milk latte. It doesn’t matter. It all works.",
                image: IMAGES.lifestylePour,
              },
              {
                step: "02",
                title: "Stir",
                desc: "Smooth vanilla bean dissolves in seconds. No grit. No earthy mushroom taste. No chalky residue. Your coffee actually tastes better — like a premium vanilla latte, not a health supplement.",
                highlight: "Smooth vanilla bean dissolves in seconds.",
                image: IMAGES.howStir,
              },
              {
                step: "03",
                title: "Lock In",
                desc: "Many users report feeling calmer and more focused within the first 20 minutes.* You start working. You look up and an hour has passed. That's the stack doing its job.",
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
                  <p className="text-[#78716C] leading-relaxed">
                    {item.highlight ? (
                      <>
                        <span className="bg-amber-100 text-[#B45309] font-semibold px-1 rounded">{item.highlight}</span>{" "}
                        {item.desc.replace(item.highlight, "").trim()}
                      </>
                    ) : item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════ ENERGY CLARITY SLIDER (hidden — uncomment to restore) ═══════════ */}
      {/* <EnergyClaritySlider /> */}

      {/* ═══════════ CLINICAL STUDIES ═══════════ */}
      <ClinicalStudies />

      {/* ═══════════ WHAT TO EXPECT — TIMELINE ═══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">The Compounding Effect</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              Day 1 Feels Good. Month 3 Changes Everything.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Most nootropics give you a spike and a crash. BrewNectar compounds. Each week builds on the last. Here's what your brain does with consistency.
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
                  title: "The Quiet Settles In",
                  desc: "L-Theanine smooths out caffeine's rough edges within 20 minutes.* Cognizin® sharpens working memory.* Your first cup feels different. Calmer. Clearer. No jitters.",
                  ingredients: ["L-Theanine", "Cognizin"],
                  color: "bg-amber-50 border-amber-200",
                  iconColor: "text-[#D97706]",
                  dotColor: "bg-[#D97706]",
                  level: "40%",
                },
                {
                  period: "1 Month",
                  title: "Names Come Faster",
                  desc: "Cognizin® accumulates in your system. Working memory may improve.* You recall details from meetings without checking notes. Tasks that felt hard start feeling automatic.",
                  ingredients: ["Cognizin", "B Vitamins"],
                  color: "bg-emerald-50 border-emerald-200",
                  iconColor: "text-emerald-600",
                  dotColor: "bg-emerald-600",
                  level: "60%",
                },
                {
                  period: "2 Months",
                  title: "Deep Work Gets Deeper",
                  desc: "Lion's Mane has been studied for its role in supporting nerve growth factor (NGF) production, which may support the formation of new neural connections over time.* Many users report deeper, longer focus sessions around this stage.",
                  ingredients: ["Lion's Mane", "Cognizin"],
                  color: "bg-sky-50 border-sky-200",
                  iconColor: "text-sky-600",
                  dotColor: "bg-sky-600",
                  level: "80%",
                },
                {
                  period: "3 Months",
                  title: "Your Brain Feels Different",
                  desc: "The full stack is compounding. This is when many customers say 'my brain feels different.'* Not a spike. A sustained improvement in how you think, built through consistent daily use.",
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


        </div>
      </section>

      {/* ═══════════ COMPARISON TABLE — BrewNectar vs Mushroom Coffee ═══════════ */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3 text-center">Side-by-Side</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1C1917] mb-3">
              BrewNectar vs. Mushroom Coffee
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-12 max-w-2xl mx-auto">
              You shouldn't have to switch your coffee or choke down an earthy aftertaste to get cognitive support. Here's how we compare.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#1C1917] text-white">
                    <th className="py-4 px-5 font-semibold text-xs uppercase tracking-wider w-[40%]">Feature</th>
                    <th className="py-4 px-5 font-semibold text-xs uppercase tracking-wider text-center">
                      <span className="text-amber-300">BrewNectar</span>
                    </th>
                    <th className="py-4 px-5 font-semibold text-xs uppercase tracking-wider text-center text-stone-400">Mushroom Coffee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { feature: "Taste", brew: "Smooth vanilla bean — enhances your coffee", mush: "Earthy, bitter — replaces your coffee", highlight: true },
                    { feature: "Your coffee routine", brew: "Keep it. Just add one pump.", mush: "Gone. You drink theirs instead." },
                    { feature: "Lion's Mane dose", brew: "1,200mg (transparent label)", mush: "Unknown (proprietary blend)" },
                    { feature: "Cognizin® (Citicoline)", brew: "250mg patented form", mush: "Not included" },
                    { feature: "L-Theanine", brew: "75mg for calm focus*", mush: "Not included" },
                    { feature: "Sugar", brew: "0g", mush: "Varies (0–5g)" },
                    { feature: "Calories", brew: "0", mush: "15–40 per serving" },
                    { feature: "Label transparency", brew: "Every mg disclosed", mush: "Proprietary blends common" },
                    { feature: "Works with any coffee", brew: "Yes — drip, espresso, cold brew, latte", mush: "No — it IS the coffee" },
                    { feature: "Price per day", brew: "From $0.90", mush: "$1.50–$2.50" },
                  ].map((row) => (
                    <tr key={row.feature} className={row.highlight ? "bg-amber-50/50" : "hover:bg-stone-50 transition-colors"}>
                      <td className="py-3.5 px-5 font-medium text-[#1C1917]">{row.feature}</td>
                      <td className="py-3.5 px-5 text-center">
                        <span className="text-[#44403C] font-medium">{row.brew}</span>
                      </td>
                      <td className="py-3.5 px-5 text-center text-[#78716C]">{row.mush}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom CTA strip */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-5 rounded-2xl bg-[#1C1917] text-white">
              <p className="text-sm text-stone-300 text-center sm:text-left">
                Same cognitive ingredients. Better taste. No coffee switch required.
              </p>
              <a
                href="#offers"
                onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-6 py-2.5 rounded-full bg-[#B45309] hover:bg-[#92400E] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Give Me Calm Focus →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════ SUBSCRIBE & SAVE — FULL OFFER ═══════════ */}
      <section id="offers" className="pt-6 pb-20 md:pt-8 md:pb-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading above the two-column layout */}
          <FadeUp>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">Choose Your Plan</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] mb-4">
                Ditch the Dirt Coffee. Keep the Focus.
              </h2>
              <p className="text-[#78716C] text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
                Mushroom coffee tastes like wet soil and replaces the cup you love. BrewNectar is a <span className="font-bold text-gradient-warm">smooth vanilla bean syrup</span> that goes into your existing coffee — same mug, better flavor, real nootropics. From $0.90/day.*
              </p>
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: PDP Images — sticky on desktop, swipeable on mobile */}
            <FadeUp delay={0.05} className="lg:sticky lg:top-36 lg:self-start">
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
                {/* Trust strip — 3 rows */}
                <div className="flex flex-col gap-2.5 mb-5">
                  {/* Row 1: Now Shipping */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700 w-fit">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
                    Now Shipping
                  </span>
                  {/* Row 2: Built for real results */}
                  <div className="flex items-center gap-2 text-sm text-[#44403C]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#78716C]">
                      <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 1v4M11 1v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>Designed to compound over <strong className="text-[#1C1917]">3 months</strong></span>
                  </div>
                  {/* Row 3: Stars + reviews */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-sm font-bold text-[#1C1917]">4.9</span>
                    <span className="text-sm text-[#78716C]">from</span>
                    <span className="text-sm font-bold text-[#1C1917]">2,400+</span>
                    <span className="text-sm text-[#78716C]">reviews</span>
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
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              style={{ overflow: "hidden", willChange: "height, opacity" }}
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
                  className="group relative w-full py-4 rounded-full text-base font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(180,83,9,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #B45309 0%, #D97706 50%, #B45309 100%)", backgroundSize: "200% 200%" }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wide">
                    {selectedPlan === "one-time"
                      ? `GIVE ME CALM FOCUS — $${PLANS["one-time"].price}`
                      : `START MY SMARTER COFFEE — $${PLANS[selectedPlan].perMonth}/MO`}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Discount auto-applied + Trust badges + Shipping notice */}
                <div className="flex items-center justify-center gap-2 mt-3 mb-3">
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-xs text-[#78716C]">Discount auto-applied at checkout</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { icon: ShieldCheck, label: "30-Day Keep-the-Bottle Guarantee" },
                    { icon: Truck, label: "Free Shipping" },
                    { icon: RotateCcw, label: "Cancel Anytime" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                      <badge.icon size={18} className="text-[#B45309]" />
                      <span className="text-[#78716C] text-[11px] font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-[#57534E]">
                    <Truck size={14} className="text-[#78716C]" />
                    <span>Ships to {userRegion} in 4–5 business days</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-xs font-semibold text-[#92400E]">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" /></span>
                    Ships within 24 hours — order today
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
                <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">Don’t Take Our Word For It</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917]">
                  Thousands Made the Switch. Here's What Happened.
                </h2>
                <p className="text-[#78716C] text-lg mt-2">4.9/5 from 2,400+ verified reviews</p>
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
              Still Thinking It Over? Good.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-12">
              Skepticism means you've been burned before. Here are the answers that convinced thousands of people to try it.
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
              A Neurologist. A Day Trader. A Mom of Three. Same Verdict.
            </h2>
            <p className="text-center text-[#78716C] text-lg mb-14 max-w-2xl mx-auto">
              Different lives. Different demands. The same result: their coffee does more now.
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
              <a
                href="#offers"
                onClick={(e) => { e.preventDefault(); document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg cursor-pointer"
              >
                Start My Smarter Coffee Ritual
              </a>
              <p className="text-xs text-[#A8A29E] mt-3">30-day keep-the-bottle guarantee · Free shipping · Cancel anytime</p>
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
            className="sticky-bottom-bar z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 pt-3"
            style={{ bottom: stickyBottomOffset > 0 ? `${stickyBottomOffset}px` : undefined }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1C1917] truncate">Upgrade Your Coffee</p>
                <p className="text-xs text-[#78716C]">From $0.90/day · Free Shipping</p>
              </div>
              <a
                href="#offers"
                className="flex-shrink-0 px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all"
              >
                Give Me Focus
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

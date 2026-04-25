/*
  BrewNectar Quiz Funnel — "Find Your Perfect Plan"
  Design: Warm cream, step-by-step, single question per screen
  Structure: 4 questions → email capture → rich results page with studies, images, social proof
  Goal: Capture email leads, educate, recommend the right plan, convert cold traffic
*/
import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Coffee,
  Zap,
  Clock,
  Sparkles,
  Star,
  ShieldCheck,
  Check,
  Truck,
  RotateCcw,
  ExternalLink,
  FlaskConical,
  Quote,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

const IMAGES = {
  botanical: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/botanical-stipple-YXHqjKQEjP2LspSUm3f2Gh.webp",
  product: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
  pour: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/lifestyle-pour-bright-Gx24uHuFzUnhzZ4wLHqXvY.webp",
  stir: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-stir-3pNJBKzkQVwxqm57DvYdyL.webp",
  lockIn: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/how-lockin-BGjMpAAVV2Cfd7diTUnZWZ.webp",
};

/* ─── Quiz questions ─── */
type QuizAnswer = {
  label: string;
  icon: React.ReactNode;
  description: string;
  value: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  subtitle: string;
  answers: QuizAnswer[];
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: "challenge",
    question: "What's your biggest daily challenge?",
    subtitle: "This helps us understand what you need most.",
    answers: [
      { label: "Afternoon energy crashes", icon: <Clock size={22} />, description: "I'm useless after 2pm", value: "energy" },
      { label: "Brain fog & poor focus", icon: <Brain size={22} />, description: "I can't concentrate on deep work", value: "focus" },
      { label: "Jitters & anxiety from coffee", icon: <Zap size={22} />, description: "Coffee wakes me up but makes me wired", value: "jitters" },
      { label: "All of the above", icon: <Sparkles size={22} />, description: "I need a complete upgrade", value: "all" },
    ],
  },
  {
    id: "coffee",
    question: "What do you drink in the morning?",
    subtitle: "BrewNectar works with any coffee you already love.",
    answers: [
      { label: "Regular drip coffee", icon: <Coffee size={22} />, description: "Classic home brew or office pot", value: "drip" },
      { label: "Espresso or latte", icon: <Coffee size={22} />, description: "Nespresso, espresso machine, or café", value: "espresso" },
      { label: "Cold brew or iced coffee", icon: <Coffee size={22} />, description: "I like it cold", value: "coldbrew" },
      { label: "I've tried mushroom coffee", icon: <Brain size={22} />, description: "Other mushroom coffee brands", value: "mushroom" },
    ],
  },
  {
    id: "tried",
    question: "Have you tried nootropics before?",
    subtitle: "No wrong answer — this helps us personalize your recommendation.",
    answers: [
      { label: "Yes, and I loved it", icon: <Star size={22} />, description: "I'm a believer, just looking for something better", value: "loved" },
      { label: "Yes, but it didn't stick", icon: <Clock size={22} />, description: "Taste, format, or cost got in the way", value: "tried" },
      { label: "No, but I'm curious", icon: <Sparkles size={22} />, description: "I've heard about nootropics and want to try", value: "curious" },
      { label: "What are nootropics?", icon: <Brain size={22} />, description: "I'm new to this — educate me", value: "new" },
    ],
  },
  {
    id: "commitment",
    question: "How long are you willing to give it?",
    subtitle: "Nootropics compound over time. More time = better results.",
    answers: [
      { label: "I want results fast", icon: <Zap size={22} />, description: "Show me what you've got in 1 bottle", value: "fast" },
      { label: "I'll commit to 30 days", icon: <Clock size={22} />, description: "One month to see if it works", value: "month" },
      { label: "I'm in for 90 days", icon: <Sparkles size={22} />, description: "I want the full compounding effect", value: "quarter" },
    ],
  },
];

/* ─── Educational "Did You Know" interstitials shown after certain questions ─── */
const INTERSTITIALS: Record<string, { title: string; body: string; icon: React.ReactNode; source?: string }> = {
  challenge: {
    title: "You're not alone",
    body: "73% of coffee drinkers report afternoon energy crashes. L-Theanine — one of BrewNectar's key ingredients — has been clinically shown to smooth out caffeine's effects and eliminate jitters.",
    icon: <FlaskConical size={20} />,
    source: "Hidese et al., Nutrients, 2019",
  },
  coffee: {
    title: "Good news — keep your coffee",
    body: "Unlike mushroom coffee powders that replace your brew, BrewNectar is a syrup you add to whatever you already drink. Your favorite espresso, cold brew, or drip — it all works.",
    icon: <Coffee size={20} />,
  },
  tried: {
    title: "Why BrewNectar is different",
    body: "Most nootropic coffees use proprietary blends that hide ingredient amounts. BrewNectar uses Cognizin® (patented citicoline) at clinically studied doses — every milligram disclosed on the label.",
    icon: <ShieldCheck size={20} />,
    source: "Nakazaki et al., The Journal of Nutrition, 2021",
  },
  commitment: {
    title: "The compounding effect",
    body: "Clinical studies show nootropic benefits increase over time. Lion's Mane showed significant cognitive improvement at 16 weeks, and Cognizin® memory gains peaked at 12 weeks. Consistency is key.",
    icon: <Sparkles size={20} />,
    source: "Mori et al., Phytotherapy Research, 2009",
  },
};

/* ─── Plan recommendation logic ─── */
type PlanRec = {
  plan: string;
  label: string;
  bottles: string;
  price: string;
  perDay: string;
  discount: string;
  reason: string;
  perks: string[];
};

function getRecommendation(answers: Record<string, string>): PlanRec {
  const commitment = answers.commitment;
  const challenge = answers.challenge;

  if (commitment === "quarter" || challenge === "all") {
    return {
      plan: "subscribe-3",
      label: "3 Bottles / Month",
      bottles: "3",
      price: "$81/mo",
      perDay: "$0.96",
      discount: "45% OFF",
      reason: challenge === "all"
        ? "Since you're tackling energy, focus, AND jitters, the 3-bottle plan gives you the best value and enough supply to use BrewNectar consistently."
        : "For a 90-day commitment, the 3-bottle plan locks in the biggest savings and ensures you never run out.",
      perks: ["Biggest savings — just $27/bottle", "Free shipping every month", "Cancel anytime — one click", "Priority access to new flavors"],
    };
  }

  if (commitment === "month") {
    return {
      plan: "subscribe-2",
      label: "2 Bottles / Month",
      bottles: "2",
      price: "$64/mo",
      perDay: "$1.14",
      discount: "35% OFF",
      reason: "A 30-day trial with 2 bottles is the sweet spot — enough to build the habit and share with a partner or keep one at the office.",
      perks: ["Great value — $32/bottle", "Free shipping every month", "Cancel anytime — one click"],
    };
  }

  return {
    plan: "subscribe-1",
    label: "1 Bottle / Month",
    bottles: "1",
    price: "$36/mo",
    perDay: "$1.29",
    discount: "27% OFF",
    reason: "One bottle gives you 30 servings — enough to feel the difference within the first week. Most people upgrade to 2 or 3 bottles after their first month.",
    perks: ["Lock in subscriber pricing", "Free shipping every month", "Cancel anytime — one click"],
  };
}

/* ─── Personalized study recommendations based on challenge ─── */
function getRelevantStudies(challenge: string) {
  const studies = {
    energy: [
      { title: "L-Theanine and Caffeine in Combination Affect Human Cognition", authors: "Kelly et al.", journal: "The Journal of Nutrition", year: 2008, finding: "L-Theanine with caffeine increased alpha-band activity and improved sustained attention.", url: "https://jn.nutrition.org/article/S0022-3166(22)09912-6/fulltext" },
      { title: "B Vitamins and the Brain: Mechanisms, Dose and Efficacy", authors: "Kennedy", journal: "Nutrients", year: 2016, finding: "B vitamins are essential cofactors in cellular energy production and neurotransmitter synthesis.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4772032/" },
    ],
    focus: [
      { title: "Citicoline and Memory Function in Healthy Older Adults", authors: "Nakazaki et al.", journal: "The Journal of Nutrition", year: 2021, finding: "12 weeks of Cognizin® improved overall memory performance, especially episodic memory.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8349115/" },
      { title: "Acute and Chronic Effects of Lion's Mane on Cognitive Function", authors: "Docherty et al.", journal: "Nutrients", year: 2023, finding: "28-day supplementation improved cognitive performance and reduced subjective stress.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/" },
    ],
    jitters: [
      { title: "Effects of L-Theanine on Stress-Related Symptoms", authors: "Hidese et al.", journal: "Nutrients", year: 2019, finding: "L-Theanine reduced stress-related symptoms and improved cognitive function scores.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6836118/" },
      { title: "Improved Attentional Performance Following Citicoline", authors: "McGlade et al.", journal: "Food and Nutrition Sciences", year: 2012, finding: "Citicoline improved attentional focus and reduced errors of commission.", url: "https://www.scirp.org/journal/paperinformation?paperid=19921" },
    ],
    all: [
      { title: "Citicoline and Memory Function in Healthy Older Adults", authors: "Nakazaki et al.", journal: "The Journal of Nutrition", year: 2021, finding: "12 weeks of Cognizin® improved overall memory performance, especially episodic memory.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8349115/" },
      { title: "Acute and Chronic Effects of Lion's Mane on Cognitive Function", authors: "Docherty et al.", journal: "Nutrients", year: 2023, finding: "28-day supplementation improved cognitive performance and reduced subjective stress.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10675414/" },
      { title: "Effects of L-Theanine on Stress-Related Symptoms", authors: "Hidese et al.", journal: "Nutrients", year: 2019, finding: "L-Theanine reduced stress-related symptoms and improved cognitive function scores.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6836118/" },
    ],
  };
  return studies[challenge as keyof typeof studies] || studies.all;
}

/* ─── Personalized review based on challenge ─── */
function getRelevantReview(challenge: string) {
  const reviews: Record<string, { name: string; text: string; detail: string }> = {
    energy: { name: "Mark T.", text: "I used to hit a wall at 2pm every single day. After two weeks with BrewNectar, my afternoons feel like my mornings.", detail: "Software Engineer, 34" },
    focus: { name: "Sarah M.", text: "I can finally sit down and do 3 hours of deep work without my mind wandering. BrewNectar changed my morning routine completely.", detail: "Writer, 29" },
    jitters: { name: "Rachel K.", text: "I love coffee but hated the anxiety it gave me. BrewNectar smooths everything out — all the energy, none of the shaking hands.", detail: "Designer, 31" },
    all: { name: "David L.", text: "Better energy, sharper focus, zero jitters. I didn't think one product could fix all three, but here we are.", detail: "Founder, 37" },
  };
  return reviews[challenge as keyof typeof reviews] || reviews.all;
}

/* ─── Progress bar ─── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current) / total) * 100;
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#78716C]">Question {current} of {total}</span>
        <span className="text-xs font-medium text-[#B45309]">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D97706] to-[#B45309] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  // Steps: 0=intro, 1=q1, 1.5=interstitial1, 2=q2, 2.5=interstitial2, 3=q3, 3.5=interstitial3, 4=q4, 5=email, 6=result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = QUESTIONS.length;

  // Map step to question index (accounting for interstitials)
  const questionSteps = [1, 2, 3, 4]; // actual question steps
  const interstitialSteps = [1.5, 2.5, 3.5, 4.5]; // after q1, q2, q3, q4
  const interstitialKeys = ["challenge", "coffee", "tried", "commitment"];

  const getQuestionIndex = (s: number) => {
    if (s === 1) return 0;
    if (s === 2) return 1;
    if (s === 3) return 2;
    if (s === 4) return 3;
    return -1;
  };

  const isQuestionStep = questionSteps.includes(step);
  const isInterstitialStep = interstitialSteps.includes(step);
  const currentQuestionIndex = getQuestionIndex(Math.ceil(step));

  const stepRef = useRef(step);
  stepRef.current = step;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setDirection(1);
    // Capture the current step synchronously before the timeout
    const currentStep = step;
    const currentQ = Math.floor(currentStep);
    setTimeout(() => {
      // Use the questionId directly — don't re-derive from step
      if (INTERSTITIALS[questionId]) {
        setStep(currentQ + 0.5); // interstitial for this question
      } else if (currentQ < 4) {
        setStep(currentQ + 1); // next question
      } else {
        setStep(5); // email step
      }
    }, 300);
  };

  const handleInterstitialContinue = () => {
    setDirection(1);
    const currentStep = stepRef.current;
    const nextQ = Math.ceil(currentStep);
    if (nextQ <= 4) {
      setStep(nextQ);
    } else {
      setStep(5); // email capture
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (isInterstitialStep) {
      setStep(Math.floor(step)); // back to the question before interstitial
    } else if (isQuestionStep && step > 1) {
      // Go back to previous interstitial or question
      const prevQ = step - 1;
      if (INTERSTITIALS[QUESTIONS[prevQ - 1]?.id]) {
        setStep(prevQ + 0.5);
      } else {
        setStep(prevQ);
      }
    } else {
      setStep(Math.max(0, step - 1));
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Results sent!", { description: "Check your inbox for your personalized recommendation." });
    }
    setDirection(1);
    setStep(6);
  };

  const handleSkipEmail = () => {
    setDirection(1);
    setStep(6);
  };

  const recommendation = getRecommendation(answers);
  const relevantStudies = getRelevantStudies(answers.challenge || "all");
  const relevantReview = getRelevantReview(answers.challenge || "all");

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  // Calculate progress for the bar (questions only, not interstitials)
  const progressQuestion = isInterstitialStep ? Math.floor(step) : isQuestionStep ? step : 0;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Minimal header */}
      <header className="bg-[#FDFBF7] border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="font-display text-xl font-bold text-[#1C1917] tracking-tight cursor-pointer">BrewNectar</span>
          </Link>
          {step > 0 && step < 6 && (
            <span className="text-xs text-[#A8A29E] uppercase tracking-widest">Quiz</span>
          )}
        </div>
      </header>

      {/* Main content */}
      <div ref={containerRef} className={`flex-1 ${step === 6 ? "" : "flex items-center justify-center"} px-4 py-8 md:py-12`}>
        <div className={`w-full ${step === 6 ? "max-w-4xl mx-auto" : "max-w-2xl"}`}>
          <AnimatePresence mode="wait" custom={direction}>
            {/* ═══ INTRO SCREEN ═══ */}
            {step === 0 && (
              <motion.div
                key="intro"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <img
                  src={IMAGES.botanical}
                  alt=""
                  className="w-24 h-24 mx-auto opacity-[0.12] mb-6 pointer-events-none select-none"
                />

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#1C1917] mb-4">
                  Find Your Perfect{" "}
                  <span className="text-gradient-warm">BrewNectar Plan</span>
                </h1>
                <p className="text-base md:text-lg text-[#57534E] leading-relaxed mb-3 max-w-lg mx-auto">
                  Answer 4 quick questions and we'll recommend the ideal plan for your goals, routine, and budget.
                </p>
                <p className="text-sm text-[#A8A29E] mb-8">Takes less than 60 seconds</p>

                <button
                  onClick={() => { setDirection(1); setStep(1); }}
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
                >
                  Start the Quiz
                  <ArrowRight size={18} />
                </button>

                <div className="flex items-center justify-center gap-6 mt-10">
                  {[
                    { icon: <ShieldCheck size={16} />, label: "No spam, ever" },
                    { icon: <Clock size={16} />, label: "60 seconds" },
                    { icon: <Sparkles size={16} />, label: "Personalized result" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 text-[#A8A29E]">
                      {item.icon}
                      <span className="text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ QUESTION SCREENS ═══ */}
            {isQuestionStep && currentQuestionIndex >= 0 && (
              <motion.div
                key={`q-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProgressBar current={progressQuestion} total={totalQuestions} />

                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-2">
                    {QUESTIONS[currentQuestionIndex].question}
                  </h2>
                  <p className="text-sm text-[#78716C]">{QUESTIONS[currentQuestionIndex].subtitle}</p>
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  {QUESTIONS[currentQuestionIndex].answers.map((answer) => {
                    const isSelected = answers[QUESTIONS[currentQuestionIndex].id] === answer.value;
                    return (
                      <motion.button
                        key={answer.value}
                        onClick={() => handleAnswer(QUESTIONS[currentQuestionIndex].id, answer.value)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-[#B45309] bg-amber-50/60 shadow-sm"
                            : "border-stone-200 bg-white hover:border-amber-200 hover:bg-amber-50/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-[#B45309] text-white" : "bg-stone-100 text-[#78716C]"
                          }`}>
                            {answer.icon}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${isSelected ? "text-[#B45309]" : "text-[#1C1917]"}`}>
                              {answer.label}
                            </p>
                            <p className="text-xs text-[#A8A29E] mt-0.5">{answer.description}</p>
                          </div>
                          {isSelected && (
                            <Check size={18} className="text-[#B45309] ml-auto shrink-0" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {step > 1 && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══ EDUCATIONAL INTERSTITIALS ═══ */}
            {isInterstitialStep && (
              <motion.div
                key={`interstitial-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                {(() => {
                  const idx = interstitialSteps.indexOf(step);
                  const key = interstitialKeys[idx];
                  const data = INTERSTITIALS[key];
                  if (!data) return null;
                  return (
                    <div className="max-w-lg mx-auto">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/40 flex items-center justify-center mx-auto mb-6 text-[#B45309]">
                        {data.icon}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-3">Did You Know?</p>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1917] mb-4">{data.title}</h3>
                      <p className="text-sm md:text-base text-[#57534E] leading-relaxed mb-2">{data.body}</p>
                      {data.source && (
                        <p className="text-[11px] text-[#A8A29E] italic mb-8">Source: {data.source}</p>
                      )}
                      {!data.source && <div className="mb-8" />}
                      <button
                        onClick={handleInterstitialContinue}
                        className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-all hover:shadow-lg"
                      >
                        Continue
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* ═══ EMAIL CAPTURE ═══ */}
            {step === 5 && (
              <motion.div
                key="email"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={24} className="text-[#B45309]" />
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-3">
                  Your recommendation is ready!
                </h2>
                <p className="text-sm text-[#78716C] mb-8 max-w-md mx-auto">
                  Enter your email to get your personalized plan + an exclusive 15% off code. Or skip to see your results now.
                </p>

                <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="flex-1 px-4 py-3 text-sm bg-white border border-stone-200 rounded-full focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 text-[#1C1917] placeholder:text-[#A8A29E]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-colors shrink-0"
                    >
                      Get Results
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleSkipEmail}
                    className="text-xs text-[#A8A29E] hover:text-[#78716C] transition-colors underline"
                  >
                    Skip — show my results now
                  </button>
                </form>

                <p className="text-[10px] text-[#A8A29E] mt-6">No spam. Unsubscribe anytime.</p>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm text-[#78716C] hover:text-[#1C1917] transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══ RICH RESULT SCREEN ═══ */}
            {step === 6 && (
              <motion.div
                key="result"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Hero recommendation */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700 mb-5">
                    <Check size={14} />
                    Your Personalized Recommendation
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-2">
                    We recommend the{" "}
                    <span className="text-gradient-warm">{recommendation.label}</span>
                  </h2>
                </div>

                {/* Two-column: Product image + Recommendation card */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* Product images */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-6 flex items-center justify-center border border-amber-100/40">
                      <img
                        src={IMAGES.product}
                        alt="BrewNectar bottle"
                        className="w-full max-w-[260px] h-auto object-contain"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl overflow-hidden border border-stone-100 aspect-square">
                        <img src={IMAGES.pour} alt="Pouring BrewNectar" className="w-full h-full object-cover" />
                      </div>
                      <div className="rounded-xl overflow-hidden border border-stone-100 aspect-square">
                        <img src={IMAGES.stir} alt="Stirring BrewNectar" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Recommendation card */}
                  <div>
                    <div className="bg-white rounded-2xl border-2 border-[#B45309]/30 shadow-warm overflow-hidden">
                      <div className="bg-gradient-to-r from-[#B45309] to-[#D97706] px-6 py-3 flex items-center justify-between">
                        <span className="text-white font-display font-bold text-sm">{recommendation.label}</span>
                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{recommendation.discount}</span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="font-display text-3xl font-bold text-[#1C1917]">{recommendation.price}</span>
                          <span className="text-sm text-[#78716C]">({recommendation.perDay}/day)</span>
                        </div>

                        <div className="bg-amber-50/60 rounded-xl p-4 mb-5 border border-amber-100/60">
                          <p className="text-sm text-[#57534E] leading-relaxed">
                            <strong className="text-[#1C1917]">Why this plan:</strong> {recommendation.reason}
                          </p>
                        </div>

                        <div className="space-y-2.5 mb-6">
                          {recommendation.perks.map((perk) => (
                            <div key={perk} className="flex items-center gap-2.5">
                              <Check size={15} className="text-emerald-600 shrink-0" />
                              <span className="text-sm text-[#57534E]">{perk}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href="/product"
                          className="block w-full py-4 rounded-full bg-[#1C1917] font-display font-bold text-base text-white text-center hover:bg-[#292524] hover:shadow-lg transition-all"
                        >
                          Start My Subscription — {recommendation.price}
                        </Link>

                        <div className="flex items-center justify-center gap-2 mt-3">
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-xs text-[#78716C]">30-day money-back guarantee</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-4 mt-5">
                      {[
                        { icon: <ShieldCheck size={18} />, label: "30-Day Guarantee" },
                        { icon: <Truck size={18} />, label: "Free Shipping" },
                        { icon: <RotateCcw size={18} />, label: "Cancel Anytime" },
                      ].map((badge) => (
                        <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                          <div className="text-[#B45309]">{badge.icon}</div>
                          <span className="text-[#78716C] text-[11px] font-medium">{badge.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── Personalized review ─── */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 mb-8">
                  <div className="flex items-start gap-4">
                    <Quote size={24} className="text-amber-200 shrink-0 mt-1" />
                    <div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-[#D97706] text-[#D97706]" />
                        ))}
                      </div>
                      <p className="text-base text-[#1C1917] leading-relaxed font-medium mb-3">
                        "{relevantReview.text}"
                      </p>
                      <p className="text-sm text-[#78716C]">
                        <strong className="text-[#1C1917]">{relevantReview.name}</strong> — {relevantReview.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── Clinical studies section ─── */}
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-2">The Science</p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[#1C1917]">
                      Backed by Peer-Reviewed Research
                    </h3>
                    <p className="text-sm text-[#78716C] mt-1">
                      Studies selected based on your specific goals
                    </p>
                  </div>

                  <div className="space-y-4">
                    {relevantStudies.map((study, i) => (
                      <div key={i} className="bg-white rounded-xl border border-stone-200 p-5 md:p-6 hover:shadow-warm transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/40 flex items-center justify-center shrink-0 mt-0.5">
                            <FlaskConical size={16} className="text-[#B45309]" />
                          </div>
                          <div className="flex-1">
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
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <Link
                      href="/#clinical-studies"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B45309] hover:text-[#92400E] transition-colors"
                    >
                      <BookOpen size={14} />
                      View all 75+ studies on our homepage
                    </Link>
                  </div>
                </div>

                {/* ─── What's in every pump ─── */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 mb-8">
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-2 text-center">What's in Every Pump</h3>
                  <p className="text-xs text-[#A8A29E] text-center mb-5">Every ingredient. Every milligram. No proprietary blends.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Cognizin® Citicoline", amount: "250mg", desc: "Patented focus compound — 20+ clinical trials", color: "bg-emerald-50 border-emerald-100" },
                      { name: "Lion's Mane 10:1", amount: "500mg", desc: "Neurogenesis support — 30+ studies", color: "bg-amber-50 border-amber-100" },
                      { name: "L-Theanine", amount: "200mg", desc: "Calm focus, no jitters — 25+ studies", color: "bg-sky-50 border-sky-100" },
                      { name: "Vitamin B6 + B12", amount: "10mg / 500mcg", desc: "Neural energy — 100+ studies", color: "bg-rose-50 border-rose-100" },
                    ].map((ing) => (
                      <div key={ing.name} className={`${ing.color} rounded-xl p-4 border`}>
                        <p className="text-xs font-bold text-[#B45309]">{ing.amount}</p>
                        <p className="text-sm font-semibold text-[#1C1917] mt-0.5">{ing.name}</p>
                        <p className="text-[11px] text-[#78716C] mt-1">{ing.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─── How it works mini-section ─── */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl p-6 md:p-8 mb-8 border border-amber-100/40">
                  <h3 className="font-display text-lg font-bold text-[#1C1917] mb-5 text-center">How It Works — 3 Steps</h3>
                  <div className="grid md:grid-cols-3 gap-5">
                    {[
                      { step: "1", title: "Brew your coffee", desc: "Any coffee you love — drip, espresso, cold brew, latte.", img: IMAGES.pour },
                      { step: "2", title: "Add one pump", desc: "Vanilla bean flavor, zero sugar. Dissolves instantly.", img: IMAGES.stir },
                      { step: "3", title: "Lock in & focus", desc: "Many users report calm energy and sharp focus within minutes.*", img: IMAGES.lockIn },
                    ].map((s) => (
                      <div key={s.step} className="text-center">
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-amber-100/40">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#B45309] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                        <p className="text-sm font-bold text-[#1C1917]">{s.title}</p>
                        <p className="text-xs text-[#78716C] mt-0.5">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─── Bottom CTA ─── */}
                <div className="bg-[#1C1917] rounded-2xl p-8 md:p-10 text-center mb-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                    Ready to Upgrade Your Coffee?
                  </h3>
                  <p className="text-stone-400 text-sm mb-6 max-w-md mx-auto">
                    Join thousands of high performers. 30-day money-back guarantee.
                  </p>
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-[#1C1917] bg-white rounded-full hover:bg-stone-100 transition-all hover:shadow-lg"
                  >
                    Get {recommendation.label} — {recommendation.price}
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Retake or browse */}
                <div className="flex items-center justify-center gap-6 pb-4">
                  <button
                    onClick={() => { setStep(0); setAnswers({}); setEmail(""); }}
                    className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors underline"
                  >
                    Retake Quiz
                  </button>
                  <Link href="/compare" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors underline">
                    See How We Compare
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-stone-200/40 py-4 text-center">
        <p className="text-xs text-[#A8A29E]">&copy; {new Date().getFullYear()} BrewNectar. These statements have not been evaluated by the FDA.</p>
      </footer>
    </div>
  );
}

/*
  BrewNectar Quiz Funnel — "Find Your Perfect Plan"
  Design: Warm cream, step-by-step, single question per screen
  Structure: 5 questions → personalized result → CTA to product page
  Goal: Capture email leads, recommend the right plan, convert cold traffic
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
} from "lucide-react";
import { toast } from "sonner";

const IMAGES = {
  botanical: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/botanical-stipple-YXHqjKQEjP2LspSUm3f2Gh.webp",
  product: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/product-hero-clean-2JryfYKGcicCXzETS5MKKr.webp",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/hero-bright-TZynNw86MPFthaxzmzbNEA.webp",
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
      { label: "I've tried mushroom coffee", icon: <Brain size={22} />, description: "Ryze, Everyday Dose, etc.", value: "mushroom" },
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

  // 3-bottle plan for long-term commitment or "all" challenges
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

  // 2-bottle plan for moderate commitment
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

  // 1-bottle for fast results / just trying
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
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = email, 6 = result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = QUESTIONS.length;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setDirection(1);
    // Auto-advance after short delay
    setTimeout(() => {
      if (step < totalQuestions) {
        setStep(step + 1);
      } else {
        setStep(5); // email step
      }
    }, 300);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(Math.max(0, step - 1));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Results sent!", { description: "Check your inbox for your personalized recommendation." });
    }
    setDirection(1);
    setStep(6); // result
  };

  const handleSkipEmail = () => {
    setDirection(1);
    setStep(6);
  };

  const recommendation = getRecommendation(answers);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      {/* Minimal header */}
      <header className="bg-[#FDFBF7] border-b border-stone-200/40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="font-display text-xl font-bold text-[#1C1917] tracking-tight cursor-pointer">BrewNectar</span>
          </Link>
          {step > 0 && step <= totalQuestions && (
            <span className="text-xs text-[#A8A29E] uppercase tracking-widest">Quiz</span>
          )}
        </div>
      </header>

      {/* Main content */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-2xl">
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
                {/* Decorative botanical */}
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
            {step >= 1 && step <= totalQuestions && (
              <motion.div
                key={`q-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProgressBar current={step} total={totalQuestions} />

                <div className="text-center mb-8">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-2">
                    {QUESTIONS[step - 1].question}
                  </h2>
                  <p className="text-sm text-[#78716C]">{QUESTIONS[step - 1].subtitle}</p>
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  {QUESTIONS[step - 1].answers.map((answer) => {
                    const isSelected = answers[QUESTIONS[step - 1].id] === answer.value;
                    return (
                      <motion.button
                        key={answer.value}
                        onClick={() => handleAnswer(QUESTIONS[step - 1].id, answer.value)}
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

                {/* Back button */}
                <div className="flex justify-center mt-8">
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

                {/* Back button */}
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

            {/* ═══ RESULT SCREEN ═══ */}
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

                {/* Recommendation card */}
                <div className="bg-white rounded-2xl border-2 border-[#B45309]/30 shadow-warm overflow-hidden max-w-lg mx-auto mb-8">
                  {/* Top banner */}
                  <div className="bg-gradient-to-r from-[#B45309] to-[#D97706] px-6 py-3 flex items-center justify-between">
                    <span className="text-white font-display font-bold text-sm">{recommendation.label}</span>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{recommendation.discount}</span>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Price row */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="font-display text-3xl font-bold text-[#1C1917]">{recommendation.price}</span>
                      <span className="text-sm text-[#78716C]">({recommendation.perDay}/day)</span>
                    </div>

                    {/* Personalized reason */}
                    <div className="bg-amber-50/60 rounded-xl p-4 mb-5 border border-amber-100/60">
                      <p className="text-sm text-[#57534E] leading-relaxed">
                        <strong className="text-[#1C1917]">Why this plan:</strong> {recommendation.reason}
                      </p>
                    </div>

                    {/* Perks */}
                    <div className="space-y-2.5 mb-6">
                      {recommendation.perks.map((perk) => (
                        <div key={perk} className="flex items-center gap-2.5">
                          <Check size={15} className="text-emerald-600 shrink-0" />
                          <span className="text-sm text-[#57534E]">{perk}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
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
                <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
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

                {/* What's inside */}
                <div className="bg-white rounded-2xl border border-stone-200 p-6 max-w-lg mx-auto mb-8">
                  <h3 className="font-display text-base font-bold text-[#1C1917] mb-4 text-center">What's in Every Pump</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Cognizin® Citicoline", amount: "250mg", desc: "Patented focus compound" },
                      { name: "Lion's Mane 10:1", amount: "500mg", desc: "Neurogenesis support" },
                      { name: "L-Theanine", amount: "200mg", desc: "Calm focus, no jitters" },
                      { name: "Vitamin B6 + B12", amount: "10mg / 500mcg", desc: "Mental energy" },
                    ].map((ing) => (
                      <div key={ing.name} className="bg-stone-50 rounded-lg p-3">
                        <p className="text-xs font-bold text-[#B45309]">{ing.amount}</p>
                        <p className="text-sm font-semibold text-[#1C1917] mt-0.5">{ing.name}</p>
                        <p className="text-[11px] text-[#A8A29E] mt-0.5">{ing.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retake or browse */}
                <div className="flex items-center justify-center gap-6">
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

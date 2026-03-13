/*
  Energy Clarity Slider — Interactive demonstration of Brain Fog → Coffee → BrewNectar
  Design: Warm cream aesthetic, CSS filter transitions, reward animation at BrewNectar state
  Placement: Below "How It Works" section on homepage
*/
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Sparkles, Check, Zap, Coffee, CloudFog } from "lucide-react";

const SLIDER_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030542116/gR7c7MRQNrXJ4W4LDnTdRi/clarity-slider-base-DUzbsAe78sBtiTeV36hpwg.webp";

interface SliderState {
  label: string;
  modeLabel: string;
  caption: string;
  blur: number;
  brightness: number;
  saturate: number;
  grayscale: number;
  contrast: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const STATES: SliderState[] = [
  {
    label: "Brain Fog",
    modeLabel: "Brain Fog Mode",
    caption: "Low focus, low energy, mental haze",
    blur: 6,
    brightness: 0.65,
    saturate: 0.3,
    grayscale: 0.6,
    contrast: 0.85,
    icon: CloudFog,
    color: "text-stone-400",
    bgColor: "bg-stone-100",
  },
  {
    label: "Coffee",
    modeLabel: "Coffee Mode",
    caption: "Quick boost, but crashes later",
    blur: 2,
    brightness: 0.9,
    saturate: 0.75,
    grayscale: 0.15,
    contrast: 1.05,
    icon: Coffee,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    label: "BrewNectar",
    modeLabel: "BrewNectar Mode",
    caption: "Smooth, clear, sustained energy",
    blur: 0,
    brightness: 1.08,
    saturate: 1.2,
    grayscale: 0,
    contrast: 1.05,
    icon: Sparkles,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getFilterValues(value: number) {
  // value: 0 = Brain Fog, 50 = Coffee, 100 = BrewNectar
  let stateA: SliderState;
  let stateB: SliderState;
  let t: number;

  if (value <= 50) {
    stateA = STATES[0];
    stateB = STATES[1];
    t = value / 50;
  } else {
    stateA = STATES[1];
    stateB = STATES[2];
    t = (value - 50) / 50;
  }

  return {
    blur: lerp(stateA.blur, stateB.blur, t),
    brightness: lerp(stateA.brightness, stateB.brightness, t),
    saturate: lerp(stateA.saturate, stateB.saturate, t),
    grayscale: lerp(stateA.grayscale, stateB.grayscale, t),
    contrast: lerp(stateA.contrast, stateB.contrast, t),
  };
}

function getActiveStateIndex(value: number): number {
  if (value < 33) return 0;
  if (value < 67) return 1;
  return 2;
}

/* ─── Sparkle Particles ─── */
function SparkleParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.6,
    size: 3 + Math.random() * 4,
    duration: 0.8 + Math.random() * 0.6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        >
          <Sparkles className="text-amber-400" style={{ width: p.size, height: p.size }} />
        </motion.div>
      ))}
    </div>
  );
}

export default function EnergyClaritySlider() {
  const [value, setValue] = useState(50);
  const [hasReachedBrewNectar, setHasReachedBrewNectar] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const activeIndex = getActiveStateIndex(value);
  const activeState = STATES[activeIndex];
  const filters = getFilterValues(value);
  const isBrewNectar = activeIndex === 2;

  useEffect(() => {
    if (isBrewNectar && !hasReachedBrewNectar) {
      setHasReachedBrewNectar(true);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1500);
    }
    if (!isBrewNectar) {
      setHasReachedBrewNectar(false);
    }
  }, [isBrewNectar, hasReachedBrewNectar]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const filterString = `blur(${filters.blur}px) brightness(${filters.brightness}) saturate(${filters.saturate}) grayscale(${filters.grayscale}) contrast(${filters.contrast})`;

  // Calculate slider fill percentage for the track gradient
  const fillPercent = value;

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-3">
            Experience the Difference
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] mb-4">
            Energy Clarity Slider
          </h2>
          <p className="text-[#78716C] text-lg max-w-2xl mx-auto">
            Drag the slider to see how BrewNectar transforms your mental clarity compared to brain fog and regular coffee.
          </p>
        </div>

        {/* Dynamic Mode Label */}
        <div className="flex justify-center mb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState.modeLabel}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold ${activeState.bgColor} ${activeState.color} transition-colors duration-300`}
            >
              <activeState.icon className="w-4 h-4" />
              {activeState.modeLabel}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Container */}
        <div className="relative mb-8 overflow-hidden">
          {/* Glow ring for BrewNectar state */}
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none z-0"
            animate={{
              boxShadow: isBrewNectar
                ? "0 0 40px 8px rgba(217, 119, 6, 0.25), 0 0 80px 16px rgba(217, 119, 6, 0.1)"
                : "0 0 0px 0px rgba(217, 119, 6, 0)",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg z-[1]">
            <motion.img
              src={SLIDER_IMAGE}
              alt="Energy clarity demonstration"
              className="w-full block object-cover h-[260px] sm:h-[340px] md:h-[420px] lg:h-auto"
              style={{ filter: filterString }}
              transition={{ duration: 0.05 }}
            />

            {/* Sparkle particles on reaching BrewNectar */}
            {showSparkles && <SparkleParticles />}

            {/* Gradient overlay that fades as clarity increases */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(120,113,108,${0.3 * (1 - value / 100)}) 0%, transparent 60%)`,
              }}
            />
          </div>

          {/* Caption */}
          <div className="mt-4 text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={isBrewNectar && hasReachedBrewNectar ? "unlocked" : activeState.caption}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className={`text-base md:text-lg font-medium ${isBrewNectar ? "text-amber-700" : "text-[#78716C]"}`}
              >
                {isBrewNectar && hasReachedBrewNectar ? (
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Focus Unlocked
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </span>
                ) : (
                  <>
                    <span className="font-bold">{activeState.label}</span> — {activeState.caption}
                  </>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Slider */}
        <div className="relative px-2 md:px-4">
          {/* Custom slider track background */}
          <div className="relative h-12 flex items-center">
            <div className="absolute inset-x-0 h-2.5 rounded-full bg-stone-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${fillPercent}%`,
                  background: fillPercent > 67
                    ? "linear-gradient(90deg, #D6D3D1, #D97706, #B45309)"
                    : fillPercent > 33
                    ? "linear-gradient(90deg, #D6D3D1, #D97706)"
                    : "linear-gradient(90deg, #D6D3D1, #A8A29E)",
                }}
              />
            </div>
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleChange}
              className="absolute inset-x-0 w-full h-12 opacity-0 cursor-pointer z-10"
              aria-label="Energy clarity slider"
            />
            {/* Custom thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-[5]"
              style={{ left: `calc(${fillPercent}% - 14px)` }}
            >
              <motion.div
                className={`w-7 h-7 rounded-full border-[3px] shadow-md transition-colors duration-300 ${
                  isBrewNectar
                    ? "bg-amber-600 border-amber-700 shadow-amber-300/50"
                    : activeIndex === 1
                    ? "bg-amber-500 border-amber-600"
                    : "bg-stone-400 border-stone-500"
                }`}
                animate={isBrewNectar ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Slider Labels */}
          <div className="flex justify-between mt-1 px-0.5">
            {STATES.map((state, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={state.label}
                  onClick={() => setValue(i === 0 ? 0 : i === 1 ? 50 : 100)}
                  className={`flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                    isActive ? state.color + " font-bold" : "text-stone-400"
                  }`}
                >
                  <state.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {state.label}
                  {isActive && i === 2 && hasReachedBrewNectar && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 md:mt-14">
          <motion.div
            animate={isBrewNectar && hasReachedBrewNectar ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/product"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#B45309] hover:bg-[#92400E] text-white font-display font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5" />
              Unlock Clear Energy
            </Link>
          </motion.div>
          <p className="text-[#A8A29E] text-sm mt-3">
            Join 12,000+ members experiencing sustained clarity
          </p>
        </div>
      </div>
    </section>
  );
}

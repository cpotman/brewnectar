/*
  BrewNectar About Page — Warm Light Theme
  Clean, simple, brand-aligned
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#D97706] mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] mb-6 leading-tight">
            Better Focus Starts With Better Ingredients.
          </h1>
          <p className="text-lg md:text-xl text-[#57534E] leading-relaxed max-w-2xl mx-auto">
            BrewNectar was born from a simple frustration: coffee gives you energy, but it can't give you focus. We set out to change that — without changing your morning routine.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-5">
                One Pump. Four Nootropics. Zero Compromise.
              </h2>
              <p className="text-[#57534E] leading-relaxed mb-4">
                We spent over a year formulating a nootropic syrup that actually tastes good — smooth vanilla bean, no earthy mushroom flavor, no chalky aftertaste. Every ingredient is research-backed and transparently dosed.
              </p>
              <p className="text-[#57534E] leading-relaxed">
                The result is a product you genuinely look forward to adding to your morning coffee. Not another pill. Not another powder. Just one pump that fits into what you already do.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-10 border border-amber-100/60">
              <div className="space-y-6">
                <div>
                  <p className="font-display font-bold text-3xl text-[#B45309]">4</p>
                  <p className="text-sm text-[#78716C] mt-1">Research-backed nootropic ingredients</p>
                </div>
                <div className="border-t border-amber-200/40 pt-6">
                  <p className="font-display font-bold text-3xl text-[#B45309]">0g</p>
                  <p className="text-sm text-[#78716C] mt-1">Sugar per serving</p>
                </div>
                <div className="border-t border-amber-200/40 pt-6">
                  <p className="font-display font-bold text-3xl text-[#B45309]">30</p>
                  <p className="text-sm text-[#78716C] mt-1">Servings per bottle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-10 text-center">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Transparency",
                desc: "Full label disclosure. Every ingredient, every dose — no proprietary blends, no hidden fillers.",
              },
              {
                title: "Quality",
                desc: "Third-party tested, GMP-certified facility, made in the USA. We don't cut corners.",
              },
              {
                title: "Simplicity",
                desc: "One pump into your coffee. No blender, no pills, no new habit to build. It just works.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-stone-100 p-6 md:p-7 shadow-warm">
                <h3 className="font-display font-bold text-lg text-[#1C1917] mb-2">{v.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50 border-t border-amber-100/40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1C1917] mb-4">
            Ready to Upgrade Your Morning?
          </h2>
          <p className="text-[#57534E] mb-8">
            Try BrewNectar risk-free with our 30-day keep-the-bottle guarantee.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1C1917] text-white font-semibold rounded-full hover:bg-[#292524] transition-colors shadow-warm-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/*
  BrewNectar Footer — Liquid Intelligence Design
  Dark navy base with violet accents, minimal and premium
*/
import { Link } from "wouter";
import { toast } from "sonner";

export default function Footer() {
  return (
    <footer className="relative bg-navy pt-16 pb-8 border-t border-white/5">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet to-rose-neon flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white">BrewNectar</span>
            </div>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed mb-6">
              Nootropic coffee syrup designed for calm focus, faster recall, and deep work. Zero sugar. Science-backed. Delicious.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Twitter", "TikTok"].map((social) => (
                <button
                  key={social}
                  onClick={() => toast("Coming soon", { description: `${social} page launching soon.` })}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
                >
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {[
                { label: "Shop", href: "/product" },
                { label: "Ingredients", href: "/#ingredients" },
                { label: "Reviews", href: "/#social-proof" },
                { label: "FAQ", href: "/#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {["About", "Contact", "Privacy Policy", "Terms"].map((label) => (
                <li key={label}>
                  <button
                  onClick={() => toast("Coming soon", { description: `${label} page launching soon.` })}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} BrewNectar. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}

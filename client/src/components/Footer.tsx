/*
  BrewNectar Footer — Warm Light Theme
  Cream background, warm accents, clean typography
*/
import { Link } from "wouter";
import { toast } from "sonner";

/* Inline SVG icons for social platforms */
function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
    </svg>
  );
}

const SOCIAL_ICONS = [
  { name: "Instagram", icon: InstagramIcon },
  { name: "Twitter", icon: TwitterIcon },
  { name: "TikTok", icon: TikTokIcon },
];

export default function Footer() {
  return (
    <footer className="bg-[#FDFAF5] border-t border-stone-200/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-bold text-xl text-[#1C1917] mb-3">BrewNectar</h3>
            <p className="text-sm text-[#78716C] leading-relaxed mb-5">
              One pump turns your coffee into a cognitive upgrade. Calm focus. Faster recall. No crash.
            </p>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => toast("Coming soon", { description: `${name} page launching soon.` })}
                  className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#78716C] hover:text-[#B45309] hover:border-amber-200 hover:bg-amber-50 transition-all"
                  aria-label={name}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-[#1C1917] uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "Shop", href: "/product" },
                { label: "Ingredients", href: "/#ingredients" },
                { label: "Reviews", href: "/#social-proof" },
                { label: "FAQ", href: "/#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-[#78716C] hover:text-[#B45309] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-[#1C1917] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Contact", "Privacy Policy", "Terms"].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => toast("Coming soon", { description: `${label} page launching soon.` })}
                    className="text-sm text-[#78716C] hover:text-[#B45309] transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold text-sm text-[#1C1917] uppercase tracking-wider mb-4">Stay in the loop</h4>
            <p className="text-sm text-[#78716C] mb-4">Get 10% off your first order plus brain performance tips from our research team.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-stone-200 rounded-full focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 text-[#1C1917] placeholder:text-[#A8A29E]"
              />
              <button
                onClick={() => toast("Subscribed!", { description: "Welcome to the BrewNectar community." })}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1917] rounded-full hover:bg-[#292524] transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A8A29E]">&copy; {new Date().getFullYear()} BrewNectar. All rights reserved.</p>
          <p className="text-xs text-[#A8A29E]">These statements have not been evaluated by the FDA.</p>
        </div>
      </div>
    </footer>
  );
}

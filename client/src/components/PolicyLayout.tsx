/*
  Shared layout for policy/legal pages
  Clean, readable, consistent with BrewNectar warm theme
*/
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1C1917] mb-3">
              {title}
            </h1>
            <p className="text-sm text-[#A8A29E]">Last updated: {lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-[#1C1917] prose-p:text-[#57534E] prose-p:leading-relaxed prose-li:text-[#57534E] prose-strong:text-[#1C1917] prose-a:text-[#B45309] prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

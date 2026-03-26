import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Star } from "lucide-react";

interface VideoCardProps {
  videoSrc: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
}

export default function VideoCard({ videoSrc, name, title, quote, rating }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-stone-50 border-2 border-amber-200 rounded-2xl overflow-hidden hover:shadow-warm transition-all duration-300 ring-1 ring-amber-100">
      <div
        className="relative aspect-[9/12] overflow-hidden group cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
        />

        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause size={22} className="text-[#1C1917]" />
            ) : (
              <Play size={22} className="text-[#1C1917] ml-1" fill="#1C1917" />
            )}
          </div>
        </div>

        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        <div className="absolute top-3 left-3">
          <div className="bg-[#D97706] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            Real Review
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-white text-xs font-semibold">
              @{name.toLowerCase().replace(/\s/g, "")}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-0.5 mb-2">
          {[...Array(rating)].map((_, j) => (
            <Star key={j} size={14} className="fill-[#D97706] text-[#D97706]" />
          ))}
        </div>
        <p className="text-sm text-[#44403C] leading-relaxed mb-3 line-clamp-3">
          &ldquo;{quote}&rdquo;
        </p>
        <div>
          <p className="text-sm font-semibold text-[#1C1917]">{name}</p>
          <p className="text-xs text-[#A8A29E]">{title}</p>
        </div>
      </div>
    </div>
  );
}

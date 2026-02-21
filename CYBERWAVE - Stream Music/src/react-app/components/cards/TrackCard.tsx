import { Play, Pause, MoreHorizontal } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
}

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  onPlay: () => void;
  index: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function TrackCard({ track, isPlaying, isCurrentTrack, onPlay, index }: TrackCardProps) {
  return (
    <div
      className={`group grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2 rounded items-center transition-all duration-200 ${
        isCurrentTrack
          ? "bg-primary/10 border border-primary/30"
          : "hover:bg-muted/50 border border-transparent"
      }`}
    >
      {/* Index / Play Button */}
      <div className="w-8 flex items-center justify-center">
        <span className={`text-sm font-mono ${isCurrentTrack ? "text-primary" : "text-muted-foreground"} group-hover:hidden`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          onClick={onPlay}
          className="hidden group-hover:flex items-center justify-center text-foreground"
        >
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          <img
            src={track.cover}
            alt={track.album}
            className="w-10 h-10 rounded object-cover"
          />
          {isCurrentTrack && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
              <div className="flex gap-0.5 items-end h-4">
                <span className="w-1 bg-primary animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                <span className="w-1 bg-primary animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                <span className="w-1 bg-primary animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                <span className="w-1 bg-primary animate-pulse" style={{ height: "80%", animationDelay: "450ms" }} />
              </div>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isCurrentTrack ? "neon-text-cyan" : ""}`}>
            {track.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
      </div>

      {/* Album */}
      <p className="text-sm text-muted-foreground truncate hover:underline cursor-pointer">
        {track.album}
      </p>

      {/* Duration & More */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground font-mono">
          {formatTime(track.duration)}
        </span>
        <button className="p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

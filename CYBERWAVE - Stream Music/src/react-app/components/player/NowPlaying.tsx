import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Maximize2, Heart, Download } from "lucide-react";
import { Slider } from "@/react-app/components/ui/slider";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
}

interface NowPlayingProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number) => void;
  onVolumeChange: (value: number) => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function NowPlaying({
  currentTrack,
  isPlaying,
  progress,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: NowPlayingProps) {
  if (!currentTrack) {
    return (
      <footer className="h-24 bg-card/80 backdrop-blur-xl border-t border-primary/20 flex items-center justify-center">
        <p className="text-muted-foreground text-sm tracking-wide">Select a track to start playing</p>
      </footer>
    );
  }

  const currentTime = (progress / 100) * currentTrack.duration;

  return (
    <footer className="h-24 bg-card/80 backdrop-blur-xl border-t border-primary/20 px-4 grid grid-cols-3 items-center">
      {/* Track Info */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <img
            src={currentTrack.cover}
            alt={currentTrack.album}
            className="w-14 h-14 rounded object-cover border border-primary/30"
          />
          <div className="absolute inset-0 bg-primary/20 rounded opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate hover:underline cursor-pointer">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-2 ml-2">
          <button className="p-1.5 text-muted-foreground hover:text-secondary transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={onPrevious}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={onPlayPause}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform neon-border-cyan border"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-background" />
            ) : (
              <Play className="w-5 h-5 text-background ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-[10px] text-muted-foreground w-10 text-right font-mono">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[progress]}
            onValueChange={(v) => onSeek(v[0])}
            max={100}
            step={0.1}
            className="flex-1 cursor-pointer"
          />
          <span className="text-[10px] text-muted-foreground w-10 font-mono">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={(v) => onVolumeChange(v[0])}
            max={100}
            step={1}
            className="w-24 cursor-pointer"
          />
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

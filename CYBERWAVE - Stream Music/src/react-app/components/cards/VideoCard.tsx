import { Play, Clock, Eye } from "lucide-react";
import type { Video } from "@/react-app/data/sampleVideos";

interface VideoCardProps {
  video: Video;
  onPlay: () => void;
  size?: "large" | "medium" | "small";
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const categoryColors: Record<string, string> = {
  "music-video": "bg-secondary/20 text-secondary border-secondary/30",
  live: "bg-red-500/20 text-red-400 border-red-500/30",
  visualizer: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  documentary: "bg-accent/20 text-accent border-accent/30",
};

const categoryLabels: Record<string, string> = {
  "music-video": "Music Video",
  live: "Live",
  visualizer: "Visualizer",
  documentary: "Documentary",
};

export function VideoCard({ video, onPlay, size = "medium" }: VideoCardProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div
      onClick={onPlay}
      className={`group cursor-pointer ${isSmall ? "flex gap-3" : ""}`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden rounded-lg ${
          isLarge ? "aspect-video" : isSmall ? "w-40 h-24 flex-shrink-0" : "aspect-video"
        }`}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center neon-border-cyan border transform scale-75 group-hover:scale-100 transition-transform"
            style={{ boxShadow: "0 0 30px hsl(180 100% 50% / 0.5)" }}
          >
            <Play className="w-7 h-7 text-background ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs font-mono text-white flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDuration(video.duration)}
        </div>

        {/* Category badge */}
        <div
          className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide border ${
            categoryColors[video.category]
          }`}
        >
          {categoryLabels[video.category]}
        </div>
      </div>

      {/* Info */}
      <div className={`${isSmall ? "flex-1 min-w-0" : "mt-3"}`}>
        <h3
          className={`font-medium truncate group-hover:neon-text-cyan transition-all ${
            isLarge ? "text-lg" : "text-sm"
          }`}
        >
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {video.artist}
        </p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views}
          </span>
          <span>{video.uploadedAt}</span>
        </div>
      </div>
    </div>
  );
}

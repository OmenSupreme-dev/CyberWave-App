import { Play } from "lucide-react";

interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: number;
}

interface AlbumCardProps {
  album: Album;
  onPlay: () => void;
}

export function AlbumCard({ album, onPlay }: AlbumCardProps) {
  return (
    <div className="group p-4 rounded-lg bg-card/50 hover:bg-card transition-all duration-300 cursor-pointer border border-transparent hover:neon-border-cyan">
      <div className="relative mb-4">
        <img
          src={album.cover}
          alt={album.title}
          className="w-full aspect-square object-cover rounded shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-105"
          style={{
            boxShadow: "0 0 20px hsl(180 100% 50% / 0.5)",
          }}
        >
          <Play className="w-5 h-5 text-background ml-0.5" />
        </button>
      </div>
      <h3 className="font-medium text-sm truncate mb-1 group-hover:neon-text-cyan transition-all">
        {album.title}
      </h3>
      <p className="text-xs text-muted-foreground truncate">
        {album.artist} • {album.year}
      </p>
    </div>
  );
}

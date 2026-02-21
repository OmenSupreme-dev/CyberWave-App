import { useState, useEffect } from "react";
import { Sidebar } from "@/react-app/components/layout/Sidebar";
import { NowPlaying } from "@/react-app/components/player/NowPlaying";
import { TrackCard } from "@/react-app/components/cards/TrackCard";
import { AlbumCard } from "@/react-app/components/cards/AlbumCard";
import { InstallBanner } from "@/react-app/components/layout/InstallBanner";
import { VideosPage } from "@/react-app/pages/VideosPage";
import { sampleTracks, sampleAlbums, type Track } from "@/react-app/data/sampleTracks";
import { ScrollArea } from "@/react-app/components/ui/scroll-area";
import { Search, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.1;
        });
      }, currentTrack.duration);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTrack]);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = sampleTracks.findIndex((t) => t.id === currentTrack.id);
      const nextTrack = sampleTracks[(currentIndex + 1) % sampleTracks.length];
      setCurrentTrack(nextTrack);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentTrack) {
      const currentIndex = sampleTracks.findIndex((t) => t.id === currentTrack.id);
      const prevTrack = sampleTracks[(currentIndex - 1 + sampleTracks.length) % sampleTracks.length];
      setCurrentTrack(prevTrack);
      setProgress(0);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background cyber-grid overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-50" />
      
      {/* PWA Install Banner */}
      <InstallBanner />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 overflow-hidden">
          {activeView === "videos" ? (
            <VideosPage />
          ) : (
            <ScrollArea className="h-full">
              <div className="p-8">
                {/* Header */}
                <header className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold tracking-wider mb-1">
                      <span className="neon-text-cyan">Welcome</span> to{" "}
                      <span className="neon-text-magenta">Night City</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tracks, artists, albums..."
                      className="w-80 pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-primary/20 text-sm focus:outline-none focus:neon-border-cyan transition-all"
                    />
                  </div>
                </header>

                {/* Featured Albums */}
                <section className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <h2 className="text-xl font-bold tracking-wide">Featured Albums</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {sampleAlbums.map((album) => (
                      <AlbumCard
                        key={album.id}
                        album={album}
                        onPlay={() => {
                          const albumTrack = sampleTracks.find((t) => t.album === album.title);
                          if (albumTrack) handlePlayTrack(albumTrack);
                        }}
                      />
                    ))}
                  </div>
                </section>

                {/* Recent Tracks */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-wide">Recent Tracks</h2>
                  </div>
                  <div className="bg-card/30 rounded-lg border border-primary/10 overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-primary/10 text-xs text-muted-foreground uppercase tracking-wider">
                      <span className="w-8 text-center">#</span>
                      <span>Title</span>
                      <span>Album</span>
                      <span className="pr-10">Duration</span>
                    </div>
                    <div className="divide-y divide-primary/5">
                      {sampleTracks.map((track, index) => (
                        <TrackCard
                          key={track.id}
                          track={track}
                          index={index}
                          isPlaying={isPlaying}
                          isCurrentTrack={currentTrack?.id === track.id}
                          onPlay={() => handlePlayTrack(track)}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </ScrollArea>
          )}
        </main>
      </div>

      <NowPlaying
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={setProgress}
        onVolumeChange={setVolume}
      />
    </div>
  );
}

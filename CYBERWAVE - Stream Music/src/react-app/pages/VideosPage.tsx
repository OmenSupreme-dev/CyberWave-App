import { useState } from "react";
import { VideoCard } from "@/react-app/components/cards/VideoCard";
import { VideoPlayer } from "@/react-app/components/video/VideoPlayer";
import { sampleVideos, videoCategories, type Video } from "@/react-app/data/sampleVideos";
import { ScrollArea } from "@/react-app/components/ui/scroll-area";
import { Film, TrendingUp, Sparkles } from "lucide-react";

export function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const filteredVideos =
    activeCategory === "all"
      ? sampleVideos
      : sampleVideos.filter((v) => v.category === activeCategory);

  const featuredVideo = sampleVideos[0];

  const handlePlayVideo = (video: Video) => {
    setCurrentVideo(video);
  };

  const handleClosePlayer = () => {
    setCurrentVideo(null);
  };

  const handleNextVideo = () => {
    if (currentVideo) {
      const currentIndex = sampleVideos.findIndex((v) => v.id === currentVideo.id);
      const nextVideo = sampleVideos[(currentIndex + 1) % sampleVideos.length];
      setCurrentVideo(nextVideo);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideo) {
      const currentIndex = sampleVideos.findIndex((v) => v.id === currentVideo.id);
      const prevVideo = sampleVideos[(currentIndex - 1 + sampleVideos.length) % sampleVideos.length];
      setCurrentVideo(prevVideo);
    }
  };

  return (
    <>
      <ScrollArea className="h-full">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Videos</h1>
              <p className="text-sm text-muted-foreground">Music videos, live performances & more</p>
            </div>
          </div>

          {/* Featured Video */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold tracking-wide">Featured</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VideoCard
                  video={featuredVideo}
                  onPlay={() => handlePlayVideo(featuredVideo)}
                  size="large"
                />
              </div>
              <div className="space-y-4">
                {sampleVideos.slice(1, 4).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={() => handlePlayVideo(video)}
                    size="small"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {videoCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-background neon-border-cyan border"
                    : "bg-muted/50 text-foreground hover:bg-muted border border-transparent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* All Videos */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold tracking-wide">
                {activeCategory === "all" ? "All Videos" : videoCategories.find(c => c.id === activeCategory)?.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onPlay={() => handlePlayVideo(video)}
                />
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Video Player Modal */}
      {currentVideo && (
        <VideoPlayer
          video={currentVideo}
          onClose={handleClosePlayer}
          onNext={handleNextVideo}
          onPrevious={handlePreviousVideo}
        />
      )}
    </>
  );
}

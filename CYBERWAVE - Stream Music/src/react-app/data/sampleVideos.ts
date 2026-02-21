export interface Video {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  views: string;
  uploadedAt: string;
  category: "music-video" | "live" | "documentary" | "visualizer";
}

// Sample videos with Cyberpunk-themed content
export const sampleVideos: Video[] = [
  {
    id: "v1",
    title: "Neon Dreams - Official Music Video",
    artist: "Chrome Shadows",
    thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 596,
    views: "2.4M",
    uploadedAt: "2077-03-15",
    category: "music-video",
  },
  {
    id: "v2",
    title: "Digital Rain - Visualizer",
    artist: "Synth Collective",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: 653,
    views: "1.8M",
    uploadedAt: "2076-11-22",
    category: "visualizer",
  },
  {
    id: "v3",
    title: "Live at Night City Arena",
    artist: "Voltage",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: 15,
    views: "5.1M",
    uploadedAt: "2077-01-08",
    category: "live",
  },
  {
    id: "v4",
    title: "The Making of System Override",
    artist: "Neural Link",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: 15,
    views: "890K",
    uploadedAt: "2076-08-30",
    category: "documentary",
  },
  {
    id: "v5",
    title: "Ghost in the Wire - Extended Cut",
    artist: "Data Stream",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: 60,
    views: "3.2M",
    uploadedAt: "2077-02-14",
    category: "music-video",
  },
  {
    id: "v6",
    title: "Hologram Heart - Neon Remix",
    artist: "Neon Pulse",
    thumbnail: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=640&h=360&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: 15,
    views: "1.5M",
    uploadedAt: "2076-12-01",
    category: "visualizer",
  },
];

export const videoCategories = [
  { id: "all", label: "All Videos" },
  { id: "music-video", label: "Music Videos" },
  { id: "live", label: "Live Performances" },
  { id: "visualizer", label: "Visualizers" },
  { id: "documentary", label: "Documentaries" },
];

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: number;
}

// Sample tracks with Cyberpunk-themed names and royalty-free placeholder covers
export const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Neon Dreams",
    artist: "Chrome Shadows",
    album: "Night City Beats",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop",
    duration: 245,
  },
  {
    id: "2",
    title: "Digital Rain",
    artist: "Synth Collective",
    album: "Binary Sunset",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=300&fit=crop",
    duration: 198,
  },
  {
    id: "3",
    title: "Cyber Highway",
    artist: "Voltage",
    album: "Electric Dreams",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop",
    duration: 312,
  },
  {
    id: "4",
    title: "Midnight Protocol",
    artist: "Neural Link",
    album: "System Override",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
    duration: 276,
  },
  {
    id: "5",
    title: "Ghost in the Wire",
    artist: "Data Stream",
    album: "Phantom Code",
    cover: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=300&fit=crop",
    duration: 223,
  },
  {
    id: "6",
    title: "Synthetic Soul",
    artist: "Chrome Shadows",
    album: "Night City Beats",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop",
    duration: 287,
  },
  {
    id: "7",
    title: "Hologram Heart",
    artist: "Neon Pulse",
    album: "Augmented Reality",
    cover: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop",
    duration: 256,
  },
  {
    id: "8",
    title: "Firewall",
    artist: "Zero Day",
    album: "Breach Protocol",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    duration: 334,
  },
];

export const sampleAlbums: Album[] = [
  {
    id: "a1",
    title: "Night City Beats",
    artist: "Chrome Shadows",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop",
    year: 2077,
  },
  {
    id: "a2",
    title: "Binary Sunset",
    artist: "Synth Collective",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=300&fit=crop",
    year: 2076,
  },
  {
    id: "a3",
    title: "Electric Dreams",
    artist: "Voltage",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop",
    year: 2077,
  },
  {
    id: "a4",
    title: "System Override",
    artist: "Neural Link",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
    year: 2075,
  },
  {
    id: "a5",
    title: "Phantom Code",
    artist: "Data Stream",
    cover: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=300&fit=crop",
    year: 2077,
  },
  {
    id: "a6",
    title: "Augmented Reality",
    artist: "Neon Pulse",
    cover: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=300&h=300&fit=crop",
    year: 2076,
  },
];

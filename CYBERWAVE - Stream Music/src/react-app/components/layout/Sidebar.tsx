import { Home, Search, Library, PlusSquare, Heart, Download, Video, Settings, Music2 } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "library", icon: Library, label: "Your Library" },
  ];

  const actionItems = [
    { id: "create", icon: PlusSquare, label: "Create Playlist" },
    { id: "liked", icon: Heart, label: "Liked Songs" },
    { id: "downloads", icon: Download, label: "Downloads" },
    { id: "videos", icon: Video, label: "Videos" },
  ];

  return (
    <aside className="w-64 bg-card/50 backdrop-blur-xl border-r border-primary/20 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-primary/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-cyan-400 via-primary to-secondary flex items-center justify-center neon-border-cyan border">
            <Music2 className="w-6 h-6 text-background" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider neon-text-cyan">CYBERWAVE</h1>
            <p className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Stream</p>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded transition-all duration-200 group ${
                isActive
                  ? "bg-primary/20 neon-border-cyan border"
                  : "hover:bg-primary/10 border border-transparent"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
              <span className={`text-sm font-medium tracking-wide ${isActive ? "neon-text-cyan" : "text-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-4" />

      {/* Actions */}
      <nav className="p-4 space-y-1 flex-1">
        {actionItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded transition-all duration-200 group ${
                isActive
                  ? "bg-secondary/20 neon-border-magenta border"
                  : "hover:bg-secondary/10 border border-transparent"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"}`} />
              <span className={`text-sm font-medium tracking-wide ${isActive ? "neon-text-magenta" : "text-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-primary/10">
        <button
          onClick={() => onViewChange("settings")}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded transition-all duration-200 group ${
            activeView === "settings"
              ? "bg-accent/20 border border-accent/50"
              : "hover:bg-accent/10 border border-transparent"
          }`}
        >
          <Settings className={`w-5 h-5 ${activeView === "settings" ? "text-accent" : "text-muted-foreground group-hover:text-accent"}`} />
          <span className={`text-sm font-medium tracking-wide ${activeView === "settings" ? "neon-text-yellow" : "text-foreground"}`}>
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
}

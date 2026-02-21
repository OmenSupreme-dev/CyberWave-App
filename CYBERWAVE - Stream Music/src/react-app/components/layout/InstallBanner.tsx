import { Download, X, Wifi, WifiOff } from "lucide-react";
import { useInstallPrompt } from "@/react-app/hooks/useInstallPrompt";
import { useServiceWorker } from "@/react-app/hooks/useServiceWorker";
import { useState } from "react";

export function InstallBanner() {
  const { isInstallable, isInstalled, promptInstall, canPrompt } = useInstallPrompt();
  const { isOnline } = useServiceWorker();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const handleInstall = async () => {
    const result = await promptInstall();
    if (result.isIOS) {
      setShowIOSInstructions(true);
    }
  };

  if (isInstalled || dismissed) return null;

  return (
    <>
      {/* Online/Offline indicator */}
      <div
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          isOnline
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3" />
            Offline
          </>
        )}
      </div>

      {/* Install banner */}
      {isInstallable && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-card/95 backdrop-blur-xl border border-primary/30 neon-border-cyan rounded-lg p-4 shadow-2xl max-w-md w-[calc(100%-2rem)]">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-secondary flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm neon-text-cyan mb-1">Install CYBERWAVE</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Install the app for offline access, faster loading, and a native experience on your device.
              </p>
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-primary text-background text-sm font-medium rounded hover:bg-primary/90 transition-colors"
              >
                {canPrompt ? "Install App" : "How to Install"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS installation instructions modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-card border border-primary/30 rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-bold text-lg neon-text-cyan mb-4">Install on iOS</h3>
            <ol className="space-y-3 text-sm text-muted-foreground mb-4">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                Tap the Share button in Safari (square with arrow)
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                Scroll down and tap "Add to Home Screen"
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                Tap "Add" to install CYBERWAVE
              </li>
            </ol>
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="w-full px-4 py-2 bg-primary text-background text-sm font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

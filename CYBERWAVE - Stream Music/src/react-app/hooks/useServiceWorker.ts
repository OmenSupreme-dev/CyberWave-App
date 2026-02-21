import { useEffect, useState, useCallback } from 'react';

interface DownloadState {
  [id: string]: 'downloading' | 'complete' | 'error';
}

export function useServiceWorker() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [downloadedUrls, setDownloadedUrls] = useState<string[]>([]);
  const [downloadState, setDownloadState] = useState<DownloadState>({});

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
          setSwRegistration(registration);
          
          // Request list of cached media
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'GET_CACHED_MEDIA' });
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'DOWNLOAD_COMPLETE') {
          setDownloadedUrls((prev) => [...new Set([...prev, event.data.url])]);
          setDownloadState((prev) => ({ ...prev, [event.data.id]: 'complete' }));
        }
        if (event.data.type === 'DOWNLOAD_ERROR') {
          setDownloadState((prev) => ({ ...prev, [event.data.id]: 'error' }));
        }
        if (event.data.type === 'CACHED_MEDIA_LIST') {
          setDownloadedUrls(event.data.urls);
        }
      });
    }

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadMedia = useCallback((url: string, id: string) => {
    if (navigator.serviceWorker.controller) {
      setDownloadState((prev) => ({ ...prev, [id]: 'downloading' }));
      navigator.serviceWorker.controller.postMessage({
        type: 'DOWNLOAD_MEDIA',
        url,
        id,
      });
    }
  }, []);

  const deleteMedia = useCallback((url: string) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'DELETE_MEDIA',
        url,
      });
      setDownloadedUrls((prev) => prev.filter((u) => u !== url));
    }
  }, []);

  const isDownloaded = useCallback((url: string) => {
    return downloadedUrls.includes(url);
  }, [downloadedUrls]);

  return {
    isOnline,
    swRegistration,
    downloadedUrls,
    downloadState,
    downloadMedia,
    deleteMedia,
    isDownloaded,
  };
}

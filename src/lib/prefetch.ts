// This module is designed to be imported once in the main app layout.
// It automatically detects and prefetches internal links for faster navigation.

if (typeof window !== 'undefined') {
  const prefetcher = {
    // --- Configuration ---
    throttle: 500, // Re-scan DOM at most every 500ms
    maxParallelRequests: 6, // Default concurrent prefetches

    // --- State ---
    prefetched: new Set<string>(),
    observer: null as IntersectionObserver | null,
    mutationObserver: null as MutationObserver | null,
    isThrottled: false,
    
    // --- Stats ---
    stats: {
      total: 0, // Total links prefetched
      saved: 0, // Data saved by not re-fetching
      queued: 0, // Links currently in observer queue
    },

    // --- Initialization ---
    init() {
      // Respect user's data-saving preferences
      if ((navigator.connection as any)?.saveData) {
        return;
      }
      
      this.adjustMaxParallelRequests();
      this.setupObservers();
      this.scan(); // Initial scan

      // Expose stats for debugging
      (window as any).__prefetchStats = this.stats;
    },

    // --- Core Logic ---
    setupObservers() {
      // 1. Intersection Observer to prefetch links when they become visible
      const observerOptions: IntersectionObserverInit = {
        rootMargin: '50% 0px', // Prefetch when link is 50% of viewport height away
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            this.queuePrefetch(link.href);
            this.observer?.unobserve(link); // Prefetch only once
            this.stats.queued--;
          }
        });
      }, observerOptions);

      // 2. Mutation Observer to detect dynamically added links
      this.mutationObserver = new MutationObserver(this.handleMutation.bind(this));
      this.mutationObserver.observe(document.body, { childList: true, subtree: true });

      // 3. Monkey-patch history API to re-scan on SPA navigation
      this.patchHistory();
    },

    patchHistory() {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;
      
      history.pushState = (...args) => {
        originalPushState.apply(history, args);
        this.scan();
      };
      
      history.replaceState = (...args) => {
        originalReplaceState.apply(history, args);
        this.scan();
      };

      window.addEventListener('popstate', () => this.scan());
    },
    
    handleMutation() {
        if (this.isThrottled) return;
        this.isThrottled = true;
        setTimeout(() => {
            this.scan();
            this.isThrottled = false;
        }, this.throttle);
    },

    scan() {
      document.querySelectorAll('a').forEach(link => {
        const url = new URL(link.href, location.href);
        if (this.isPrefetchable(url)) {
          this.observer?.observe(link);
          this.stats.queued++;
        }
      });
    },

    isPrefetchable(url: URL): boolean {
      // Is it internal?
      if (url.origin !== location.origin) return false;
      // Is it already prefetched?
      if (this.prefetched.has(url.href)) return false;
      // Is it a special protocol?
      if (['mailto:', 'tel:'].some(p => url.protocol.startsWith(p))) return false;
      // Is it an anchor link or a file?
      if (url.hash || url.pathname.includes('.')) return false;

      return true;
    },

    queuePrefetch(url: string) {
      this.prefetched.add(url);
      
      // Use requestIdleCallback for low-priority tasks
      (window as any).requestIdleCallback(() => {
        const linkTag = document.createElement('link');
        linkTag.rel = 'prefetch';
        linkTag.href = url;
        linkTag.as = 'fetch';
        
        linkTag.onload = () => {
          linkTag.remove(); // Clean up DOM
          this.stats.total++;
        };
        
        linkTag.onerror = () => {
           linkTag.remove(); // Clean up on error
           this.prefetched.delete(url); // Allow retrying later
        };
        
        document.head.appendChild(linkTag);
      }, { timeout: 2000 });
    },

    // --- Helpers ---
    adjustMaxParallelRequests() {
      const connection = (navigator.connection as any);
      if (connection) {
        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            this.maxParallelRequests = 2;
            break;
          case '3g':
            this.maxParallelRequests = 4;
            break;
          case '4g':
            this.maxParallelRequests = 6;
            break;
        }
      }
    }
  };

  // Run it
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => prefetcher.init());
  } else {
    prefetcher.init();
  }
}

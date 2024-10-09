(function() {
  let lenis = null;
  let rafId = null;

  function enableLenis() {
    if (!lenis && typeof Lenis === 'function') {
      lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      chrome.storage.local.set({ smooth: true });
      console.log("Smooth scrolling enabled");
    } else if (!Lenis) {
      console.error('Lenis is not available');
    }
  }

  function disableLenis() {
    if (lenis) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      lenis.destroy();
      lenis = null;
      chrome.storage.local.set({ smooth: false });
      console.log("Smooth scrolling disabled");
    }
  }

  function toggleLenis() {
    chrome.storage.local.get(["smooth"], function(result) {
      if (result.smooth) {
        disableLenis();
      } else {
        enableLenis();
      }
    });
  }

  // Check if we need to initialize Lenis on page load
  chrome.storage.local.get(["smooth"], function(result) {
    if (result.smooth) {
      enableLenis();
    }
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleLenis") {
      toggleLenis();
    }
  });

  // Cleanup function
  function cleanup() {
    disableLenis();
  }

  // Add event listener for when the script is about to be unloaded
  window.addEventListener('beforeunload', cleanup);
})();
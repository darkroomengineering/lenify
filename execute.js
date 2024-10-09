// This code will be executed when the extension's button is clicked

(function() {
  let lenis = null;

  function loadLenis() {
    return new Promise((resolve, reject) => {
      if (window.Lenis) {
        resolve(window.Lenis);
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lenis';
        script.onload = () => resolve(window.Lenis);
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  function enableLenis() {
    if (!lenis) {
      lenis = new window.Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  function disableLenis() {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  }

  function toggleLenis() {
    chrome.storage.local.get(["smooth"], function(result) {
      const newState = !result.smooth;
      
      if (newState) {
        loadLenis().then(() => {
          enableLenis();
          chrome.storage.local.set({ smooth: true });
          console.log("Smooth scrolling enabled");
        }).catch(error => {
          console.error('Failed to load Lenis:', error);
        });
      } else {
        disableLenis();
        chrome.storage.local.set({ smooth: false });
        console.log("Smooth scrolling disabled");
      }
    });
  }

  // Check if we need to initialize Lenis on page load
  chrome.storage.local.get(["smooth"], function(result) {
    if (result.smooth) {
      loadLenis().then(() => {
        enableLenis();
      }).catch(error => {
        console.error('Failed to load Lenis:', error);
      });
    }
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleLenis") {
      toggleLenis();
    }
  });
})();
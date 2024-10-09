// Event to toggle Lenis when extension's button is clicked
chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id, { action: "toggleLenis" });
});

// Function to update the icon
function updateIcon(enabled) {
  const path = enabled ? {
    16: 'icon16.png',
    48: 'icon48.png',
    128: 'icon128.png'
  } : {
    16: 'icon16-gray.png',
    48: 'icon48-gray.png',
    128: 'icon128-gray.png'
  };
  chrome.action.setIcon({ path: path });
}

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && 'smooth' in changes) {
    updateIcon(changes.smooth.newValue);
  }
});

// Set initial icon state on extension load
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['smooth'], (result) => {
    updateIcon(result.smooth || false);
  });
});
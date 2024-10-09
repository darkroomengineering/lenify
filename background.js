let currentTabId = null;

// Event to toggle Lenis when extension's button is clicked
chrome.action.onClicked.addListener(async (tab) => {
  currentTabId = tab.id;
  await injectScripts(tab.id);
  chrome.tabs.sendMessage(tab.id, { action: "toggleLenis" });
});

async function injectScripts(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['lenis-wrapper.js']
    });
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['execute.js']
    });
  } catch (error) {
    console.error('Error injecting scripts:', error);
  }
}

// Function to update the icon
function updateIcon(enabled) {
  if (!currentTabId) {
    console.error('No current tab ID when updating icon');
    return;
  }

  const iconName = enabled ? 'icon' : 'icon-gray';
  const iconSizes = [16, 48, 128];

  const path = {};
  iconSizes.forEach(size => {
    path[size] = `${iconName}${size}.png`;
  });

  console.log('Attempting to set icon with path:', path);

  chrome.action.setIcon({ 
    tabId: currentTabId,
    path: path 
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Error setting icon:', chrome.runtime.lastError.message);
    } else {
      console.log('Icon set successfully');
    }
  });
}

// Listen for changes in storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && 'smooth' in changes) {
    console.log('Smooth scrolling state changed:', changes.smooth.newValue);
    updateIcon(changes.smooth.newValue);
  }
});

// Set initial icon state when a tab is activated
chrome.tabs.onActivated.addListener((activeInfo) => {
  currentTabId = activeInfo.tabId;
  chrome.storage.local.get(['smooth'], (result) => {
    console.log('Tab activated, current smooth state:', result.smooth);
    updateIcon(result.smooth || false);
  });
});

// Update icon when a tab is updated (e.g., page refresh)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tabId === currentTabId) {
    chrome.storage.local.get(['smooth'], (result) => {
      console.log('Tab updated, current smooth state:', result.smooth);
      updateIcon(result.smooth || false);
    });
  }
});

// Log errors from extension context
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'error') {
    console.error('Error from content script:', message.error);
  }
});
  // Default transformation if no setting is saved
  let currentTransformation = '@gmail.com';
  
  // Load saved settings when extension starts
  chrome.storage.sync.get('transformation', (data) => {
    if (data.transformation) {
      currentTransformation = data.transformation;
    }
  });
  
  // Listen for settings changes
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.transformation) {
      currentTransformation = changes.transformation.newValue;
    }
  });
  
  // Handle icon click
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [currentTransformation],
      func: (transformation) => {
        const activeElement = document.activeElement;
        
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
          activeElement.value+=transformation
        }
      }
    });
  });
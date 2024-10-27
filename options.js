  // Load saved settings
  chrome.storage.sync.get('transformation', (data) => {
    if (data.transformation) {
      document.querySelector(`input[value="${data.transformation}"]`).checked = true;
    } else {
      // Default to uppercase if no setting is saved
      document.querySelector('input[value="@gmail.com"]').checked = true;
    }
  });
  
  // Save settings when changed
  document.querySelectorAll('input[name="transformation"]').forEach(input => {
    input.addEventListener('change', (e) => {
      chrome.storage.sync.set({
        transformation: e.target.value
      }, () => {
        // Show saved status
        const saveStatus = document.getElementById('saveStatus');
        saveStatus.style.display = 'block';
        setTimeout(() => {
          saveStatus.style.display = 'none';
        }, 2000);
      });
    });
  });
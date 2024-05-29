document.getElementById('fillForm').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: fillForm
      });
    });
  });
  
  function fillForm() {
    const setInputValue = (labelText, newValue) => {
      const labels = document.querySelectorAll('label');
      labels.forEach(label => {
        if (label.innerText.trim() === labelText) {
          const input = label.nextElementSibling.querySelector('input');
          if (input) {
            input.value = newValue;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      });
    };
  
    setInputValue('Total Amount', '1130');
    setInputValue('Vat Amount', '170');
    setInputValue('Grand Total Amount', '1300');
  
    // Find and click the "Update Fees" button
    const updateFeesButton = document.querySelector('.row_bottom_custom .btn.btn-success');
    if (updateFeesButton) {
      updateFeesButton.click();
    }
  }
  
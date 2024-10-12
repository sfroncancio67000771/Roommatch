let originalContent = '';
const subscriptionKey = 'be794794b3d24c829dada77ca1b831bf'; // Your subscription key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Your endpoint
const region = 'eastus'; // Region

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('change-language-button').addEventListener('click', changeLanguage);
});

async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    const selectedLanguage = languageSelect.value;
  
    if (confirm('Do you want to change the language?')) {
      if (selectedLanguage === 'english') {
        originalContent = document.documentElement.innerHTML;
  
        const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
        if (translatedText) {
          document.documentElement.innerHTML = translatedText;
  
          await new Promise(resolve => setTimeout(resolve, 100));
  
          updateLanguageSelector('english');
          assignEventListeners();
          initializeCalendar(); // Reinitialize calendar after language change
        }
      } else if (selectedLanguage === 'español') {
        document.documentElement.innerHTML = originalContent;
        updateLanguageSelector('español');
        assignEventListeners();
        initializeCalendar(); // Reinitialize calendar after reverting language
      }
    }
  }
  
  function initializeCalendar() {
    var calendarEl = document.getElementById('calendar');
  
    if (calendarEl) { // Ensure calendar element exists before initializing
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
          { title: 'Ocupado', start: '2024-09-02', end: '2024-09-11', color: '#ff0000' },
          { title: 'Disponible', start: '2024-09-23', end: '2024-09-25', color: '#00ff00' },
          { title: 'Temporalmente', start: '2024-09-26', end: '2024-10-01', color: '#f9e37c' }
        ]
      });
  
      calendar.render();
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar(); // Initialize the calendar when the page is first loaded
  });
  


async function translateText(text, fromLanguage, toLanguage, subscriptionKey, endpoint, region) {
    const url = `${endpoint}/translate?api-version=3.0&from=${fromLanguage}&to=${toLanguage}`;
    const body = JSON.stringify([{ 'Text': text }]);
  
    const headers = {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': region,
      'Content-Type': 'application/json'
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      const data = await response.json();
  
      if (data && data[0] && data[0].translations && data[0].translations[0]) {
        return data[0].translations[0].text;
      } else {
        console.error('Error in translation response:', data);
        return text;
      }
    } catch (error) {
      console.error('Error translating:', error);
      return text;
    }
  }
  
  function updateLanguageSelector(currentLanguage) {
    const languageSelect = document.getElementById('language-select');
    languageSelect.innerHTML = `
      <option value="english">English</option>
      <option value="español">Español</option>
    `;
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', changeLanguage);
  }
  
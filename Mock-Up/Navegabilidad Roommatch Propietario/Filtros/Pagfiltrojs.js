let originalContent = '';
const subscriptionKey = 'be794794b3d24c829dada77ca1b831bf'; // Your subscription key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Your endpoint
const region = 'eastus'; // Region

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('change-language-button').addEventListener('click', changeLanguage);
  applyFilters(); // Initialize filters on page load
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
      }
    } else if (selectedLanguage === 'español') {
      document.documentElement.innerHTML = originalContent;
      updateLanguageSelector('español');
      assignEventListeners();
    }
  }
}

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

function applyFilters() {
  const filters = {
    place: document.getElementById('filter-place').value.trim().toLowerCase(),
    price: parseInt(document.getElementById('filter-price').value, 10),
    location: document.getElementById('filter-location').value.trim().toLowerCase(),
    home: document.getElementById('filter-home').value.trim().toLowerCase()
  };

  document.querySelectorAll('.featured-item').forEach(item => {
    const itemPlace = item.getAttribute('data-place')?.trim().toLowerCase() || '';
    const itemPrice = parseInt(item.getAttribute('data-price'), 10);
    const itemLocation = item.getAttribute('data-location')?.trim().toLowerCase() || '';
    const itemHome = item.getAttribute('data-home')?.trim().toLowerCase() || '';

    let isVisible = true;

    // Apply filters cumulatively
    if (filters.place && itemPlace !== filters.place) {
      isVisible = false;
    }
    if (!isNaN(filters.price) && filters.price >= 0 && (isNaN(itemPrice) || itemPrice > filters.price)) {
      isVisible = false;
    }
    if (filters.location && itemLocation !== filters.location) {
      isVisible = false;
    }
    if (filters.home && itemHome !== filters.home) {
      isVisible = false;
    }

    // Show or hide the item based on the cumulative filter result
    item.style.display = isVisible ? 'block' : 'none';
  });
}

// Apply filters every time a filter option is changed
document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
  filter.addEventListener('change', applyFilters);
});

// Assign event listeners after translating the page or changing the language
function assignEventListeners() {
  document.getElementById('change-language-button').removeEventListener('click', changeLanguage);
  document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
    filter.removeEventListener('change', applyFilters);
  });

  document.getElementById('change-language-button').addEventListener('click', changeLanguage);
  document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });
}
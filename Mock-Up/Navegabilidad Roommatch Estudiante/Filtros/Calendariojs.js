assignEventListeners();
checkVisualDisabilityMode();


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
  
  document.getElementById('contact-button').addEventListener('click', function() {
    const fadeElement = document.createElement('div');
    fadeElement.classList.add('fade');
    document.body.appendChild(fadeElement);
    fadeElement.classList.add('show');

    setTimeout(() => {
        window.open('http://127.0.0.1:5501/Reservar/Reserva.html', 'Reservar', 'width=600,height=400');
        document.body.removeChild(fadeElement);
    }, 500); // Espera 0.5 segundos antes de abrir la ventana emergente
});

document.getElementById('contact-button').addEventListener('click', function() {
  const fadeElement = document.createElement('div');
  fadeElement.classList.add('fade');
  document.body.appendChild(fadeElement);
  fadeElement.classList.add('show');

  setTimeout(() => {
      window.open('http://127.0.0.1:5501/Reservar/Reserva.html', 'Reservar', 'width=600,height=400');
      document.body.removeChild(fadeElement);
  }, 300); // Espera 0.5 segundos antes de abrir la ventana emergente
});


//boton de accesibilidad

function assignEventListeners() {
  const accessibilityButton = document.getElementById('accessibility-button');
  if (accessibilityButton) {
      accessibilityButton.addEventListener('click', function() {
          const panel = document.querySelector('.accessibility-panel');
          if (panel) {
              panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
          }
      });
  }

  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
      closeBtn.addEventListener('click', closePanel);
  }

  // Listeners para las opciones de accesibilidad
  const epilepsyMode = document.getElementById('epilepsy-mode');
  if (epilepsyMode) {
      epilepsyMode.addEventListener('change', function() {
          toggleEpilepsyMode(this.checked);
      });
  }

  const visualDisabilityMode = document.getElementById('visual-disability-mode');
  if (visualDisabilityMode) {
      visualDisabilityMode.addEventListener('change', function() {
          toggleVisualDisabilityMode(this.checked);
      });
  }

  const blindnessMode = document.getElementById('blindness-mode');
  if (blindnessMode) {
      blindnessMode.addEventListener('change', function() {
          toggleBlindnessMode(this.checked);
      });
  }

  // Listeners para cambiar el tamaño del contenido
  const decreaseFontBtn = document.querySelector('.content-size button:nth-child(2)');
  const increaseFontBtn = document.querySelector('.content-size button:nth-child(4)');
  if (decreaseFontBtn) {
      decreaseFontBtn.addEventListener('click', decreaseFontSize);
  }
  if (increaseFontBtn) {
      increaseFontBtn.addEventListener('click', increaseFontSize);
  }

  const resetBtn = document.querySelector('.reset-btn');
  if (resetBtn) {
      resetBtn.addEventListener('click', resetSettings);
  }

  const hideBtn = document.querySelector('.hide-btn');
  if (hideBtn) {
      hideBtn.addEventListener('click', hidePanel);
  }
}

// Función para cerrar el panel de accesibilidad
function closePanel() {
  const panel = document.querySelector('.accessibility-panel');
  if (panel) {
      panel.style.display = 'none';
  }
}

// Función para disminuir el tamaño de la fuente
function decreaseFontSize() {
  document.body.style.fontSize = 'smaller';
  const fontSizeLabel = document.getElementById('font-size-label');
  if (fontSizeLabel) {
      fontSizeLabel.textContent = 'Pequeño';
  }
}

// Función para aumentar el tamaño de la fuente
function increaseFontSize() {
  document.body.style.fontSize = 'larger';
  const fontSizeLabel = document.getElementById('font-size-label');
  if (fontSizeLabel) {
      fontSizeLabel.textContent = 'Grande';
  }
}

// Función para restablecer las configuraciones de accesibilidad
function resetSettings() {
  const epilepsyMode = document.getElementById('epilepsy-mode');
  const visualDisabilityMode = document.getElementById('visual-disability-mode');
  const cognitiveDisabilityMode = document.getElementById('cognitive-disability-mode');
  const adhdMode = document.getElementById('adhd-mode');
  const blindnessMode = document.getElementById('blindness-mode');

  if (epilepsyMode) epilepsyMode.checked = false;
  if (visualDisabilityMode) visualDisabilityMode.checked = false;
  if (blindnessMode) blindnessMode.checked = false;

  document.body.style.filter = '';
  document.body.style.fontSize = '';
  document.body.classList.remove('high-contrast');

  const fontSizeLabel = document.getElementById('font-size-label');
  if (fontSizeLabel) {
      fontSizeLabel.textContent = 'Predeterminado';
  }

  localStorage.setItem('visualDisabilityMode', false); // Guardamos el estado
}

// Función para ocultar permanentemente el panel de accesibilidad
function hidePanel() {
  const panel = document.querySelector('.accessibility-panel');
  if (panel) {
      panel.style.display = 'none';
  }
}

// Funciones para los modos de accesibilidad

// Modo de epilepsia (Reduce el brillo y elimina parpadeos)
function toggleEpilepsyMode(isEnabled) {
  if (isEnabled) {
      document.body.style.filter = 'brightness(80%)';
  } else {
      document.body.style.filter = '';
  }
}

// Modo de discapacidad visual (Aplica los estilos de alto contraste en la misma página)
function toggleVisualDisabilityMode(isEnabled) {
  if (isEnabled) {
      document.body.classList.add('high-contrast');
  } else {
      document.body.classList.remove('high-contrast');
  }
  localStorage.setItem('visualDisabilityMode', isEnabled); // Guardamos el estado
}

// Función para revisar si el modo de discapacidad visual está activado y aplicar los estilos si es necesario
function checkVisualDisabilityMode() {
  const isVisualDisabilityMode = localStorage.getItem('visualDisabilityMode') === 'true';
  const visualDisabilityModeCheckbox = document.getElementById('visual-disability-mode');

  if (visualDisabilityModeCheckbox) {
      visualDisabilityModeCheckbox.checked = isVisualDisabilityMode;
  }

  if (isVisualDisabilityMode) {
      document.body.classList.add('high-contrast');
  } else {
      document.body.classList.remove('high-contrast');
  }
}

// Modo para ceguera (Integra mejor el sitio con lectores de pantalla)
function toggleBlindnessMode(isEnabled) {
  if (isEnabled) {
      document.body.setAttribute('aria-hidden', 'false');
  } else {
      document.body.setAttribute('aria-hidden', 'true');
  }
}

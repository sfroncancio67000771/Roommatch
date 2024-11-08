assignEventListeners();
checkVisualDisabilityMode();

document.getElementById('change-language-button').addEventListener('click', changeLanguage);

// Función para asignar los event listeners necesarios
// Función para traducir el texto usando la API de Azure Translator
async function translateText(text, from, to, subscriptionKey, endpoint, region) {
    const response = await fetch(`${endpoint}/translate?api-version=3.0&from=${from}&to=${to}`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': region,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ Text: text }])
    });
    const data = await response.json();
    return data[0].translations[0].text;
}

// Almacena el contenido original solo una vez
const originalContent = document.body.innerHTML;

// Función para cambiar el idioma y almacenar la preferencia en localStorage
async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    const selectedLanguage = languageSelect.value;
    const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Tu clave de suscripción
    const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
    const region = 'southcentralus'; // Región

    if (confirm('Do you want to change the language?')) {
        if (selectedLanguage === 'english') {
            // Traduce el contenido de español a inglés
            const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
            document.body.innerHTML = translatedText; // Reemplaza el contenido del body con la traducción
            localStorage.setItem('preferredLanguage', 'english'); // Guarda la preferencia en localStorage
            updateLanguageSelector('english');
        } else if (selectedLanguage === 'español') {
            // Restaura el contenido original en español
            document.body.innerHTML = originalContent;
            localStorage.setItem('preferredLanguage', 'español'); // Guarda la preferencia en localStorage
            updateLanguageSelector('español');
        }
        assignEventListeners(); // Reasignar event listeners después de actualizar el contenido
    }
}

// Función para aplicar la preferencia de idioma al cargar la página
async function applyPreferredLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'english') {
        const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
        document.body.innerHTML = translatedText;
        updateLanguageSelector('english');
    } else if (savedLanguage === 'español') {
        document.body.innerHTML = originalContent;
        updateLanguageSelector('español');
    }
    assignEventListeners(); // Reasignar event listeners después de cargar el contenido
}

// Llama a esta función cuando cargue la página
document.addEventListener('DOMContentLoaded', applyPreferredLanguage);

// Función para actualizar el selector de idioma
function updateLanguageSelector(language) {
    const languageSelect = document.getElementById('language-select');
    languageSelect.value = language;
}

// Función para reasignar los event listeners
function assignEventListeners() {
    document.getElementById('language-select').addEventListener('change', changeLanguage);
}



/*
  const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Tu clave de suscripción
    const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
    const region = 'southcentralus'; // Región
    
*/
// Selecciona todos los elementos que se pueden arrastrar
const draggables = document.querySelectorAll('.card');
const container = document.querySelector('.overview-cards');

// Añadir eventos de arrastrar a los elementos
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

// Añadir eventos al contenedor para soltar los elementos
container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const dragging = document.querySelector('.dragging');
    if (afterElement == null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
});

// Función para determinar la posición en la que se debe soltar el elemento
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


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
  
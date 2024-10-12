// Definir el contenido original
let originalContent = document.documentElement.innerHTML; 

// Verifica si el botón de cambio de idioma existe antes de asignar el listener
const changeLanguageButton = document.getElementById('change-language-button');
if (changeLanguageButton) {
    changeLanguageButton.addEventListener('click', changeLanguage);
}

// Asigna los event listeners solo si ciertos elementos están presentes
assignEventListeners();

// Verifica el estado almacenado del modo de discapacidad visual al cargar la página
checkVisualDisabilityMode();

// Función para cambiar el idioma
async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return; // Si no hay selector de idioma, termina la función
    
    const selectedLanguage = languageSelect.value;
    const subscriptionKey = 'be794794b3d24c829dada77ca1b831bf'; // Tu clave de suscripción
    const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
    const region = 'eastus'; // Región
    
    if (confirm('Do you want to change the language?')) { // Confirmación
        if (selectedLanguage === 'english') {
            const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
            document.documentElement.innerHTML = translatedText; // Reemplaza el contenido con la traducción
            updateLanguageSelector('english');
            assignEventListeners(); // Reasignar event listeners después de la traducción
        } else if (selectedLanguage === 'español') {
            document.documentElement.innerHTML = originalContent; // Restaura el contenido original en español
            updateLanguageSelector('español');
            assignEventListeners(); // Reasignar event listeners después de restaurar el contenido
        }
    }
}

// Función para realizar la traducción
async function translateText(text, fromLang, toLang, subscriptionKey, endpoint, region) {
    const url = `${endpoint}/translate?api-version=3.0&from=${fromLang}&to=${toLang}`;
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
            return data[0].translations[0].text; // Devuelve el texto traducido
        } else {
            console.error('Error en la respuesta de traducción:', data);
            return text; // Si falla la traducción, devuelve el texto original
        }
    } catch (error) {
        console.error('Error al traducir:', error);
        return text; // Si falla la traducción, devuelve el texto original
    }
}

// Función para actualizar el selector de idioma
function updateLanguageSelector(currentLanguage) {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return; // Si no existe el selector de idioma, termina la función

    languageSelect.innerHTML = `
        <option value="english">English</option>
        <option value="español">Español</option>
    `;
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', changeLanguage);
}

// Función para asignar los event listeners
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

    const cognitiveDisabilityMode = document.getElementById('cognitive-disability-mode');
    if (cognitiveDisabilityMode) {
        cognitiveDisabilityMode.addEventListener('change', function() {
            toggleCognitiveDisabilityMode(this.checked);
        });
    }

    const adhdMode = document.getElementById('adhd-mode');
    if (adhdMode) {
        adhdMode.addEventListener('change', function() {
            toggleADHDMode(this.checked);
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
    if (cognitiveDisabilityMode) cognitiveDisabilityMode.checked = false;
    if (adhdMode) adhdMode.checked = false;
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

// Modo de discapacidad cognitiva (Enfatiza contenido específico)
function toggleCognitiveDisabilityMode(isEnabled) {
    if (isEnabled) {
        document.body.style.outline = '5px solid blue';
    } else {
        document.body.style.outline = '';
    }
}

// Modo compatible con TDAH (Reduce distracciones)
function toggleADHDMode(isEnabled) {
    if (isEnabled) {
        document.querySelectorAll('*').forEach((el) => {
            el.style.transition = 'none';
        });
    } else {
        document.querySelectorAll('*').forEach((el) => {
            el.style.transition = '';
        });
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

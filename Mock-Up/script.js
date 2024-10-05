let originalContent = document.documentElement.innerHTML; // Guarda el contenido original solo una vez

async function changeLanguage() {
    const languageSelect = document.getElementById('language_choose');
    const selectedLanguage = languageSelect.value;
    const subscriptionKey = ' be794794b3d24c829dada77ca1b831bf';
    const endpoint = 'https://api.cognitive.microsofttranslator.com';
    const region = 'eastus ';

    if (selectedLanguage === 'en') {
        // Traduce el contenido de español a inglés
        const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
        document.documentElement.innerHTML = translatedText; // Reemplaza el contenido con la traducción
        updateLanguageSelector('en');
    } else if (selectedLanguage === 'es') {
        // Restaura el contenido original en español
        document.documentElement.innerHTML = originalContent;
        updateLanguageSelector('es');
    }
}

// Función para traducir el contenido
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
        return data[0].translations[0].text; // Devuelve el texto traducido
    } catch (error) {
        console.error('Error al traducir:', error);
        return text; // Si falla la traducción, devuelve el texto original
    }
}

// Función para actualizar el selector de idioma
function updateLanguageSelector(currentLanguage) {
    const languageSelect = document.getElementById('language_choose');
    if (currentLanguage === 'en') {
        languageSelect.innerHTML = `
            <option value="en">English</option>
            <option value="es">Español</option>
        `;
    } else {
        languageSelect.innerHTML = `
            <option value="es">Español</option>
            <option value="en">English</option>
        `;
    }

    // Agregar el event listener nuevamente ya que el DOM fue reemplazado
    languageSelect.addEventListener('change', changeLanguage);
}

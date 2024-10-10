let originalContent = document.documentElement.innerHTML; // Define el contenido original

document.getElementById('change-language-button').addEventListener('click', changeLanguage);

async function changeLanguage() {
    const languageSelect = document.getElementById('language-select'); // Correcto elemento select
    const selectedLanguage = languageSelect.value;
    const subscriptionKey = 'be794794b3d24c829dada77ca1b831bf'; // Tu clave de suscripción
    const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
    const region = 'eastus'; // Región
    

    if (confirm('Do you want to change the language?')) { // Confirmación
        if (selectedLanguage === 'english') {
            // Traduce el contenido de español a inglés
            const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
            document.documentElement.innerHTML = translatedText; // Reemplaza el contenido con la traducción
            updateLanguageSelector('english');
        } else if (selectedLanguage === 'español') {
            // Restaura el contenido original en español
            document.documentElement.innerHTML = originalContent;
            updateLanguageSelector('español');
        }
    }
}

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

        // Comprobando y extrayendo la traducción correcta
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

function updateLanguageSelector(currentLanguage) {
    const languageSelect = document.getElementById('language-select'); // Asegúrate de que este ID coincida

    languageSelect.innerHTML = `
        <option value="english">English</option>
        <option value="español">Español</option>
    `;
    
    languageSelect.value = currentLanguage;

    // Agregar el event listener nuevamente ya que el DOM fue reemplazado
    languageSelect.addEventListener('change', changeLanguage);
}

// Función para alternar la visibilidad del formulario de accesibilidad
function toggleAccessibilityForm() {
    const form = document.getElementById("accessibility-form");
    const isVisible = form.classList.contains("show");
    
    // Ocultar si ya está visible, mostrar si no lo está
    if (isVisible) {
        form.classList.remove("show");
        form.style.display = 'none';
    } else {
        form.classList.add("show");
        form.style.display = 'block';
    }
}

// Evento para el cambio de las opciones de accesibilidad
document.getElementById("accessibility-options").addEventListener("change", function() {
    const selectedOption = this.value;
    
    if (selectedOption === "high-contrast") {
        document.body.classList.toggle("high-contrast-mode");
    }
});

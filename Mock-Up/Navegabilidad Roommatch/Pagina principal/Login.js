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

 // Elementos del botón de accesibilidad y el menú de opciones de accesibilidad

document.addEventListener('DOMContentLoaded', function() {
    const accessibilityButton = document.querySelector('.accessibility-button');
    const accessibilityOptions = document.querySelector('.accessibility-options');
    let timeoutId;

    // Mostrar u ocultar las opciones de accesibilidad al hacer clic
    accessibilityButton.addEventListener('click', function() {
        if (accessibilityOptions.classList.contains('show')) {
            hideAccessibilityOptions(); // Oculta si ya está visible
        } else {
            showAccessibilityOptions(); // Muestra si no está visible
            hideAccessibilityOptionsWithDelay(); // Oculta después de un tiempo
        }
    });

    // Mostrar el menú
    function showAccessibilityOptions() {
        accessibilityOptions.classList.add('show');
        clearTimeout(timeoutId); // Cancelar cualquier temporizador previo
    }

    // Ocultar el menú después de 3 segundos
    function hideAccessibilityOptionsWithDelay() {
        timeoutId = setTimeout(function() {
            accessibilityOptions.classList.remove('show');
        }, 3000); // 3000ms = 3 segundos
    }

    // Ocultar el menú inmediatamente
    function hideAccessibilityOptions() {
        accessibilityOptions.classList.remove('show');
    }

    // Función de manejo del selector de accesibilidad
    document.getElementById('accessibility_checkbox_select').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedOption = this.querySelector('select').value;

        if (selectedOption === 'high-contrast') {
            // Redirigir a la página de Alto Contraste
            window.location.href = 'AltoContraste.html';
        } else if (selectedOption === 'normal-mode') {
            // Redirigir a la página normal (Español.html)
            window.location.href = 'Home_Login.html';
        }


        accessibilityOptions.style.display = 'none';
    });
});

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

  // Selecciona todas las imágenes en la página
  const images = document.querySelectorAll('img');

  // Añade un evento de clic a cada imagen
  images.forEach(image => {
    image.addEventListener('click', function() {
      // Aquí puedes agregar la lógica que desees
      // Ejemplo: cambiar la opacidad o el color
      this.style.opacity = '0.5'; // Cambia la opacidad al hacer clic
      setTimeout(() => {
        this.style.opacity = '1'; // Restaura la opacidad después de un tiempo
      }, 300); // Restaura la opacidad después de 300 ms
    });
  });



document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el div de "arrendatario"
    const arrendatarioDiv = document.getElementById('3'); // Selecciona el div con id "3"

    // Agrega un evento de clic
    arrendatarioDiv.addEventListener('click', () => {
        // Redirige a la página deseada
        window.location.href = 'http://127.0.0.1:5501/Navegabilidad%20Roommatch%20Propietario/Propietario/Propietario.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el div de "arrendatario"
    const arrendatarioDiv = document.getElementById('2'); // Selecciona el div con id "3"

    // Agrega un evento de clic
    arrendatarioDiv.addEventListener('click', () => {
        // Redirige a la página deseada
        window.location.href = 'http://127.0.0.1:5501/Navegabilidad%20Roommatch%20Estudiante/Filtros/Pagina%20Estudiante.html';
    });
});


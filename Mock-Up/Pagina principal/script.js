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
            window.location.href = 'Español.html';
        }


        accessibilityOptions.style.display = 'none';
    });
});


///////////////



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

document.getElementById('miFormulario').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const contraseña = document.getElementById('contraseña').value;

    // Validar el correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@ucatolica\.edu\.co$/;
    if (!emailPattern.test(email)) {
        document.getElementById('respuesta').textContent = 'El correo electrónico debe ser de @ucatolica.edu.co';
        return;
    }

    // Crear un objeto con los datos del formulario
    const datos = {
        nombre: nombre,
        edad: edad,
        email: email,
        telefono: telefono,
        contraseña: contraseña
    };

    // Enviar los datos al servidor
    fetch('http://localhost:8081/api/v1/estudiantes/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.text())  // Leer la respuesta como texto
    .then(text => {
        try {
            const data = JSON.parse(text);  // Intentar parsear la respuesta como JSON
            // Limpiar los campos del formulario
            document.getElementById('miFormulario').reset();

            // Mostrar el mensaje de éxito
            document.getElementById('respuesta').textContent = '¡Formulario enviado con éxito!';
            console.log('Success:', data);
        } catch (e) {
            // Mostrar el mensaje de error si la respuesta no es JSON
            document.getElementById('respuesta').textContent = 'Error al enviar el formulario: Respuesta del servidor no es JSON';
            console.error('Success:', data);
        }
    })
    .catch(error => {
        // Mostrar el mensaje de error
        document.getElementById('respuesta').textContent = 'Error al enviar el formulario: ' + error.message;
        console.error('Error:', error);
    });
});



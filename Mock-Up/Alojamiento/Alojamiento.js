document.getElementById('alojamientoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const precio = document.getElementById('precio').value;
    const idPropietario = document.getElementById('idPropietario').value;
    const tipoAlojamientoId = document.getElementById('tipoAlojamiento').value;
    const tieneLavanderia = document.getElementById('tieneLavanderia').checked;
    const tieneRoomie = document.getElementById('tieneRoomie').checked;
    const tieneParqueaderoBicicleta = document.getElementById('tieneParqueaderoBicicleta').checked;

    // Crear un objeto con los datos del formulario
    const datos = {
        nombreAlojamiento: nombre,
        descripcion: descripcion,
        direccion: direccion,
        ciudad: ciudad,
        precio: parseFloat(precio), // Asegúrate de que el precio sea un número
        idPropietario: parseInt(idPropietario, 10), // Asegúrate de que idPropietario sea un número
        tipoAlojamientoId: parseInt(tipoAlojamientoId, 10), // Asegúrate de que tipoAlojamientoId sea un número
        tieneLavanderia: tieneLavanderia,
        tieneRoomie: tieneRoomie,
        tieneParqueaderoBicicleta: tieneParqueaderoBicicleta
    };

    // Enviar los datos al servidor
    fetch('http://localhost:8081/api/v1/propietarios/crearhab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            document.getElementById('alojamientoForm').reset();
            document.getElementById('respuesta').textContent = '¡Habitación registrada con éxito!';
            console.log('Success:', data);
        } catch (e) {
            document.getElementById('respuesta').textContent = 'Error al registrar: Respuesta del servidor no es JSON';
            console.error('Error en el formato de respuesta, no es JSON', text);
        }
    })
    .catch(error => {
        document.getElementById('respuesta').textContent = 'Error al registrar: ' + error.message;
        console.error('Error en el envío del formulario:', error);
    });
});

let originalContent = document.documentElement.innerHTML;

document.getElementById('change-language-button').addEventListener('click', changeLanguage);

// Función para asignar los event listeners necesarios
function assignEventListeners() {
    document.getElementById('accessibility-button').addEventListener('click', function(event) {
        const popup = document.getElementById('accessibility-popup');
        popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
        event.stopPropagation(); // Evita que el clic en el botón cierre el pop-up
    });

    // Cierra el pop-up si se hace clic fuera de él
    document.addEventListener('click', function(event) {
        const popup = document.getElementById('accessibility-popup');
        if (!popup.contains(event.target) && event.target.id !== 'accessibility-button') {
            popup.style.display = 'none';
        }
    });
    
    // Listener para el modo de alto contraste
    document.getElementById('high-contrast-toggle').addEventListener('click', toggleHighContrast);
}

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
            assignEventListeners(); // Reasignar event listeners después de la traducción
        } else if (selectedLanguage === 'español') {
            // Restaura el contenido original en español
            document.documentElement.innerHTML = originalContent;
            updateLanguageSelector('español');
            assignEventListeners(); // Reasignar event listeners después de restaurar el contenido
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

const inputs = document.querySelectorAll("input[required], select[required]");
inputs.forEach(input => {
    const message = document.createElement("span");
    message.classList.add("error-message");
    message.style.color = "red"; // Estilo para el mensaje de error
    input.parentElement.appendChild(message);

    input.addEventListener("blur", function() {
        if (!this.value) {
            this.classList.add("error");
            this.classList.add("highlight"); // Agrega clase de iluminación
            message.textContent = "Este campo es obligatorio.";
        } else {
            this.classList.remove("error");
            this.classList.remove("highlight"); // Elimina clase de iluminación
            message.textContent = ""; 
        }
    });
});

// Validar al enviar el formulario
const form = document.getElementById("alojamientoForm");
form.addEventListener("submit", function(event) {
    let valid = true;
    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add("error");
            input.classList.add("highlight"); // Agrega clase de iluminación
            const message = input.parentElement.querySelector(".error-message");
            message.textContent = "Este campo es obligatorio.";
        } else {
            input.classList.remove("highlight"); // Elimina clase de iluminación si hay valor
        }
    });
    if (!valid) {
        event.preventDefault(); // Evita el envío del formulario si hay errores
    }
});


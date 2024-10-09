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


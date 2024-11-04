const BASE_URL = 'http://localhost:8081/api/v1/fotos/';
const API_URL = 'http://localhost:8081/api/v1/alojamiento/filtrar';

async function obtenerAlojamientos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los alojamientos');
        }
        const alojamientos = await response.json();
        mostrarAlojamientos(alojamientos);
    } catch (error) {
        console.error(error);
        alert('No se pudieron cargar los alojamientos. Inténtalo de nuevo más tarde.');
    }
}

async function obtenerFoto(idAlojamiento) {
    try {
        // Construir la URL completa para la imagen
        const imageUrl = `${BASE_URL}imagen/${idAlojamiento}`;
        
        // Realizar la solicitud con las opciones correctas
        const response = await fetch(imageUrl, {
            method: 'GET',
            headers: {
                'Accept': 'image/*'
            },
            cache: 'no-cache' // Evitar el caché del navegador
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener la foto');
        }
        
        // Convertir la respuesta a blob y crear URL
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        console.log(`Imagen cargada para alojamiento ${idAlojamiento}:`, objectUrl);
        return objectUrl;

    } catch (error) {
        console.error(`Error al obtener la foto para el alojamiento ${idAlojamiento}:`, error);
        return null;
    }
}

async function mostrarAlojamientos(alojamientos) {
    const container = document.getElementById('alojamientos-container');
    container.innerHTML = '';

    try {
        for (const alojamiento of alojamientos) {
            const card = document.createElement('div');
            card.className = 'card';

            // Intentar obtener la imagen
            const imagenUrl = await obtenerFoto(alojamiento.idAlojamiento);
            console.log(`URL de imagen para alojamiento ${alojamiento.idAlojamiento}:`, imagenUrl);

            // Crear la imagen con un manejador de error
            const imgElement = document.createElement('img');
            imgElement.alt = alojamiento.nombreAlojamiento;
            imgElement.style.width = '100%';
            imgElement.style.height = '200px';
            imgElement.style.objectFit = 'cover';
            
            // Si tenemos una URL de imagen, usarla
            if (imagenUrl) {
                imgElement.src = imagenUrl;
            }

            // Manejador de error para la imagen
            imgElement.onerror = function() {
                console.log(`Error al cargar imagen para alojamiento ${alojamiento.idAlojamiento}`);
                this.src = 'ruta/a/imagen/por/defecto.jpg'; // Asegúrate de tener una imagen por defecto
            };

            card.innerHTML = `
                <h2>${alojamiento.nombreAlojamiento}</h2>
                <p><strong>Descripción:</strong> ${alojamiento.descripcion}</p>
                <p><strong>Ciudad:</strong> ${alojamiento.ciudad}</p>
                <p><strong>Precio:</strong> <span class="precio">$${alojamiento.precio}</span></p>
                <p><strong>Dirección:</strong> ${alojamiento.direccion}</p>
                <div class="contact">
                    <button onclick="elimibnar('${alojamiento.idAlojamiento}')">Eliminar</button>
                </div>
            `;

            // Insertar la imagen al principio de la card
            card.insertBefore(imgElement, card.firstChild);
            container.appendChild(card);
        }
    } catch (error) {
        console.error('Error al mostrar los alojamientos:', error);
        container.innerHTML = '<p>Error al cargar los alojamientos</p>';
    }
}

function contactar(idAlojamiento) {
    window.location.href = `detalle_habitacion.html?id=${idAlojamiento}`;
}

// Limpieza de URLs de objetos
function limpiarURLs() {
    const images = document.querySelectorAll('.card img');
    images.forEach(img => {
        if (img.src.startsWith('blob:')) {
            URL.revokeObjectURL(img.src);
        }
    });
}

window.onload = obtenerAlojamientos;
window.onunload = limpiarURLs;
// Script para el cambio de idioma 



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


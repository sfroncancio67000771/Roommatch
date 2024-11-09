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
                    <button onclick="contactar('${alojamiento.idAlojamiento}')">Visualizar</button>
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

// Configuración de traducción
let originalContent = '';
const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Tu clave de suscripción
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
const region = 'southcentralus'; // Región

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('change-language-button').addEventListener('click', changeLanguage);
    applyFilters(); // Inicializa filtros al cargar la página
});

async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    const selectedLanguage = languageSelect.value;

    if (confirm('¿Deseas cambiar el idioma?')) {
        if (selectedLanguage === 'english') {
            originalContent = document.documentElement.innerHTML;

            const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
            if (translatedText) {
                document.documentElement.innerHTML = translatedText;

                await new Promise(resolve => setTimeout(resolve, 100));

                updateLanguageSelector('english');
                assignEventListeners();
            }
        } else if (selectedLanguage === 'español') {
            document.documentElement.innerHTML = originalContent;
            updateLanguageSelector('español');
            assignEventListeners();
        }
    }
}

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
            console.error('Error en la respuesta de traducción:', data);
            return text;
        }
    } catch (error) {
        console.error('Error al traducir:', error);
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

function applyFilters() {
    const filters = {
        place: document.getElementById('filter-place').value.trim().toLowerCase(),
        price: parseInt(document.getElementById('filter-price').value, 10),
        location: document.getElementById('filter-location').value.trim().toLowerCase(),
        home: document.getElementById('filter-home').value.trim().toLowerCase()
    };

    document.querySelectorAll('.featured-item').forEach(item => {
        const itemPlace = item.getAttribute('data-place')?.trim().toLowerCase() || '';
        const itemPrice = parseInt(item.getAttribute('data-price'), 10);
        const itemLocation = item.getAttribute('data-location')?.trim().toLowerCase() || '';
        const itemHome = item.getAttribute('data-home')?.trim().toLowerCase() || '';

        let isVisible = true;

        // Aplica filtros acumulativos
        if (filters.place && itemPlace !== filters.place) {
            isVisible = false;
        }
        if (!isNaN(filters.price) && filters.price >= 0 && (isNaN(itemPrice) || itemPrice > filters.price)) {
            isVisible = false;
        }
        if (filters.location && itemLocation !== filters.location) {
            isVisible = false;
        }
        if (filters.home && itemHome !== filters.home) {
            isVisible = false;
        }

        // Muestra u oculta el elemento según el resultado del filtro acumulativo
        item.style.display = isVisible ? 'block' : 'none';
    });
}

// Aplica filtros cada vez que se cambia una opción de filtro
document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
    filter.addEventListener('change', applyFilters);
});

// Asigna los event listeners después de traducir la página o cambiar el idioma
function assignEventListeners() {
    document.getElementById('change-language-button').removeEventListener('click', changeLanguage);
    document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
        filter.removeEventListener('change', applyFilters);
    });

    document.getElementById('change-language-button').addEventListener('click', changeLanguage);
    document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

// Constantes para las URLs base
const BASE_URL = 'http://localhost:8081/api/v1/alojamiento/';
const FOTOS_URL = 'http://localhost:8081/api/v1/fotos/imagen/';
const IMAGEN_GENERICA = '/ruta/a/tu/imagen-genérica.jpg'; // Ruta de la imagen genérica

// Función para cargar la imagen desde el servidor
async function cargarImagen(idAlojamiento) {
    try {
        const response = await fetch(`${FOTOS_URL}${idAlojamiento}`);
        if (!response.ok) {
            throw new Error(`Error al cargar la imagen: ${response.status}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
        return IMAGEN_GENERICA; // Usar imagen genérica en caso de error
    }
}

// Función para obtener alojamientos
async function obtenerAlojamientos() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los alojamientos');
        }
        const alojamientos = await response.json();
        mostrarAlojamientos(alojamientos);
    } catch (error) {
        console.error('Error al obtener alojamientos:', error);
        // No mostrar una alerta al usuario
    }
}

// Función para mostrar alojamientos
async function mostrarAlojamientos(alojamientos) {
    const container = document.getElementById('alojamientos-container');
    container.innerHTML = ''; // Limpiar el contenedor

    try {
        for (const alojamiento of alojamientos) {
            const card = document.createElement('div');
            card.className = 'card';

            // Intentar cargar la imagen
            const imagenUrl = await cargarImagen(alojamiento.idAlojamiento);
            console.log(`URL de imagen para alojamiento ${alojamiento.idAlojamiento}:`, imagenUrl);

            // Crear la imagen con un manejador de error
            const imgElement = document.createElement('img');
            imgElement.alt = alojamiento.nombreAlojamiento;
            imgElement.src = imagenUrl;
            imgElement.onerror = function() {
                console.log(`Error al cargar imagen para alojamiento ${alojamiento.idAlojamiento}`);
                this.src = IMAGEN_GENERICA; // Usar imagen genérica en caso de error
            };

            // Establecer estilos de la imagen
            imgElement.style.width = '100%';
            imgElement.style.height = '200px';
            imgElement.style.objectFit = 'cover';

            card.innerHTML = `
                <h2>${alojamiento.nombreAlojamiento}</h2>
                <p><strong>Descripción:</strong> ${alojamiento.descripcion}</p>
                <p><strong>Ciudad:</strong> ${alojamiento.ciudad}</p>
                <p><strong>Precio:</strong> <span class="precio">$${alojamiento.precio.toLocaleString()}</span></p>
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

// Función para obtener detalles de la habitación
async function obtenerDetallesHabitacion(idAlojamiento) {
    try {
        const response = await fetch(`${BASE_URL}${idAlojamiento}`);
        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${errorDetails}`);
        }
        const alojamiento = await response.json();
        await mostrarDetalles(alojamiento);
    } catch (error) {
        console.error('Error al cargar los detalles de la habitación:', error);
        alert('No se pudo cargar la información de la habitación. Inténtalo de nuevo más tarde.');
    }
}

// Función para mostrar los detalles del alojamiento
async function mostrarDetalles(alojamiento) {
    try {
        // Cargar la imagen antes de construir el HTML
        const imagenUrl = await cargarImagen(alojamiento.idAlojamiento);
        
        const container = document.getElementById('room-details-container');
        container.innerHTML = `
            <h2>${alojamiento.nombreAlojamiento || 'Habitación Sin Nombre'}</h2>
            <img src="${imagenUrl}" 
                 alt="${alojamiento.nombreAlojamiento || 'Imagen de la Habitación'}" 
                 style="max-width: 100%; height: 200px; object-fit: cover;"
                 onerror="this.src='${IMAGEN_GENERICA}'"> <!-- Usar imagen genérica si hay error -->
            <p><strong>Descripción:</strong> ${alojamiento.descripcion || 'Descripción no disponible'}</p>
            <p><strong>Ciudad:</strong> ${alojamiento.ciudad || 'Ciudad no especificada'}</p>
            <p><strong>Precio:</strong> <span class="precio">$${alojamiento.precio ? alojamiento.precio.toLocaleString() : 'N/A'}</span></p>
            <p><strong>Dirección:</strong> ${alojamiento.direccion || 'Dirección no disponible'}</p>
            <p><strong>Contacto:</strong> ${alojamiento.propietario ? `${alojamiento.propietario.nombre} (${alojamiento.propietario.telefono})` : 'Contacto no disponible'}</p>
            <p><strong>Estado de la Habitación:</strong> ${alojamiento.estadoHabitacion ? alojamiento.estadoHabitacion.estadoHabitacion : 'Estado no disponible'}</p>
            <p><strong>Tipo de Alojamiento:</strong> ${alojamiento.tipoAlojamiento ? alojamiento.tipoAlojamiento.nombreTipoAlojamiento : 'Tipo no especificado'}</p>
            <p><strong>Tiene Lavandería:</strong> ${alojamiento.tieneLavanderia ? 'Sí' : 'No'}</p>
            <p><strong>Tiene Roomie:</strong> ${alojamiento.tieneRoomie ? 'Sí' : 'No'}</p>
            <p><strong>Tiene Parqueadero de Bicicleta:</strong> ${alojamiento.tieneParqueaderoBicicleta ? 'Sí' : 'No'}</p>
            <div class="buttons">
                <div class="contact">
                    <button id="contact-button">Contactar</button>
                </div>
                <div class="Return">
                    <button id="return-button">Regresar</button>
                </div>
            </div>
        `;

        // Configurar el evento para el botón de retorno
        document.getElementById('return-button').addEventListener('click', function() {
            window.location.href = 'http://127.0.0.1:5501/Navegabilidad%20Roommatch%20Estudiante/Filtros/Pagina%20Estudiante.html';
        });

        // Manejar el botón de contacto
        document.getElementById('contact-button').addEventListener('click', function() {
            window.open('http://127.0.0.1:5501/Reservar/Reserva.html', 'Reservar', 'width=600,height=400');
        });

    } catch (error) {
        console.error('Error al mostrar los detalles:', error);
        alert('Error al mostrar los detalles del alojamiento');
    }
}

// Función para obtener el ID del alojamiento de la URL
function obtenerIdAlojamientoDeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Asume que el ID está en la URL como ?id=123
}

// Función de inicialización que se ejecuta cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const idAlojamiento = obtenerIdAlojamientoDeURL();
    if (idAlojamiento) {
        obtenerDetallesHabitacion(idAlojamiento);
    } else {
        console.error('No se proporcionó ID de alojamiento en la URL');
        alert('No se pudo encontrar la información del alojamiento');
    }
});

// Cargar alojamientos al cargar la página
window.onload = obtenerAlojamientos;





document.head.appendChild(style);

let originalContent = '';
const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Your subscription key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Your endpoint
const region = 'southcentralus'; // Region

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('change-language-button').addEventListener('click', changeLanguage);
});

async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    const selectedLanguage = languageSelect.value;
  
    if (confirm('Do you want to change the language?')) {
      if (selectedLanguage === 'english') {
        originalContent = document.documentElement.innerHTML;
  
        const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
        if (translatedText) {
          document.documentElement.innerHTML = translatedText;
  
          await new Promise(resolve => setTimeout(resolve, 100));
  
          updateLanguageSelector('english');
          assignEventListeners();
          initializeCalendar(); // Reinitialize calendar after language change
        }
      } else if (selectedLanguage === 'español') {
        document.documentElement.innerHTML = originalContent;
        updateLanguageSelector('español');
        assignEventListeners();
        initializeCalendar(); // Reinitialize calendar after reverting language
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
        console.error('Error in translation response:', data);
        return text;
      }
    } catch (error) {
      console.error('Error translating:', error);
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
  



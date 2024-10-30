let originalContent = document.documentElement.innerHTML; 

assignEventListeners();
checkVisualDisabilityMode();

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


/*PARA EL CALENDARIO */

// Obtener el idAlojamiento de la URL
const urlParams = new URLSearchParams(window.location.search);
const idAlojamiento = urlParams.get('id');

// Función para cargar información del alojamiento
async function cargarInformacionAlojamiento() {
    try {
        const response = await axios.get(`http://localhost:8081/api/v1/alojamiento/${idAlojamiento}`);
        const alojamiento = response.data;

        // Mostrar la información en la tarjeta
        document.getElementById('nombreAlojamiento').innerText = alojamiento.nombreAlojamiento;
        document.getElementById('descripcionAlojamiento').innerText = alojamiento.descripcion;
        document.getElementById('ciudadAlojamiento').innerText = alojamiento.ciudad;
        document.getElementById('direccionAlojamiento').innerText = alojamiento.direccion;
        document.getElementById('precioAlojamiento').innerText = alojamiento.precio;
    } catch (error) {
        console.error('Error al cargar la información del alojamiento:', error);
    }
}

// Configurar y cargar el calendario con los días ocupados
// Configurar y cargar el calendario con los días ocupados
document.addEventListener('DOMContentLoaded', async function () {
    await cargarInformacionAlojamiento();

            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',  // Vista inicial (mes)
            locale: 'es',
            headerToolbar: {
                left: 'prev,next',  // Solo mostrar las flechas de navegación
                center: 'title',    // Título del mes en el centro
                right: ''  
                },
        events: async function (fetchInfo, successCallback, failureCallback) {
            try {
                // Realizar la solicitud a la API para obtener las fechas ocupadas
                const response = await axios.get(`http://localhost:8081/api/v1/estudiantes/alojamiento/${idAlojamiento}`);
                
                // Transformar los datos en eventos para el calendario
                const events = response.data.map(reserva => {
                    return {
                        id: reserva.id,
                        title: 'Ocupado',
                        start: reserva.fechaInicio,
                        end: reserva.fechaFin,
                        color: '#ff4d4f' // Rojo para indicar ocupación
                    };
                });
                successCallback(events);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
                failureCallback(error);
            }
        },
        eventColor: '#ff4d4f',  // Define un color por defecto para los eventos
        eventTextColor: '#fff', // Color del texto del evento
        height: 'auto',         // Se ajusta la altura automáticamente
    });

    calendar.render();
});


/*FIN CALENDARIO*/

document.head.appendChild(style);

document.getElementById('change-language-button').addEventListener('click', changeLanguage);

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
    const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Tu clave de suscripción
    const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Tu endpoint
    const region = 'southcentralus'; // Región
    
    if (confirm('Do you want to change the language?')) {
        if (selectedLanguage === 'english') {
            // Traduce el contenido de español a inglés
            const translatedText = await translateText(originalContent, 'es', 'en', subscriptionKey, endpoint, region);
            document.documentElement.innerHTML = translatedText; // Reemplaza el contenido con la traducción
            localStorage.setItem('preferredLanguage', 'english'); // Guarda la preferencia en localStorage
            updateLanguageSelector('english');
            assignEventListeners(); // Reasignar event listeners después de la traducción
        } else if (selectedLanguage === 'español') {
            // Restaura el contenido original en español
            document.documentElement.innerHTML = originalContent;
            localStorage.setItem('preferredLanguage', 'español'); // Guarda la preferencia en localStorage
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

function applyPreferredLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage === 'english') {
        changeLanguageToEnglish(); // Traduce automáticamente al inglés
    } else if (savedLanguage === 'español') {
        changeLanguageToSpanish(); // Restaura el contenido original en español
    }
}

// Llama a esta función cuando cargue la página
document.addEventListener('DOMContentLoaded', applyPreferredLanguage);


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
  
  // Modo para ceguera (Integra mejor el sitio con lectores de pantalla)
  function toggleBlindnessMode(isEnabled) {
    if (isEnabled) {
        document.body.setAttribute('aria-hidden', 'false');
    } else {
        document.body.setAttribute('aria-hidden', 'true');
    }
  }
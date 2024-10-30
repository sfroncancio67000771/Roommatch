let originalContent = document.documentElement.innerHTML; 

assignEventListeners();
checkVisualDisabilityMode();


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
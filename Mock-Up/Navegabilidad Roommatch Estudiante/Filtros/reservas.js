assignEventListeners();
checkVisualDisabilityMode();
let originalContent = document.documentElement.innerHTML;


const apiUrl = 'http://localhost:8081/api/v1/estudiantes/reservas';
const cancelApiUrl = 'http://localhost:8081/api/v1/estudiantes/cancelar/'; // API para cancelar reservas

// Función para cargar las reservas desde la API
function cargarReservas() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las reservas: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById("reservasTable");
            tableBody.innerHTML = ''; // Limpiar cualquier fila anterior

            if (data.length > 0) {
                data.forEach(reserva => {
                    const idReserva = reserva.idReserva || 'No disponible';
                    const correoEstudiante = reserva.correoEstudiante || 'No disponible';
                    const alojamiento = reserva.alojamiento ? reserva.alojamiento.nombreAlojamiento : 'No disponible';
                    const fechaInicio = new Date(reserva.fechaInicio);
                    const fechaFin = new Date(reserva.fechaFin);
                    const estadoReserva = reserva.estadoReserva ? reserva.estadoReserva.estadoReserva : 'No disponible';

                    const row = tableBody.insertRow();
                    row.innerHTML = `
                      <td>${idReserva}</td>
                      <td>${correoEstudiante}</td>
                      <td>${alojamiento}</td>
                      <td>${fechaInicio.toLocaleDateString()}</td>
                      <td>${fechaFin.toLocaleDateString()}</td>
                      <td>${estadoReserva}</td>
                      <td>
                          <button class="cancelar" onclick="cancelarReserva(${idReserva}, '${fechaInicio.toISOString()}', '${fechaFin.toISOString()}', '${estadoReserva}')">Cancelar</button> <!-- Botón de cancelar -->
                      </td>
                    `;
                });
            } else {
                const row = tableBody.insertRow();
                row.innerHTML = `<td colspan="7">No hay reservas disponibles.</td>`;
            }
        })
        .catch(error => {
            console.error("Error al cargar las reservas:", error);
            document.getElementById("errorMessage").style.display = "block";
            document.getElementById("errorMessage").innerText = "Hubo un error al cargar las reservas: " + error.message;
        });
}

// Función para cancelar la reserva
function cancelarReserva(idReserva, fechaInicio, fechaFin, estadoReserva) {
    const fechaActual = new Date();
    const fechaInicioReserva = new Date(fechaInicio);
    const fechaFinReserva = new Date(fechaFin);

    // Verificar si la reserva está en curso
    if (fechaActual >= fechaInicioReserva && fechaActual <= fechaFinReserva) {
        alert("No se puede cancelar una reserva en curso.");
        return;
    }

    // Verificar si la reserva ya está cancelada
    if (estadoReserva === 'cancelada') {
        alert("Esta reserva ya ha sido cancelada.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
    if (confirmacion) {
        fetch(cancelApiUrl + idReserva, {
            method: 'POST', // Usamos POST o PUT según lo que indique el backend
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estadoReserva: 'cancelada' }) // Enviar el estado 'cancelada'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    // Mostrar el error detallado del backend
                    alert("Error al cancelar la reserva: " + (errorData.message || errorData.error || "No se pudo cancelar la reserva."));
                });
            } else {
                alert("Reserva cancelada exitosamente.");
                cargarReservas(); // Recargar la tabla después de cancelar la reserva
            }
        })
        .catch(error => {
            console.error("Error al cancelar la reserva:", error);
            alert("Hubo un error al intentar cancelar la reserva: " + error.message);
        });
    }
}

// Llamar a la función para cargar las reservas cuando se cargue la página
cargarReservas();

// Aqui empieza lo que hizo Ally, lo tocan y los castro *corazoncito* 

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
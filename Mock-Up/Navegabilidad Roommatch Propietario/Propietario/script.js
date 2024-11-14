assignEventListeners();
checkVisualDisabilityMode();

// Selecciona todos los elementos que se pueden arrastrar
const draggables = document.querySelectorAll('.card');
const container = document.querySelector('.overview-cards');

// Añadir eventos de arrastrar a los elementos
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

// Añadir eventos al contenedor para soltar los elementos
// Cuando el card es soltado, agrega la clase 'moved' para la animación de rebote
container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const dragging = document.querySelector('.dragging');
    
    if (afterElement == null) {
        container.appendChild(dragging);
    } else {
        container.insertBefore(dragging, afterElement);
    }
    
    // Añadir la clase 'moved' para animar el card
    dragging.classList.add('moved');
    
    // Eliminar la clase 'moved' después de que la animación termine
    setTimeout(() => {
        dragging.classList.remove('moved');
    }, 300); // 300ms es el tiempo de la animación de rebote
});


// Función para determinar la posición en la que se debe soltar el elemento
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Aqui empieza lo que hizo Ally, lo tocan y los castro *corazoncito* 

let originalContent = document.documentElement.innerHTML;

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
  
  document.addEventListener("DOMContentLoaded", () => {
    // Obtener datos de la API para el resumen de habitaciones
    fetch(`http://localhost:8081/api/v1/propietarios/habitaciones/conteo?idPropietario=1027150257`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("habitacionesDisponibles").textContent = data.totalHabitaciones - data.habitacionesReservadas;
            document.getElementById("habitacionesOcupadas").textContent = data.habitacionesReservadas;

            // Renderizar gráfico de habitaciones
            renderHabitacionesChart(data.totalHabitaciones, data.habitacionesReservadas);
        })
        .catch(error => console.error("Error al obtener el conteo de habitaciones:", error));
        
        // Función para el gráfico de habitaciones
        function renderHabitacionesChart(total, reservadas) {
            const ctx = document.getElementById("habitacionesChart").getContext("2d");
            new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Disponibles", "Ocupadas"],
                    datasets: [{
                        data: [total - reservadas, reservadas],
                        backgroundColor: ["#4CAF50", "#FF5722"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
            
        }

});

// La función que obtiene y grafica los datos
async function obtenerDatos() {
    try {
        const response = await fetch('http://localhost:8081/api/v1/propietarios/habitaciones/precios?idPropietario=1027150257');
        if (!response.ok) throw new Error("Error al obtener datos");
        
        const data = await response.json();
        
        // Procesa los datos para el gráfico
        const nombresHabitaciones = data.map(item => item[0]);
        const preciosHabitaciones = data.map(item => item[1]);

        generarGrafico(nombresHabitaciones, preciosHabitaciones);
    } catch (error) {
        console.error(error);
    }
}

function generarGrafico(nombres, precios) {
    const ctx = document.getElementById('precioHabitacionesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Precio de la Habitación (COP)',
                data: precios,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Precio (COP)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Habitación'
                    }
                }
            }
        }
    });
}

// Llama a la función obtenerDatos cuando el DOM haya cargado
document.addEventListener('DOMContentLoaded', obtenerDatos);

// Función para cargar las reservas desde la API
function cargarReservas() {
    fetch('http://localhost:8081/api/v1/estudiantes/reservas')
        .then(response => response.json())
        .then(data => {
            const reservasRecientesDiv = document.getElementById("reservasRecientes");
            reservasRecientesDiv.innerHTML = ''; // Limpiar cualquier reserva anterior

            if (data.length > 0) {
                data.forEach(reserva => {
                    // Validar que los datos están presentes
                    const correoEstudiante = reserva.correoEstudiante || 'No disponible';
                    const fechaInicio = new Date(reserva.fechaInicio).toLocaleDateString();
                    const fechaFin = new Date(reserva.fechaFin).toLocaleDateString();

                    // Crear el contenido HTML para cada reserva
                    const reservaDiv = document.createElement("div");
                    reservaDiv.classList.add("reserva-item");

                    reservaDiv.innerHTML = `
                        <p><strong>Correo:</strong> ${correoEstudiante}</p>
                        <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
                        <p><strong>Fecha de Fin:</strong> ${fechaFin}</p>
                    `;

                    // Agregar la reserva a la tarjeta
                    reservasRecientesDiv.appendChild(reservaDiv);
                });
            } else {
                reservasRecientesDiv.innerHTML = `<p>No hay reservas recientes.</p>`;
            }
        })
        .catch(error => {
            console.error("Error al cargar las reservas:", error);
            document.getElementById("errorMessage").style.display = "block";
        });
}

// Llamar a la función para cargar las reservas cuando se cargue la página
cargarReservas();

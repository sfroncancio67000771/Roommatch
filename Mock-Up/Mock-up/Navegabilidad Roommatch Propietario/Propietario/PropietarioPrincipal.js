let originalContent = document.documentElement.innerHTML;

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización cuando el DOM está cargado
    assignEventListeners();
    initializeAccessibility();
    initializeLanguage();
});

// Función para asignar los event listeners necesarios
function assignEventListeners() {
    setupAccessibilityButton();
    setupProtectedLinks();
    setupDragAndDrop();
}

function setupAccessibilityButton() {
    const accessibilityButton = document.getElementById('accessibility-button');
    const popup = document.getElementById('accessibility-popup');
    const contrastToggle = document.getElementById('contrast-toggle');

    if (accessibilityButton && popup) {
        // Configurar botón de accesibilidad
        accessibilityButton.addEventListener('click', function(event) {
            popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
            event.stopPropagation();
        });

        // Cerrar popup al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (popup && !popup.contains(event.target) && event.target.id !== 'accessibility-button') {
                popup.style.display = 'none';
            }
        });

        // Configurar toggle de alto contraste
        if (contrastToggle) {
            contrastToggle.addEventListener('click', toggleHighContrast);
        }
    }
}

function setupProtectedLinks() {
    document.querySelectorAll('.protected-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const isLoggedIn = false; // Cambia esto según tu lógica de autenticación

            if (!isLoggedIn) {
                alert('Por favor, inicie sesión primero para poder acceder a los recursos de propietario.');
                window.location.href = "http://127.0.0.1:5501/Navegabilidad%20Roommatch%20Propietario/Propietario/PropietarioPrincipal.html";
            } else {
                window.location.href = link.href;
            }
        });
    });
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll('.card');
    const container = document.querySelector('.overview-cards');
    
    if (draggables.length > 0 && container) {
        draggables.forEach(draggable => {
            draggable.setAttribute('draggable', true);
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (dragging) {
                if (afterElement == null) {
                    container.appendChild(dragging);
                } else {
                    container.insertBefore(dragging, afterElement);
                }
            }
        });
    }
}

// Inicialización de accesibilidad
function initializeAccessibility() {
    // Restaurar configuración de contraste guardada
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
}

// Inicialización de idioma
function initializeLanguage() {
    const languageButton = document.getElementById('change-language-button');
    const languageSelect = document.getElementById('language-select');

    if (languageButton) {
        languageButton.addEventListener('click', changeLanguage);
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', changeLanguage);
    }

    // Restaurar idioma guardado
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        updateLanguageSelector(savedLanguage);
    }
}

async function changeLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;

    const selectedLanguage = languageSelect.value;
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'español';

    if (selectedLanguage === currentLanguage) return;

    if (confirm('¿Desea cambiar el idioma? / Do you want to change the language?')) {
        try {
            showLoadingIndicator();

            if (selectedLanguage === 'english') {
                await translatePageContent('es', 'en');
            } else {
                await translatePageContent('en', 'es');
            }

            localStorage.setItem('preferredLanguage', selectedLanguage);
            updateLanguageSelector(selectedLanguage);
            showNotification('Idioma cambiado exitosamente / Language changed successfully');
        } catch (error) {
            console.error('Error al cambiar el idioma:', error);
            showNotification('Error al cambiar el idioma / Error changing language');
        } finally {
            hideLoadingIndicator();
        }
    }
}

async function translateLanguageText(content, fromLang, toLang) {
    const subscriptionKey = 'be794794b3d24c829dada77ca1b831bf';
    const endpoint = 'https://api.cognitive.microsofttranslator.com';
    const region = 'eastus';

    const url = `${endpoint}/translate?api-version=3.0&from=${fromLang}&to=${toLang}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ 'Text': content }])
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data[0]?.translations[0]?.text || content;
    } catch (error) {
        console.error('Error en la traducción:', error);
        return content;
    }
}

async function translatePageContent(fromLang, toLang) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');
    if (!elementsToTranslate.length) return;

    for (const element of elementsToTranslate) {
        const originalText = element.textContent.trim();
        if (originalText) {
            const translatedText = await translateLanguageText(originalText, fromLang, toLang);
            if (translatedText) {
                element.textContent = translatedText;
            }
        }
    }
}

function updateLanguageSelector(currentLanguage) {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;

    languageSelect.innerHTML = `
        <option value="español" ${currentLanguage === 'español' ? 'selected' : ''}>Español</option>
        <option value="english" ${currentLanguage === 'english' ? 'selected' : ''}>English</option>
    `;
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    
    const message = document.body.classList.contains('high-contrast') 
        ? 'Modo de alto contraste activado' 
        : 'Modo de alto contraste desactivado';
    showNotification(message);
}

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

// Funciones de utilidad
function showLoadingIndicator() {
    let loader = document.getElementById('language-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'language-loader';
        loader.className = 'loader';
        loader.innerHTML = 'Cargando... / Loading...';
        document.body.appendChild(loader);
    }
    loader.style.display = 'block';
}

function hideLoadingIndicator() {
    const loader = document.getElementById('language-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
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

    // Obtener datos de la API para el rendimiento mensual
    fetch(`http://localhost:8081/api/v1/propietarios/rendimiento/mensual?idPropietario=1027150257`) // Ajusta esta URL según tu API
        .then(response => response.json())
        .then(data => {
            document.getElementById("promedioIngresos").textContent = data.promedioIngresos;
            renderRendimientoChart(data.ingresosMensuales);
        })
        .catch(error => console.error("Error al obtener rendimiento mensual:", error));
});

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

// Función para el gráfico de rendimiento
function renderRendimientoChart(ingresosMensuales) {
    const ctx = document.getElementById("rendimientoChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ingresosMensuales.map(m => m.mes),  // Ajusta según tu estructura de datos
            datasets: [{
                label: "Ingresos Mensuales",
                data: ingresosMensuales.map(m => m.ingreso),
                backgroundColor: "#2196F3"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
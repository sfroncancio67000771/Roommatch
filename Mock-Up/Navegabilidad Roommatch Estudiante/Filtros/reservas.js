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
                                    <button onclick="cancelarReserva(${idReserva}, '${fechaInicio.toISOString()}', '${fechaFin.toISOString()}')">Cancelar</button> <!-- Botón de cancelar -->
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
        function cancelarReserva(idReserva, fechaInicio, fechaFin) {
            const fechaActual = new Date();
            const fechaInicioReserva = new Date(fechaInicio);
            const fechaFinReserva = new Date(fechaFin);

            // Verificar si la reserva está en curso
            if (fechaActual >= fechaInicioReserva && fechaActual <= fechaFinReserva) {
                alert("No se puede cancelar una reserva en curso.");
                return;
            }

            const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
            if (confirmacion) {
                fetch(cancelApiUrl + idReserva, {
                    method: 'PUT', // Usamos PUT en lugar de DELETE si la API usa este método para actualizar el estado
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ estadoReserva: 'cancelada' }) // Suponiendo que el backend requiere un cuerpo con el estado
                })
                .then(response => {
                    if (response.ok) {
                        alert("Reserva cancelada exitosamente.");
                        cargarReservas(); // Recargar la tabla después de cancelar la reserva
                    } else {
                        response.json().then(errorData => {
                            alert("Error al cancelar la reserva: " + errorData.message || "No se pudo cancelar la reserva.");
                        });
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

        let originalContent = '';
const subscriptionKey = '9yx7VrxVz43ZJOtegDLFrZtPFVplyExTIbao2LCzKDSeim2Y9yWrJQQJ99AJACLArgHXJ3w3AAAbACOG8B8A'; // Your subscription key
const endpoint = 'https://api.cognitive.microsofttranslator.com'; // Your endpoint
const region = 'southcentralus'; // Region

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('change-language-button').addEventListener('click', changeLanguage);
  applyFilters(); // Initialize filters on page load
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

    // Apply filters cumulatively
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

    // Show or hide the item based on the cumulative filter result
    item.style.display = isVisible ? 'block' : 'none';
  });
}

// Apply filters every time a filter option is changed
document.querySelectorAll('.filter-bar select, .filter-bar input').forEach(filter => {
  filter.addEventListener('change', applyFilters);
});

// Assign event listeners after translating the page or changing the language
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

assignEventListeners();
checkVisualDisabilityMode();

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






function validarNumero(event) {
    if (!/^\d+$/.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
}

// Validación de campos vacíos y correo electrónico
function validarCampoVacio(input) {
    const inputContainer = input.closest('.input-container');
    if (!input.value.trim()) {
        inputContainer.classList.add('invalid');
    } else {
        inputContainer.classList.remove('invalid');
    }
}

function validarEmail(input) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const inputContainer = input.closest('.input-container');
    if (!emailPattern.test(input.value)) {
        inputContainer.classList.add('invalid');
    } else {
        inputContainer.classList.remove('invalid');
    }
}

// Función para asignar validaciones a los campos (estáticos y dinámicos)
function agregarValidaciones() {
    document.querySelectorAll('.input-container input').forEach(input => {
        input.addEventListener('blur', function () {
            if (input.type === 'email') {
                validarEmail(input);
            } else {
                validarCampoVacio(input);
            }
        });

        input.addEventListener('input', function () {
            const inputContainer = input.closest('.input-container');
            inputContainer.classList.remove('invalid');
        });
    });
}

// Función para generar los campos dinámicos según el rol
function updateFields() {
    const role = document.getElementById('role').value;
    const dynamicFields = document.getElementById('dynamic-fields');

    dynamicFields.innerHTML = ''; // Limpiar los campos anteriores

    if (role === "estudiante") {
        dynamicFields.innerHTML = `
            <div class="input-container">
                <input type="text" id="codigo" onkeypress="validarNumero(event)" required>
                <label for="codigo">Código Estudiante</label>
                <span class="error-message"></span>
            </div>
            <div class="input-container">
                <input type="number" id="edad" required>
                <label for="edad">Edad</label>
                <span class="error-message"></span>
            </div>
            <div class="input-container">
                <input type="email" id="email" required>
                <label for="email">Correo Electrónico</label>
                <span class="error-message"></span>
            </div>`;
    } else if (role === "propietario") {
        dynamicFields.innerHTML = `
            <div class="input-container">
                <input type="text" id="idPropietario" onkeypress="validarNumero(event)" required>
                <label for="idPropietario">Identificación</label>
                <span class="error-message"></span>
            </div>
            <div class="input-container">
                <input type="email" id="email" required>
                <label for="email">Correo Electrónico</label>
                <span class="error-message"></span>
            </div>`;
    }

    // Asignar validaciones a los campos recién generados
    agregarValidaciones();
}

function validarContraseñas(contraseña, confirmarContraseña) {
    const inputContainer = confirmarContraseña.closest('.input-container');
    if (contraseña.value !== confirmarContraseña.value) {
        inputContainer.classList.add('invalid');
        return false; // Contraseñas no coinciden
    } else {
        inputContainer.classList.remove('invalid');
        return true; // Contraseñas coinciden
    }
}

// Asignar validaciones a los campos estáticos una vez que se carga la página
document.addEventListener('DOMContentLoaded', function () {
    agregarValidaciones(); // Esto se aplica a los campos estáticos iniciales
});

// Validar todos los campos al enviar el formulario
document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
        if (input.type === 'email') {
            validarEmail(input);
        } else {
            validarCampoVacio(input);
        }
    });
    
    if (document.querySelector('.input-container.invalid')) {
        // Mostrar mensaje de error si hay campos inválidos
        document.getElementById('respuesta').innerText = 'Por favor, corrige los errores en el formulario.';
        document.getElementById('respuesta').style.color = 'red';
    } else {
        // Aquí iría el código para enviar el formulario
        document.getElementById('respuesta').innerText = 'Formulario enviado correctamente';
        document.getElementById('respuesta').style.color = 'green';
    }
});


document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.input-container input');
    let valid = true; // Variable para verificar la validez de los campos

    inputs.forEach(input => {
        if (input.type === 'email') {
            validarEmail(input);
        } else {
            validarCampoVacio(input);
        }
    });

    // Validar contraseñas si existen
    const contraseña = document.getElementById('contraseña');
    const confirmarContraseña = document.getElementById('confirmarContraseña');
    
    if (contraseña && confirmarContraseña) {
        valid = validarContraseñas(contraseña, confirmarContraseña) && valid;
    }

    if (document.querySelector('.input-container.invalid') || !valid) {
        // Mostrar mensaje de error si hay campos inválidos
        document.getElementById('respuesta').innerText = 'Por favor, corrige los errores en el formulario.';
        document.getElementById('respuesta').style.color = 'red';
    } else {
        // Aquí iría el código para enviar el formulario
        document.getElementById('respuesta').innerText = 'Formulario enviado correctamente';
        document.getElementById('respuesta').style.color = 'green';
    }
});


// Manejar el envío de datos al servidor
document.getElementById('miFormulario').addEventListener('submit', function(e) {
    e.preventDefault();

    // Determinar el rol seleccionado
    const role = document.getElementById('role').value;
    let datos;

    if (role === "estudiante") {
        // Obtener los valores del formulario para estudiante
        const codigo = document.getElementById('codigo').value;
        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const contraseña = document.getElementById('contraseña').value;

        // Validar el correo electrónico
        const emailPattern = /^[a-zA-Z0-9._%+-]+@ucatolica\.edu\.co$/;
        if (!emailPattern.test(email)) {
            document.getElementById('respuesta').textContent = 'El correo electrónico debe ser de @ucatolica.edu.co';
            return;
        }

        // Crear objeto de datos para estudiante
        datos = {
            codigo: codigo,
            nombre: nombre,
            edad: edad,
            email: email,
            telefono: telefono,
            contraseña: contraseña
        };
    } else if (role === "propietario") {
        // Obtener los valores del formulario para propietario
        const idPropietario = document.getElementById('idPropietario').value;
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const contraseña = document.getElementById('contraseña').value;

        // Crear objeto de datos para propietario
        datos = {
            idPropietario: idPropietario,
            nombre: nombre,
            email: email,
            contraseña: contraseña,
            telefono: telefono
        };
    }

    // Enviar los datos al servidor
    fetch(`http://localhost:8081/api/v1/${role === 'estudiante' ? 'estudiantes' : 'propietarios'}/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            document.getElementById('miFormulario').reset();
            document.getElementById('respuesta').textContent = role === 'estudiante' 
                ? '¡Estudiante Registrado Exitosamente!' 
                : '¡Propietario Registrado Exitosamente!';
            console.log('Success:', data);
        } catch (e) {
            document.getElementById('respuesta').textContent = 'Error al enviar el formulario: Respuesta del servidor no es JSON';
            console.error('Error en el formato de respuesta, no es JSON', text);
        }
    })
    .catch(error => {
        document.getElementById('respuesta').textContent = 'Error al enviar el formulario: ' + error.message;
        console.error('Error en el envio del formulario:', error);
    });
});

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
  
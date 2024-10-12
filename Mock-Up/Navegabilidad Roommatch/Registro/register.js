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

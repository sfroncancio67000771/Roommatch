function validarNumero(event) {
    if (!/^\d+$/.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
}

function updateFields() {
    const role = document.getElementById('role').value;
    const dynamicFields = document.getElementById('dynamic-fields');

    if (role === "estudiante") {
        dynamicFields.innerHTML = `
            <input type="text" id="codigo" placeholder="Código Estudiante" onkeypress="validarNumero(event)" required>
            <input type="text" id="nombre" placeholder="Nombre Completo" required>
            <input type="number" id="edad" placeholder="Edad" required>
            <input type="email" id="email" placeholder="Correo electrónico" required>
            <input type="text" id="telefono" placeholder="Teléfono" onkeypress="validarNumero(event)" required>
            <input type="password" id="contraseña" placeholder="Contraseña" required>
        `;
    } else if (role === "propietario") {
        dynamicFields.innerHTML = `
            <input type="text" id="idPropietario" placeholder="Identificación" onkeypress="validarNumero(event)" required>
            <input type="text" id="nombrePropietario" placeholder="Nombre Completo" required>
            <input type="email" id="emailPropietario" placeholder="Correo electrónico" required>
            <input type="text" id="telefonoPropietario" placeholder="Teléfono" onkeypress="validarNumero(event)" required>
            <input type="password" id="contraseñaPropietario" placeholder="Contraseña" required>
        `;
    } else {
        dynamicFields.innerHTML = ''; // Limpia los campos si no hay selección
    }
}

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
        const nombrePropietario = document.getElementById('nombrePropietario').value;
        const idPropietario = document.getElementById('idPropietario').value;
        const emailPropietario = document.getElementById('emailPropietario').value;
        const telefonoPropietario = document.getElementById('telefonoPropietario').value;
        const contraseñaPropietario = document.getElementById('contraseñaPropietario').value;

        // Crear objeto de datos para propietario
        datos = {
            idPropietario: idPropietario,
            nombre: nombrePropietario,
            email: emailPropietario,
            contraseña: contraseñaPropietario,
            telefono: telefonoPropietario
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

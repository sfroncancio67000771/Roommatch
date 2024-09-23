 document.getElementById('miFormulario').addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener los valores del formulario
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

            // Crear un objeto con los datos del formulario
            const datos = {
                codigo: codigo,
                nombre: nombre,
                edad: edad,
                email: email,
                telefono: telefono,
                contraseña: contraseña
            };

            // Enviar los datos al servidor
            fetch('http://localhost:8081/api/v1/estudiantes/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            .then(response => response.text())  // Leer la respuesta como texto
            .then(text => {
                try {
                    const data = JSON.parse(text);  // Intentar parsear la respuesta como JSON
                    // Limpiar los campos del formulario
                    document.getElementById('miFormulario').reset();

                    // Mostrar el mensaje de éxito
                    document.getElementById('respuesta').textContent = '¡Formulario enviado con éxito!';
                    console.log('Success:', data);
                } catch (e) {
                    // Mostrar el mensaje de error si la respuesta no es JSON
                    document.getElementById('respuesta').textContent = 'Error al enviar el formulario: Respuesta del servidor no es JSON';
                    console.error('Error en el formato de respuesta, no es JSON', text );
                }
            })
            .catch(error => {
                // Mostrar el mensaje de error
                document.getElementById('respuesta').textContent = 'Error al enviar el formulario: ' + error.message;
                console.error('Error en el envio del formulario:', error);
            });
        });
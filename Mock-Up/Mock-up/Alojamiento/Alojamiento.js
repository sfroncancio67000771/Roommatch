document.getElementById('alojamientoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const precio = document.getElementById('precio').value;
    const idPropietario = document.getElementById('idPropietario').value;
    const tipoAlojamientoId = document.getElementById('tipoAlojamiento').value;
    const tieneLavanderia = document.getElementById('tieneLavanderia').checked;
    const tieneRoomie = document.getElementById('tieneRoomie').checked;
    const tieneParqueaderoBicicleta = document.getElementById('tieneParqueaderoBicicleta').checked;

    // Crear un objeto con los datos del formulario
    const datos = {
        nombreAlojamiento: nombre,
        descripcion: descripcion,
        direccion: direccion,
        ciudad: ciudad,
        precio: parseFloat(precio), // Asegúrate de que el precio sea un número
        idPropietario: parseInt(idPropietario, 10), // Asegúrate de que idPropietario sea un número
        tipoAlojamientoId: parseInt(tipoAlojamientoId, 10), // Asegúrate de que tipoAlojamientoId sea un número
        tieneLavanderia: tieneLavanderia,
        tieneRoomie: tieneRoomie,
        tieneParqueaderoBicicleta: tieneParqueaderoBicicleta
    };

    // Enviar los datos al servidor
    fetch('http://localhost:8081/api/v1/propietarios/crearhab', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            document.getElementById('alojamientoForm').reset();
            document.getElementById('respuesta').textContent = '¡Habitación registrada con éxito!';
            console.log('Success:', data);
        } catch (e) {
            document.getElementById('respuesta').textContent = 'Error al registrar: Respuesta del servidor no es JSON';
            console.error('Error en el formato de respuesta, no es JSON', text);
        }
    })
    .catch(error => {
        document.getElementById('respuesta').textContent = 'Error al registrar: ' + error.message;
        console.error('Error en el envío del formulario:', error);
    });
});

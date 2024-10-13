$(document).ready(function() {
    // Cargar alojamientos al cargar la página
    $.ajax({
        url: 'http://localhost:8081/api/v1/alojamiento/filtrar', // Cambia esta URL si es necesario
        method: 'GET',
        success: function(data) {
            console.log("Datos recibidos:", data);
            if (Array.isArray(data)) {
                data.forEach(alojamiento => {
                    $('#selectAlojamientos').append(
                        $('<option>', {
                            value: alojamiento.idAlojamiento,
                            text: alojamiento.nombreAlojamiento // Solo el nombre del alojamiento
                        }).data('descripcion', alojamiento.descripcion) // Agregar la descripción como dato
                    );
                });
            } else {
                console.error("Los datos no son un arreglo.");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la petición:", error);
            $('#mensaje').text("Error al cargar los alojamientos.");
        }
    });

    // Muestra la descripción del alojamiento seleccionado en el recuadro
    $('#selectAlojamientos').change(function() {
        const selectedId = $(this).val();
        const selectedOption = $(this).find('option:selected');
        const descripcion = selectedOption.data('descripcion');

        if (selectedId) {
            $('#descripcionTexto').text(descripcion || 'Descripción no disponible.'); // Mostrar descripción en el recuadro
            $('#descripcionAlojamiento').show(); // Mostrar el recuadro
        } else {
            $('#descripcionTexto').text(''); // Limpiar el texto si no hay selección
            $('#descripcionAlojamiento').hide(); // Ocultar el recuadro si no hay selección
        }
    });

    // Validar campos al salir de ellos
    $('#reservaForm input[required], #reservaForm select[required]').on('blur', function() {
        validateField($(this));
    });

    // Manejar el envío del formulario
    $('#reservaForm').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Validar todos los campos antes de enviar
        $('#reservaForm input[required], #reservaForm select[required]').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (isValid) {
            const reservaDTO = {
                idAlojamiento: $('#selectAlojamientos').val(),
                emailEstudiante: $('#emailEstudiante').val(),
                fechaInicio: $('#fechaInicio').val(),
                fechaFin: $('#fechaFin').val()
            };

            $.ajax({
                url: 'http://localhost:8081/api/v1/estudiantes/crear', // Cambia esta URL si es necesario
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reservaDTO),
                success: function(response) {
                    $('#mensajeExito').text("Reserva creada con éxito: " + response.mensaje).show(); // Muestra el mensaje de éxito
                    $('#reservaForm')[0].reset(); // Limpiar el formulario después de enviar
                    $('#descripcionAlojamiento').hide(); // Ocultar el recuadro de descripción
                    $('#mensaje').hide(); // Ocultar mensaje de error si lo hay
                },
                error: function(xhr, status, error) {
                    const response = JSON.parse(xhr.responseText);
                    $('#mensaje').text(response.error || "Error al crear la reserva.").show(); // Muestra error si existe
                    $('#mensajeExito').hide(); // Ocultar mensaje de éxito si lo hay
                }
            });
        }
    });
});

function validateField(field) {
    const errorMessage = field.attr('id') === 'selectAlojamientos' ? 'Campo obligatorio' : 'Campo obligatorio';
    const errorDiv = $('#error-' + field.attr('id'));

    if (!field.val()) {
        field.addClass('error'); // Agregar clase de error
        errorDiv.text(errorMessage); // Mostrar mensaje de error
        return false; // Campo inválido
    } else {
        field.removeClass('error'); // Limpiar error si el campo está lleno
        errorDiv.text(''); // Limpiar el mensaje de error
        return true; // Campo válido
    }
}
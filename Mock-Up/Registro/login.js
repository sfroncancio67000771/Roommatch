function abrirVentana(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del enlace
    window.open(
        'register.html', // URL de la página
        'popup', // Nombre de la ventana (puede ser cualquier nombre)
        'width=800,height=800' // Dimensiones de la nueva ventana
    );
}
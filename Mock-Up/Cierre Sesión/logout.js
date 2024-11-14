
        // Primero redirige a GitHub para cerrar sesión
        window.location.href = "https://github.com/logout";

        // Luego de 10 segundos, redirige a la página principal de Roommatch
        setTimeout(function() {
            window.location.href = "http://127.0.0.1:5501/Navegabilidad%20Roommatch/Pagina%20principal/Espa%C3%B1ol.html";
        }, 10000); // 10000 milisegundos = 10 segundos

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    var searchTerm = document.getElementById('searchInput').value; // Captura el valor del campo de búsqueda

    // Agrega el término de búsqueda como un parámetro en la URL y redirige a busqueda.html
    window.location.href = 'busqueda.html?search=' + encodeURIComponent(searchTerm);
});


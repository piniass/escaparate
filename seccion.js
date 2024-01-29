window.addEventListener('load', iniciar)
const url = 'relojes.json'
const video = document.getElementById('video')
const tituloProductos = document.getElementById('titulo-separador')

function iniciar() {
    // Obtener el parámetro 'categoria' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    console.log(categoria)
    cargarCategoria(categoria)
    cargarVideo(categoria)
};

function cargarCategoria(categoria){
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const relojesDeCategoria = data.relojes.filter(reloj => reloj.categoria === categoria);
            console.log(relojesDeCategoria)

            const relojesContainer = document.getElementById('relojes-container');
            relojesDeCategoria.forEach(reloj => {
                const relojDiv = document.createElement('div');
                relojDiv.innerHTML = `
                    <h2>${reloj.nombre}</h2>
                    <p>${reloj.descripcion}</p>
                    <p>Precio: $${reloj.precio}</p>
                    <p>Valoración: ${reloj.valoracion.puntuacion} (${reloj.valoracion.votos} votos)</p>
                    <img src="${reloj.imagen}" alt="${reloj.nombre}">
                `;
                relojesContainer.appendChild(relojDiv);
            });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

function cargarVideo(categoria){
    console.log('Categoria: '+categoria)
    if(categoria == "Reloj deportivo"){
        console.log("deportivoss")
        video.setAttribute('src', 'video/video-deportivo.mp4')
        tituloProductos.textContent = 'Relojes deportivos'
    }
    if(categoria == "Reloj digital"){
        video.setAttribute('src', 'video/video-digital.mp4')
        tituloProductos.textContent = 'Relojes digitales'

    }
    if(categoria == "Reloj de lujo"){
        console.log("lujoss")
        video.setAttribute('src', 'video/video-lujo.mp4')
        tituloProductos.textContent = 'Relojes de lujo'


    }
    if(categoria == "Reloj analogico"){
        console.log("analogicosss")
        video.setAttribute('src', 'video/video-analogico.mp4')
        tituloProductos.textContent = 'Relojes analogicos'

    }
}
window.addEventListener('load', iniciar)
const url = 'relojes.json'
const video = document.getElementById('video')
const tituloProductos = document.getElementById('titulo-separador')
const cardSection = document.getElementById('cards-container')

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

            relojesDeCategoria.forEach(relojes => {
                cardSection.innerHTML += `
                <article class="col-12 col-md-12 col-lg-4 m-1 p-0 card">
                <div class="card-header p-0">
                        <img src="${relojes.imagen}" class="object-fit-cover imagen-carta w-100" alt="${relojes.nombre}" height="300px">
                    </div>
                    <div class="p-3">
                        <h5>${relojes.nombre}</h5>
                        <p>${relojes.descripcion}</p>
                        <p>Categoria: ${relojes.categoria}</p>
                        <p>Precio: ${relojes.precio}€</p>
                        <p>${relojes.descripcion}</p>
                        <p class="d-flex align-items-center">Valoracion: <span>${getValoracion(relojes.valoracion.puntuacion)}</span></p>
                        <button class="btn btn-warning bg-gradient boton">Añadir al carrito</button>
                    </div>
                </article>
            `;
                


function iniciar() {
    fetchCarousel();
    fetchCard()
}

function fetchCarousel() {
    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => loadCarousel(data))
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function fetchCard(){
    fetch(url)
        .then(res=>res.json())
        .then(data=>createCards(data))
        .then(() => {
            // Llama a anadirCarrito después de crear las tarjetas
            anadirCarrito();
        });
}

function loadCarousel(data) {
    for (let i = 0; i < imgCarousel.length; i++) {
        let relojes = data.relojes[i]; 
        imgCarousel[i].setAttribute('src', relojes.imagen);
        // console.log(imgCarousel[i]);
    }
}
function createCards(data) {
    let cartas = 3
    for (let i = 0; i < cartas; i++) {
        let relojes = data.relojes[i];
        cardSection.innerHTML += `
            <article class="col-12 m-1 p-0 card">
                <div class="card-header p-0">
                    <img src="${relojes.imagen}" class="object-fit-cover imagen-carta" alt="${relojes.nombre}" height="300px">
                </div>
                <div class="p-3">
                    <h5>${relojes.nombre}</h5>
                    <p>${relojes.descripcion}</p>
                    <p>Categoria: ${relojes.categoria}</p>
                    <p>Precio: ${relojes.precio}€</p>
                    <p>${relojes.descripcion}</p>
                    <p class="d-flex align-items-center">Valoracion: <span>${getValoracion(relojes.valoracion.puntuacion)}</span></p>
                    <button class="btn btn-warning bg-gradient boton">Añadir al carrito</button>
                </div>
            </article>
        `;
            }
            estrella.innerHTML = ''
        }

      });
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

function getValoracion(estrellas){
    console.log("valoracion:" + Math.round(estrellas))
    let long = Math.round(estrellas)
    const estrella = document.createElement('span')
    for (let index = 0; index < long; index++) {
        estrella.innerHTML += '<span class="material-symbols-outlined text-warning ">star</span>'

        
     }
     estrella.classList.add('material-symbols-outlined')
    return estrella.innerHTML
}

function anadirCarrito() {
    // Convierte el HTMLCollection a un array
    const btnArray = [...btnAnadir];

    // Ahora puedes utilizar forEach en el array
    btnArray.forEach(btn => {
        btn.addEventListener('click', function() {
            // Acciones a realizar cuando se hace clic en el botón
            console.log(btn);
        });
    });
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



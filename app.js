window.addEventListener('load', iniciar);
const div = document.getElementsByTagName('div')[0];
const imgCarousel = document.getElementsByClassName('img-carousel')
const cardSection = document.getElementById('cardSection')
const url = 'relojes.json';
const btnAnadir = document.getElementsByClassName('boton')


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
        console.log(imgCarousel[i]);
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
                    <button class="btn btn-warning bg-gradient boton">Añadir al carrito</button>
                </div>
            </article>
        `;
    }
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





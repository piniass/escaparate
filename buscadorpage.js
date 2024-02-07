const div = document.getElementsByTagName('div')[0];
const imgCarousel = document.getElementsByClassName('img-carousel')
const tituloCarousel = document.getElementsByClassName('titulo-carousel')
const descCarousel = document.getElementsByClassName('desc-carousel')
const cardSection = document.getElementById('cardSection')
const url = 'relojes.json';
const btnAnadir = document.getElementsByClassName('boton')
const loginIcon = document.getElementById('loginIcon')
const formSession = document.getElementById('formSession')
const closeIcon = document.getElementById('close')
const form = document.getElementById('form')
const inputNombre = document.getElementById('text')
const inputPassword = document.getElementById('password')
const btnContainer = document.getElementById('btn-container')
const carrito = document.getElementById('carrito')
const elementos = document.getElementById('elementos')
let bienvenida;
let usuario;
const relojCarrito = document.createElement('div')
let productos = []

window.addEventListener('load', iniciar);
function iniciar() {
    llamarStorage()
    crearCarritoCarga()
}

const usuarioExistente = {
    nombre: "Susana",
    contrasena: "Palomeras2024",
    mail: "susana@daw.es",
    tlf: 123456789,
    dir: "I.E.S Palomeras",
    carrito: []
}


function crearCarritoCarga(){
    var usuarioRecuperadoJSON = localStorage.getItem("usuario");
    var usuarioRecuperado = JSON.parse(usuarioRecuperadoJSON);
    if (usuarioRecuperado && usuarioRecuperado.carrito) { // Verifica si usuarioRecuperado y usuarioRecuperado.carrito son distintos de null o undefined
        fetch(url)
        .then(res => res.json())
        .then(data => {  
            for(let i = 0; i < usuario.carrito.length; i++){
                console.log(usuario.carrito[i]);

                let productoFiltrado = data.relojes.find(item => item.id == usuario.carrito[i]);
                if (productoFiltrado) {
                    productos.push(productoFiltrado);
                }
            }        
            
            productos.forEach(reloj => {
                relojCarrito.innerHTML += `
                    <div class="row">
                        <img src="${reloj.imagen}" alt="" class="col-4"/>
                        <div class="col-8">
                            <h5>${reloj.nombre}</h5>
                            <p>${reloj.precio}€</p>
                        </div>
                    </div>
                    <hr>
                `
            });
            relojCarrito.innerHTML += `
                <button type="button" class="btn btn-primary">Comprar</button>
            `
            elementos.appendChild(relojCarrito)
            console.log(relojCarrito)
        });
        } 
}



function llamarStorage(){
    if(localStorage.getItem("nombre") !== null && localStorage.getItem("nombre") !== undefined){
        usuario = {
            nombre: `${localStorage.getItem("nombre")}`,
            mail: `${localStorage.getItem("mail")}`,
            tlf: `${localStorage.getItem("tlf")}`,
            dir: `${localStorage.getItem("dir")}`,
            carrito: cargarCarrito() 
        }
        var usuarioJSON = JSON.stringify(usuario);

        // Guardar el objeto usuario en el almacenamiento local
        localStorage.setItem("usuario", usuarioJSON);
        var usuarioRecuperadoJSON = localStorage.getItem("usuario");
        var usuarioRecuperado = JSON.parse(usuarioRecuperadoJSON);
        console.log(usuarioRecuperado);

        bienvenida = true
        loginIcon.classList.add('d-none');
        const dropdown = document.createElement('div')
        dropdown.classList.add('dropdown')
        btnContainer.insertBefore(dropdown, carrito)
        dropdown.innerHTML =  `
        <button class="btn btn-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="material-symbols-outlined ms-3 icono">person</span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="perfil.html" onclick="cerrarSesion()">Ver perfil</a></li>
            <li><a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar Sesion</a></li>
        </ul>
        `
    }
}


function cargarCarrito(){
    var usuarioRecuperadoJSON = localStorage.getItem("usuario");
    var usuarioRecuperado = JSON.parse(usuarioRecuperadoJSON);

    if (usuarioRecuperado && usuarioRecuperado.carrito) { // Verifica si usuarioRecuperado y usuarioRecuperado.carrito son distintos de null o undefined
        var arrayCosas = []

        usuarioRecuperado.carrito.forEach(elemento => {
            arrayCosas.push(elemento)
        });

        return arrayCosas;
    } else {
        console.error("No se ha encontrado información de usuario en el local storage o la información es incorrecta.");
        return []; // Devuelve un array vacío en caso de que no se encuentre la información correcta
    }
}

function cerrarSesion() {
    bienvenida = false
    localStorage.removeItem("nombre")
    localStorage.removeItem("usuario")

    window.location.href = 'index.html'
}

// Obtén el parámetro de búsqueda de la URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchTerm = urlParams.get('search');
// Realiza la búsqueda en tu archivo JSON utilizando el término de búsqueda
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.relojes)
        const reloj = data.relojes
        const resultados = reloj.filter(item => {
        const nombreEnMinusculas = item.nombre.toLowerCase();
        const descripcionEnMinusculas = item.descripcion.toLowerCase();
        const categoriaEnMinusculas = item.categoria.toLowerCase();
        const searchTermEnMinusculas = searchTerm.toLowerCase();
        
            return nombreEnMinusculas.includes(searchTermEnMinusculas) ||
                   descripcionEnMinusculas.includes(searchTermEnMinusculas) ||
                   categoriaEnMinusculas.includes(searchTermEnMinusculas);
        });

        // Haz algo con los resultados, como mostrarlos en la página
        console.log(resultados);
        if(resultados.length > 0){
            createCards(resultados)
        } else {
            const nada = document.createElement('div')
            nada.classList.add('m-auto')
            nada.innerHTML = `<h2 class="text-center">No hay nada que se ajuste a tu busqueda</h2>
            <img src="img/emoji-triste.png" class="d-block mx-auto w-50">
            `
            document.getElementsByTagName('main')[0].appendChild(nada)
        }
    })
    .catch(error => console.error('Error al realizar la búsqueda:', error));

function createCards(data) {
    console.log("Me meto en crear cartas")
    console.log(data[0].imagen)
    for (let i = 0; i < data.length; i++) {
        let relojes = data[i];
        cardSection.innerHTML += `
        <div class="col-md-4 mb-3">
                    <article class="card">
                        <div class="card-header p-0">
                            <img src="${relojes.imagen}" class="object-fit-cover imagen-carta w-100" alt="${relojes.nombre}" height="300px" loading="lazy">
                        </div>
                        <div class="p-3">
                            <h5>${relojes.nombre}</h5>
                            <p>${relojes.descripcion}</p>
                            <p>Categoria: ${relojes.categoria}</p>
                            <p>Precio: ${relojes.precio}€</p>
                            <p>${relojes.descripcion}</p>
                            <p class="d-flex align-items-center">Valoracion: <span>${getValoracion(relojes.valoracion.puntuacion)}</span></p>
                            <button class="btn btn-warning bg-gradient boton" onclick="anadirCarrito('${relojes.id}')">Añadir al carrito</button>
                        </div>
                    </article>
            </div>
        `;
    }
}

function getValoracion(estrellas){
    const estrella = document.createElement('span')
    estrella.innerHTML = ''

    for (let index = 0; index < 5; index++) {
        estrella.innerHTML += '<span class="material-symbols-outlined text-warning ">star</span>'
     }
     estrella.classList.add('material-symbols-outlined')
    return estrella.innerHTML
}

function anadirCarrito(id) {
    if(localStorage.getItem("nombre") === null || localStorage.getItem("nombre") === undefined){
        const toastContainer = document.getElementById('toastContainer');

        const alerta = document.createElement('div');
        alerta.classList.add('toast');
        alerta.setAttribute('role', 'alert');
        alerta.setAttribute('aria-live', 'assertive');
        alerta.setAttribute('aria-atomic', 'true');
        alerta.setAttribute('data-bs-autohide', 'false');

        alerta.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">¡Atención!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Debes iniciar sesión para añadir productos al carrito.
            </div>
        
        `;

        toastContainer.appendChild(alerta);

        // Inicializar el toast de Bootstrap
        const toast = new bootstrap.Toast(alerta);
        toast.show();
    } else {
        console.log("Inserto")
        console.log(usuario.carrito)
        usuario.carrito.push(id)
        var usuarioJSON = JSON.stringify(usuario);
        localStorage.setItem("usuario", usuarioJSON);
        crearElementoCarrito()
        var usuarioRecuperadoJSON = localStorage.getItem("usuario");
        console.log(usuarioRecuperadoJSON);
        var usuarioRecuperado = JSON.parse(usuarioRecuperadoJSON);
        console.log(usuarioRecuperado);
    }
}

function crearElementoCarrito() {
    productos = [];
    
    // Limpiar el contenido de elementos antes de agregar los nuevos elementos del carrito
    const ultimoHijo = elementos.lastChild;

    // Verificar si hay un último hijo antes de intentar eliminarlo
    if (ultimoHijo) {
        // Eliminar el último hijo de elementos
        console.log("Ultimo hijo")

        console.log(ultimoHijo)
        elementos.removeChild(ultimoHijo);
        console.log("Elementos")
        console.log(elementos)
    } else {
        console.log("No hay elementos para eliminar.");
    }
    console.log("Productos pre fech")
            
    console.log(productos)
    fetch(url)
        .then(res => res.json())
        .then(data => {  
            for(let i = 0; i < usuario.carrito.length; i++){
                console.log(usuario.carrito[i]);

                let productoFiltrado = data.relojes.find(item => item.id == usuario.carrito[i]);
                if (productoFiltrado) {
                    productos.push(productoFiltrado);
                }
            }     

            console.log("Reloj Carrito: ")
            
            console.log(relojCarrito)
            relojCarrito.innerHTML = ''

            productos.forEach(reloj => {
                relojCarrito.innerHTML += `
                    <div class="row">
                        <img src="${reloj.imagen}" alt="" class="col-4"/>
                        <div class="col-8">
                            <h5>${reloj.nombre}</h5>
                            <p>${reloj.precio}€</p>
                        </div>
                    </div>
                    <hr>
                `
            });
            relojCarrito.innerHTML += `
                <button type="button" class="btn btn-primary">Comprar</button>
            `
            elementos.appendChild(relojCarrito)
            console.log(relojCarrito)
        });
}

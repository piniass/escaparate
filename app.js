window.addEventListener('load', iniciar);
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

function iniciar() {
    fetchCarousel();
    fetchCard()
    llamarStorage()
    crearCarritoCarga()
}

loginIcon.addEventListener('click', toggleForm)
closeIcon.addEventListener('click',closeForm)
form.addEventListener('submit', validarForm, false)

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
        crearNotificacion()
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

function crearNotificacion(){
    if(bienvenida){
        Notification.requestPermission()
        .then( resultado => {
        console.log('El resultado es ', resultado)
    mostrarNotificacion()
    })
    }   
}

function mostrarNotificacion(){
    if (Notification.permission == 'granted') {
       const notificacion = new Notification('Has llegado A tiempo!', {
    body: `Hola, ${localStorage.getItem("nombre")}, has llegado a tu hora!`,
        });
    }
    bienvenida = false
}
function validarForm(ev){
    if(inputNombre.value == usuarioExistente.nombre && inputPassword.value == usuarioExistente.contrasena){
        localStorage.setItem("nombre", `${usuarioExistente.nombre}`);
        localStorage.setItem("mail", `${usuarioExistente.mail}`);
        localStorage.setItem("tlf", `${usuarioExistente.tlf}`);
        localStorage.setItem("dir", `${usuarioExistente.dir}`);
        usuario = {
            nombre: `${localStorage.getItem("nombre")}`,
            mail: `${localStorage.getItem("mail")}`,
            tlf: `${localStorage.getItem("tlf")}`,
            dir: `${localStorage.getItem("dir")}`,
            carrito: [] 
        }
        var usuarioJSON = JSON.stringify(usuario);

        // Guardar el objeto usuario en el almacenamiento local
        localStorage.setItem("usuario", usuarioJSON);
        return true
    } else {
        ev.preventDefault()
        return false
    }
}

function toggleForm() {
    if (localStorage.getItem("nombre") === null || localStorage.getItem("nombre") === undefined) {
        formSession.classList.toggle('d-none');
        document.getElementsByTagName('body')[0].classList.toggle('overflow-hidden');
    } else {   
        console.log(localStorage.getItem("nombre"))
        console.log("Storage Almacenada")
    }
}

function closeForm(){
    formSession.classList.add('d-none')
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
}

function fetchCarousel() {
    fetch(url)
        .then(res => res.json())
        .then(data => loadCarousel(data))
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function fetchCard(){
    fetch(url)
        .then(res=>res.json())
        .then(data=>createCards(data))
        
}

function loadCarousel(data) {
    for (let i = 0; i < imgCarousel.length; i++) {
        let relojes = data.relojes[i]; 
        imgCarousel[i].setAttribute('src', relojes.imagen);
        console.log(relojes.nombre)
        tituloCarousel[i].innerHTML = relojes.nombre
        descCarousel[i].innerHTML = relojes.descripcion
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
        `;
    }
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

        // Guardar el objeto usuario en el almacenamiento local
        localStorage.setItem("usuario", usuarioJSON);
        // crearElementoCarrito(id)
        crearElementoCarrito()

        
        // Recuperar el objeto usuario del almacenamiento local
        var usuarioRecuperadoJSON = localStorage.getItem("usuario");

        console.log(usuarioRecuperadoJSON);


        var usuarioRecuperado = JSON.parse(usuarioRecuperadoJSON);

        console.log(usuarioRecuperado);


        // console.log("Precio: " + precio);
    }
}
let productos = []
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

function getValoracion(estrellas){
    const estrella = document.createElement('span')
    estrella.innerHTML = ''

    for (let index = 0; index < 5; index++) {
        estrella.innerHTML += '<span class="material-symbols-outlined text-warning ">star</span>'
     }
     estrella.classList.add('material-symbols-outlined')
    return estrella.innerHTML
}
const form = document.getElementById('form')
const nombre = document.getElementById('nombre')
const mail = document.getElementById('mail')
const pwd = document.getElementById('pwd')
const tlf = document.getElementById('tlf')
const dir = document.getElementById('dir')
const btn = document.getElementById('btn')
const main = document.getElementsByName('main')[0]
const alerta = document.getElementById('alerta')
const msg = document.getElementById('msg')




form.addEventListener('submit', validar, false)
btn.addEventListener('click',localizar)


function validar(e){
    if(validarNombre(nombre) && validarCorreo(mail) && validarContrasena(pwd) && validarNumero(tlf) && validarDir(dir)){
        localStorage.setItem("nombre", `${nombre.value}`)
        localStorage.setItem("contrasena", `${pwd.value}`)
        localStorage.setItem("mail", `${mail.value}`)
        localStorage.setItem("tlf", `${tlf.value}`)
        localStorage.setItem("dir", `${dir.value}`)

        return true
    } else {
        e.preventDefault()
        return false
    }
}


function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/u;
    if (regex.test(nombre.value.trim()) && nombre.value.trim() !== '') {
        return true;
    } else {
        let str = "El nombre es incorrecto, no puede contener números";
        desplegarAlerta(str);
        return false;
    }
}

function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(correo.value.trim()) && correo.value.trim() !== '') {
        return true;
    } else {
        let str = "Formato de correo incorrecto. Ejemplo: nombre@dominio.es";
        desplegarAlerta(str);
        return false;
    }
}

function validarContrasena(contrasena) {
    const regex = /^(?=[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{1,12}$/;
    if (regex.test(contrasena.value.trim()) && contrasena.value.trim() !== '') {
        return true;
    } else {
        let str = "Formato de contraseña incorrecto. Longitud mínima de 8 caracteres, la primera en mayúscula y debe contener números";
        desplegarAlerta(str);
        return false;
    }
}

function validarNumero(tlf) {
    const regex = /^\d{1,9}$/;
    if (regex.test(tlf.value.trim()) && tlf.value.trim() !== '' && tlf.value.length === 9) {
        return true;
    } else {
        let str = "Formato de teléfono incorrecto. Formato XXXXXXXXX. Solo números";
        console.log(tlf.value.length)
        desplegarAlerta(str);
        return false;
    }
}

function validarDir(dir) {
    if (dir.value.trim() === '') {
        let str = "La dirección no puede estar vacía";
        desplegarAlerta(str);
        return false;
    } else {
        return true;
    }
}
 function localizar(){
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else { 
        alert("No has activado la geolocalización, introducela a mano")
      }
 }

 function showPosition(position) {
    dir.value=position.coords.latitude + 
    " " + position.coords.longitude;
}

function desplegarAlerta(str){
    alerta.classList.remove('d-none')
    msg.innerHTML = str
}
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;    
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    /*
    console.log(numeroSecreto);
    console.log(typeof(numeroSecreto));
    console.log(numeroDeUsuario);
    console.log(typeof(numeroDeUsuario));
    console.log(numeroSecreto === numeroDeUsuario);
    */
    if (numeroSecreto === numeroDeUsuario) {
        asignarTextoElemento('p', `¡Has acertado el número en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}!`);
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no ha acertado
        if (numeroSecreto > numeroDeUsuario) {
            asignarTextoElemento('p', 'El número secreto es mayor');
        } else {
            asignarTextoElemento('p', 'El número secreto es menor');
        }
        intentos++;
        limpiarCaja()
    }
    return;
}

function limpiarCaja() {
    // Para usar query selector con ID como parámetro, anteponer #
    document.querySelector('#valorUsuario').value = '';
}

function establecerCondicionesIniciales() {
    // Indicar nombre del juego
    asignarTextoElemento('h1', 'Juego de número secreto'); 
    // Indicar mensaje de intervalo de números
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`); 
    // Habilitar botón intentar
    document.querySelector('#intentar').removeAttribute('disabled', 'true'); 
    // Generar nuevo número aleatorio
    numeroSecreto = generarNumeroSecreto(); 
    // Resetear el número de intentos
    intentos = 1;    
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.ceil(Math.random()*numeroMaximo);
    // Condicional, es el tamaño de la lista igual al número máximo?
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        // document.querySelector('#intentar').setAttribute('disabled', 'true');
        document.getElementById('intentar').setAttribute('disabled', 'true');
    } else {
        // Condicional, está el número generado en la lista?
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    return ;
}

function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();
    // Reestablecer condiciones iniciales
    establecerCondicionesIniciales();
    // Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

establecerCondicionesIniciales();
function mostrarSeccion(id) {
    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach(p => p.classList.remove('activo-sec'));
    document.getElementById(id).classList.add('activo-sec');

    const botones = document.querySelectorAll('nav button');
    botones.forEach(b => b.classList.remove('activo'));
    event.target.classList.add('activo');
}

let contador = parseInt(localStorage.getItem('contador')) || 0;
const numContador = document.getElementById('numContador');
numContador.textContent = contador;
actualizarColorContador();

function cambiarContador(valor) {
    if (valor === 0) contador = 0;
    else contador += valor;
    numContador.textContent = contador;
    localStorage.setItem('contador', contador);
    actualizarColorContador();
}

function actualizarColorContador() {
    if (contador > 0) numContador.style.color = 'green';
    else if (contador < 0) numContador.style.color = 'red';
    else numContador.style.color = 'gray';
}

function agregarTarea() {
    const texto = document.getElementById('inputTarea').value;
    if (texto === '') return;
    const lista = document.getElementById('listaTareas');
    const li = document.createElement('li');
    li.textContent = texto;
    li.onclick = () => li.remove();
    lista.appendChild(li);
    document.getElementById('inputTarea').value = '';
}

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
function adivinarNumero() {
    const val = parseInt(document.getElementById('inputAdivina').value);
    const msj = document.getElementById('mensajeAdivina');
    if (val === numeroSecreto) msj.textContent = "¡Correcto! 🎉";
    else if (val > numeroSecreto) msj.textContent = "Muy alto 📉";
    else msj.textContent = "Muy bajo 📈";
}
function reiniciarJuegoAdivina() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    document.getElementById('mensajeAdivina').textContent = "Nuevo número generado.";
}

function agregarCalc(val) {
    const pantalla = document.getElementById('pantallaCalc');
    if (pantalla.value === '0' || pantalla.value === 'Error') pantalla.value = '';
    pantalla.value += val;
}
function limpiarCalc() {
    document.getElementById('pantallaCalc').value = '0';
}
function calcularResultado() {
    const pantalla = document.getElementById('pantallaCalc');
    try {
        pantalla.value = eval(pantalla.value);
    } catch {
        pantalla.value = 'Error';
    }
}

function cambiarColorAleatorio() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('cajaColor').style.background = color;
    document.getElementById('codigoHex').textContent = color;
}
function copiarColor() {
    const codigo = document.getElementById('codigoHex').textContent;
    navigator.clipboard.writeText(codigo);
    alert("¡Copiado: " + codigo + "!");
}

let tiempo = 60;
let intervalo = null;
function iniciarTimer() {
    if (intervalo) return;
    intervalo = setInterval(() => {
        if (tiempo > 0) {
            tiempo--;
            document.getElementById('displayTimer').textContent = "00:" + (tiempo < 10 ? "0" : "") + tiempo;
        } else {
            clearInterval(intervalo);
            document.getElementById('displayTimer').textContent = "¡Tiempo terminado!";
        }
    }, 1000);
}
function pausarTimer() {
    clearInterval(intervalo);
    intervalo = null;
}
function reiniciarTimer() {
    pausarTimer();
    tiempo = 60;
    document.getElementById('displayTimer').textContent = "01:00";
}

function generarPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 8; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('inputPass').value = pass;
}

// MODO OSCURO DIRECTO (Sin CSS externo para evitar bloqueos)
let esModoOscuro = localStorage.getItem('modoOscuro') === 'true';

function aplicarModo() {
    const proyectos = document.querySelectorAll('.proyecto');
    if (esModoOscuro) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
        proyectos.forEach(p => {
            p.style.backgroundColor = '#2c2c2c';
            p.style.color = '#ffffff';
        });
    } else {
        document.body.style.backgroundColor = '#f4f4f4';
        document.body.style.color = '#333333';
        proyectos.forEach(p => {
            p.style.backgroundColor = '#ffffff';
            p.style.color = '#333333';
        });
    }
}

function toggleModoOscuro() {
    esModoOscuro = !esModoOscuro;
    localStorage.setItem('modoOscuro', esModoOscuro);
    aplicarModo();
}

// Aplicar al cargar
aplicarModo();

function jugarPPT(usuario) {
    const opciones = ['Piedra', 'Papel', 'Tijera'];
    const comp = opciones[Math.floor(Math.random() * 3)];
    let res = "Empate";
    if ((usuario === 'Piedra' && comp === 'Tijera') || (usuario === 'Papel' && comp === 'Piedra') || (usuario === 'Tijera' && comp === 'Papel')) {
        res = "¡Ganaste! 🏆";
    } else if (usuario !== comp) {
        res = "Perdiste 😢";
    }
    document.getElementById('resultadoPPT').textContent = `Tú: ${usuario} | PC: ${comp} -> ${res}`;
}

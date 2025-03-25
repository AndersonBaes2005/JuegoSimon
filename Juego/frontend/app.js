const API_URL = "https://cl2blb9z-4000.use.devtunnels.ms"; // Cambia según tu URL del backend
// Arrays para almacenar las secuencias del juego y del usuario
let gameseq = [];
let userseq = [];

// Variables para los elementos del DOM (colores)
let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let pink = document.querySelector(".pink");
let orange = document.querySelector(".orange");
let blue = document.querySelector(".blue");
let purple = document.querySelector(".purple");
let green = document.querySelector(".green");
let brown = document.querySelector(".brown");
let cyan = document.querySelector(".cyan");
let teal = document.querySelector(".teal");
let gray = document.querySelectorAll(".gray");
let black = document.querySelectorAll(".black");
const startButton = document.getElementById('startButton');

//Resive el usuario del login mediante localStorage y lo muestra en el modal
document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener el usuario de la URL o localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const userFromURL = urlParams.get('user');
    const username = userFromURL || localStorage.getItem('username') || 'Invitado';
    
    if (userFromURL) {
        localStorage.setItem('username', userFromURL); // Guardar para futuras visitas
    }

    // 2. Mostrar el modal de confirmación o el nombre directamente
    if (username && username !== 'Invitado') {
        mostrarConfirmacionUsuario(username); // Mostrar modal de confirmación
    } else {
        mostrarNombreUsuario('Invitado'); // Mostrar como invitado
    }

    // 3. Inicializar el juego (tu código existente)
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startOrRestartGame);

    // 4. Configurar botones del juego (ejemplo)
    document.querySelectorAll('.btns').forEach(btn => {
        btn.addEventListener('click', buttonpress);
    });

    // 5. Función para mostrar el nombre en la interfaz
    function mostrarNombreUsuario(nombre) {
        const nombreUsuarioTexto = document.getElementById('nombreUsuarioTexto');
        if (nombreUsuarioTexto) {
            nombreUsuarioTexto.textContent = nombre;
        }
    }

    // 6. Función para mostrar el modal de confirmación
    function mostrarConfirmacionUsuario(username) {
        const modal = document.getElementById('confirmModal');
        const confirmUsername = document.getElementById('confirmUsername');
        
        if (modal && confirmUsername) {
            confirmUsername.textContent = username;
            modal.style.display = 'block';

            // Botón "Confirmar"
            document.getElementById('confirmUser').onclick = function() {
                modal.style.display = 'none';
                mostrarNombreUsuario(username);
            };

            // Botón "Salir"
            document.getElementById('cancelUser').onclick = function() {
                modal.style.display = 'none';
                localStorage.removeItem('username');
                window.location.href = "https://cl2blb9z-4000.use.devtunnels.ms/registro";
            };
        }
    }
});



// Variables de estado del juego
let game = false; // Indica si el juego está en curso
let level = 0;    // Nivel actual del juego
let h2 = document.querySelector("h2"); // Elemento para mostrar el nivel

// Array de colores disponibles y variables de puntuación
let colours = ["red", "orange", "blue", "yellow", "pink", "purple", "green", "brown", "cyan", "teal", "gray", "black"];
let score = 0;
let highscore = document.querySelector("h3"); // Elemento para mostrar la puntuación más alta
highscore.innerText = 0;

// Función para iniciar o reiniciar el juego
function startOrRestartGame() {
    if (!game) {
        game = true; // Inicia el juego
        level = 0;   // Reinicia el nivel
        gameseq = []; // Reinicia la secuencia del juego
        userseq = []; // Reinicia la secuencia del usuario
        levelup();   // Comienza el primer nivel
        startButton.textContent = "Reiniciar Juego"; // Cambia el texto del botón
    } else {
        // Si el juego ya está en curso, reinícialo
        game = false;
        startButton.textContent = "Iniciar Juego"; // Cambia el texto del botón
        h2.innerText = "¡Presiona el botón para empezar!"; // Muestra un mensaje
    }
}

// Asigna el evento al botón
startButton.addEventListener('click', startOrRestartGame);

// Función para hacer parpadear un botón (color)
function flash(btn) {
    btn.classList.add("flash"); // Añade la clase "flash" para el efecto visual
    setTimeout(function () {
        btn.classList.remove("flash"); // Remueve la clase después de 250ms
    }, 250);
}

// Función para hacer parpadear un botón cuando el usuario hace clic
function userflash(btn) {
    btn.classList.add("userflash"); // Añade la clase "userflash" para el efecto visual
    setTimeout(function () {
        btn.classList.remove("userflash"); // Remueve la clase después de 250ms
    }, 250);
}

// Función para avanzar al siguiente nivel
function levelup() {
    userseq = []; // Reinicia la secuencia del usuario
    level++;      // Incrementa el nivel
    h2.innerText = `Nivel ${level}`; // Actualiza el texto del nivel

    // Selecciona un color aleatorio y lo añade a la secuencia del juego
    let rand = Math.floor(Math.random() * 12);
    let randindex = colours[rand];
    let randcolour = document.querySelector(`.${randindex}`);
    gameseq.push(randindex); // Añade el color a la secuencia del juego
    console.log(gameseq);    // Muestra la secuencia en la consola (para depuración)
    flash(randcolour);       // Hace parpadear el color seleccionado
}

// Función que se ejecuta cuando el usuario hace clic en un botón
function buttonpress() {
    if (!game) {
        // Si el juego no ha comenzado, no hacer nada o mostrar un mensaje
        h2.innerText = "¡Presiona el boton para empezar!";
        return; // Salir de la función sin hacer nada más
    }

    let btn = this;
    let colour = btn.getAttribute("id"); // Obtiene el color del botón presionado
    userseq.push(colour);                // Añade el color a la secuencia del usuario
    userflash(btn);                      // Hace parpadear el botón
    checkass(userseq.length - 1);        // Verifica si la secuencia del usuario es correcta
}

// Asigna el evento de clic a todos los botones del juego
let allbtns = document.querySelectorAll(".btns");
for (btn of allbtns) {
    btn.addEventListener("click", buttonpress);
    console.log(btn); // Muestra el botón en la consola (para depuración)
}

// Función para verificar si la secuencia del usuario coincide con la del juego
function checkass(index) {
    if (gameseq[index] == userseq[index]) {
        // Si la secuencia coincide y está completa, avanza al siguiente nivel
        if (gameseq.length == userseq.length) {
            setTimeout(levelup, 1000); // Espera 1 segundo antes de avanzar
        }
    } else {
        // Si la secuencia no coincide, termina el juego
        highscore.innerText = Math.max(highscore.innerText, level - 1); // Actualiza la puntuación más alta
        h2.innerText = `¡Juego terminado! Tu puntaje fue: " ${level - 1} ". Presiona el boton para empezar de nuevo`;
        h2.style.fontFamily = "Arial, sans-serif"; // Cambia la fuente del mensaje
        setTimeout(gameover, 1000); // Espera 1 segundo antes de reiniciar el juego
    }
}

// Función para reiniciar el juego
function gameover() {
    game = false; // Detiene el juego
    userseq = []; // Reinicia la secuencia del usuario
    gameseq = []; // Reinicia la secuencia del juego
    const nivelActual = level; // Guarda el nivel actual
    const puntosActuales = level - 1; // Calcula los puntos (nivel - 1)

    // Actualizar el puntaje en la base de datos
    actualizarPuntaje(nivelActual, puntosActuales);

    // Mostrar mensaje de juego terminado
    h2.innerText = `¡Juego terminado! Tu puntaje fue: ${puntosActuales}. Presiona el botón para empezar de nuevo`;
    h2.style.fontFamily = "Arial, sans-serif";

    // Cambiar el texto del botón a "Iniciar Juego"
    startButton.textContent = "Iniciar Juego";
}

// Función para actualizar el puntaje en la base de datos
function actualizarPuntaje(nivel, puntos) {
    const nombreUsuario = localStorage.getItem('username') || 'Invitado';

    fetch('/actualizar-puntaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: nombreUsuario, nivel, puntos }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Puntaje actualizado exitosamente');
        } else {
            console.error('Error al actualizar el puntaje:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

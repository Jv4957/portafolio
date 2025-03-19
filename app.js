// Lista de amigos
let amigos = [];
let sorteados = []; // Lista de amigos que ya fueron sorteados

// Referencias a elementos del DOM
let inputAmigo = document.getElementById("amigo");
let listaAmigos = document.getElementById("listaAmigos");
let listaResultados = document.getElementById("resultado");

// Agregar un amigo a la lista
function agregarAmigo() {
    let nombre = inputAmigo.value.trim();

    if (!nombre) {
        alert("Por favor, inserte un nombre.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    inputAmigo.value = "";
}

// Actualizar la lista de amigos en pantalla
function actualizarListaAmigos() {
    listaAmigos.innerHTML = "";

    amigos.forEach((nombre, index) => {
        let li = document.createElement("li");
        li.textContent = nombre;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        btnEliminar.style.marginLeft = "10px";

        li.appendChild(btnEliminar);
        listaAmigos.appendChild(li);
    });
}

// Eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

// Seleccionar un amigo aleatorio y excluirlo de futuros sorteos
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos en la lista para seleccionar.");
        return;
    }

    // Pedir nombre del usuario en el momento del sorteo
    let usuario = prompt("Ingrese su nombre para excluirlo del sorteo:").trim();

    // Crear una lista de amigos disponibles (excluyendo el usuario y los ya sorteados)
    let amigosDisponibles = amigos.filter(nombre => nombre !== usuario && !sorteados.includes(nombre));

    if (amigosDisponibles.length === 0) {
        alert("No hay suficientes amigos disponibles para realizar el sorteo.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    let amigoSeleccionado = amigosDisponibles[indiceAleatorio];

    // Mostrar solo el último sorteo en la lista de resultados
    listaResultados.innerHTML = `<li>🎉 Tu amigo secreto es: ${amigoSeleccionado} 🎉</li>`;

    // Agregar al amigo sorteado a la lista de excluidos
    sorteados.push(amigoSeleccionado);
}

// Detectar "Enter" en el input
inputAmigo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});


let amigos = [];
let sorteados = []; 

let inputAmigo = document.getElementById("amigo");
let listaAmigos = document.getElementById("listaAmigos");
let listaResultados = document.getElementById("resultado");

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

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos en la lista para seleccionar.");
        return;
    }

    let usuario = prompt("Ingrese su nombre para excluirlo del sorteo:").trim();

    let amigosDisponibles = amigos.filter(nombre => nombre !== usuario && !sorteados.includes(nombre));

    if (amigosDisponibles.length === 0) {
        alert("No hay suficientes amigos disponibles para realizar el sorteo.");
        return;
    }

    let indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    let amigoSeleccionado = amigosDisponibles[indiceAleatorio];

    listaResultados.innerHTML = `<li>🎉 Tu amigo secreto es: ${amigoSeleccionado} 🎉</li>`;

    sorteados.push(amigoSeleccionado);
}

inputAmigo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});

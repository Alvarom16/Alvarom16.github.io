alert("¡Bienvenido al juego del ahorcado!")
const palabras = ["javascript", "programacion", "ahorcado", "html", "css"];
const palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let palabraOculta = palabraSecreta.split("").map(letra => "_").join("");
let intentosRestantes = 4;
let letrasAdivinadas = [];

document.getElementById("palabraOculta").innerText = palabraOculta;
document.getElementById("intentosRestantes").innerText = intentosRestantes;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function dibujarParte(intentosRestantes) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    switch (intentosRestantes) {
        case 3:
            
            ctx.beginPath();
            ctx.arc(100, 50, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2:
            
            ctx.beginPath();
            ctx.moveTo(100, 70);
            ctx.lineTo(100, 150);
            ctx.moveTo(100, 90);
            ctx.lineTo(60, 110);
            ctx.moveTo(100, 90);
            ctx.lineTo(140, 110);
            ctx.stroke();
            break;
        case 1:
            
            ctx.beginPath();
            ctx.moveTo(100, 150);
            ctx.lineTo(80, 190);
            ctx.moveTo(100, 150);
            ctx.lineTo(120, 190);
            ctx.stroke();
            break;
        case 0:
            
            document.getElementById("mensaje").innerText = `Perdiste. La palabra era: ${palabraSecreta}`;
            break;
    }
}

function adivinarLetra() {
    const inputLetra = document.getElementById("inputLetra").value.toLowerCase();
    document.getElementById("inputLetra").value = "";

    if (inputLetra.length === 0 || letrasAdivinadas.includes(inputLetra)) {
        return;
    }

    letrasAdivinadas.push(inputLetra);

    if (palabraSecreta.includes(inputLetra)) {
        let nuevaPalabraOculta = "";
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === inputLetra) {
                nuevaPalabraOculta += inputLetra;
            } else {
                nuevaPalabraOculta += palabraOculta[i];
            }
        }
        palabraOculta = nuevaPalabraOculta;
        document.getElementById("palabraOculta").innerText = palabraOculta;
    } else {
        intentosRestantes--;
        document.getElementById("intentosRestantes").innerText = intentosRestantes;
        dibujarParte(intentosRestantes);
    }

    document.getElementById("mensaje").innerText = "";

    if (intentosRestantes === 0) {
        document.getElementById("mensaje").innerText = `Perdiste. La palabra era: ${palabraSecreta}`;
    }

    if (palabraOculta === palabraSecreta) {
        document.getElementById("mensaje").innerText = "¡Felicidades! Adivinaste la palabra.";
    }
}

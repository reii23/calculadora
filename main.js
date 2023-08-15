const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".boton");

let mostrarError = false;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        if (boton.id === "c") {
            pantalla.textContent = "0";
            mostrarError = false;
            return;
        }

        if (mostrarError) {
            return;
        }

        const botonPresionado = boton.textContent;

        if (botonPresionado === "←") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (botonPresionado === "=") {
            try {
                pantalla.textContent = evaluarExpresion(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error!";
                mostrarError = true;
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
            pantalla.textContent = botonPresionado;
        } else {
            pantalla.textContent += botonPresionado;
        }
    });
});

function evaluarExpresion(expresion) {
    expresion = expresion.replace("÷", "/");
    expresion = expresion.replace("×", "*");
    return eval(expresion);
}

document.addEventListener("keydown", event => {
    const key = event.key;
    if (/[\d./*\-+]/.test(key)) {
        event.preventDefault();
        if (mostrarError) {
            return;
        }
        if (key === "*") {
            pantalla.textContent += "×";
        } else if (key === "/") {
            pantalla.textContent += "÷";
        } else if (key === "Enter") {
            try {
                pantalla.textContent = evaluarExpresion(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error!";
                mostrarError = true;
            }
        } else {
            if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
                pantalla.textContent = key;
            } else {
                pantalla.textContent += key;
            }
        }
    }
});

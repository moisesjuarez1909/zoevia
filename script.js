const NUMERO_WHATSAPP = "50576244275";

const tarjetas = document.querySelectorAll(".tarjeta");
const listaPedido = document.getElementById("lista-pedido");
const vacio = document.getElementById("carrito-vacio");
const totalPedido = document.getElementById("total-pedido");
const enviar = document.getElementById("enviar-pedido");

let pedido = [];

function mostrarPedido() {
    listaPedido.innerHTML = "";

    if (pedido.length === 0) {
        vacio.style.display = "block";
        totalPedido.textContent = "";
        enviar.style.display = "none";
        return;
    }

    vacio.style.display = "none";

    let suma = 0;
    let hayPrecioPendiente = false;
    const lineas = [];

    pedido.forEach(function (item) {
        const li = document.createElement("li");
        let texto;

        if (item.precio > 0) {
            const subtotal = item.precio * item.cantidad;
            suma = suma + subtotal;
            texto = item.cantidad + " x " + item.nombre + " (C$" + subtotal + ")";
        } else {
            hayPrecioPendiente = true;
            texto = item.cantidad + " x " + item.nombre + " (precio por confirmar)";
        }

        li.textContent = texto;
        lineas.push(texto);

        const quitar = document.createElement("button");
        quitar.type = "button";
        quitar.className = "quitar";
        quitar.textContent = "Quitar";
        quitar.addEventListener("click", function () {
            pedido = pedido.filter(function (otro) {
                return otro !== item;
            });
            mostrarPedido();
        });

        li.appendChild(quitar);
        listaPedido.appendChild(li);
    });

    let textoTotal = "Total: C$" + suma;
    if (hayPrecioPendiente) {
        textoTotal = textoTotal + " (más productos con precio por confirmar)";
    }
    totalPedido.textContent = textoTotal;

    const mensaje =
        "Hola ZoeVia, quiero hacer este pedido:\n" +
        lineas.join("\n") +
        "\n" +
        textoTotal;

    enviar.href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    enviar.style.display = "inline-block";
}

tarjetas.forEach(function (tarjeta) {
    const menos = tarjeta.querySelector(".menos");
    const mas = tarjeta.querySelector(".mas");
    const numero = tarjeta.querySelector(".numero");
    const total = tarjeta.querySelector(".total");
    const agregar = tarjeta.querySelector(".agregar");
    const nombre = tarjeta.dataset.nombre;
    const precio = Number(tarjeta.dataset.precio);
    let cantidad = 1;

    function actualizar() {
        numero.textContent = cantidad;
        if (precio > 0) {
            total.textContent = "Subtotal: C$" + precio * cantidad;
        } else {
            total.textContent = "Precio por confirmar";
        }
    }

    mas.addEventListener("click", function () {
        cantidad = cantidad + 1;
        actualizar();
    });

    menos.addEventListener("click", function () {
        if (cantidad > 1) {
            cantidad = cantidad - 1;
            actualizar();
        }
    });

    agregar.addEventListener("click", function () {
        const existente = pedido.find(function (item) {
            return item.nombre === nombre;
        });

        if (existente) {
            existente.cantidad = existente.cantidad + cantidad;
        } else {
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
        }

        cantidad = 1;
        actualizar();
        mostrarPedido();
    });

    actualizar();
});

mostrarPedido();
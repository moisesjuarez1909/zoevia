const NUMERO_WHATSAPP = "50557976300";

const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function (tarjeta) {
    const menos = tarjeta.querySelector(".menos");
    const mas = tarjeta.querySelector(".mas");
    const numero = tarjeta.querySelector(".numero");
    const total = tarjeta.querySelector(".total");
    const pedir = tarjeta.querySelector(".pedir");
    const nombre = tarjeta.dataset.nombre;
    const precio = Number(tarjeta.dataset.precio);
    let cantidad = 1;

    function actualizar() {
        numero.textContent = cantidad;

        let mensaje = "Hola ZoeVia, quiero pedir " + cantidad + " x " + nombre;

        if (precio > 0) {
            const suma = precio * cantidad;
            total.textContent = "Total: C$" + suma;
            mensaje = mensaje + ". Total: C$" + suma;
        } else {
            total.textContent = "Precio por confirmar";
        }

        pedir.href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
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

    actualizar();
});
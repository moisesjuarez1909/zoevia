const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function (tarjeta) {
    const menos = tarjeta.querySelector(".menos");
    const mas = tarjeta.querySelector(".mas");
    const numero = tarjeta.querySelector(".numero");
    let cantidad = 1;

    mas.addEventListener("click", function () {
        cantidad = cantidad + 1;
        numero.textContent = cantidad;
    });

    menos.addEventListener("click", function () {
        if (cantidad > 1) {
            cantidad = cantidad - 1;
            numero.textContent = cantidad;
        }
    });
});

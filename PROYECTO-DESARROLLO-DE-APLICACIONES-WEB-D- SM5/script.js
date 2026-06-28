const productos = {
    artesania: {
        nombre: "Artesanias Amazonicas",
        descripcion: "Productos elaborados a mano por artesanos amazonicos, ideales para decorar tu hogar con identidad cultural.",
        precio: "$12.00",
        imagen: "img/artesania.jpg",
        alt: "Artesanias amazonicas"
    },
    natural: {
        nombre: "Productos Naturales",
        descripcion: "Alimentos organicos y saludables de la region amazonica, seleccionados para apoyar a productores locales.",
        precio: "$8.50",
        imagen: "img/producto.jpeg",
        alt: "Productos naturales amazonicos"
    },
    fruta: {
        nombre: "Frutas Exoticas",
        descripcion: "Frutas frescas de la Amazonia con sabores unicos, perfectas para una alimentacion natural y nutritiva.",
        precio: "$6.00",
        imagen: "img/fruta.jpeg",
        alt: "Frutas exoticas amazonicas"
    }
};

const botonesProducto = document.querySelectorAll(".boton-producto");
const productoNombre = document.getElementById("producto-nombre");
const productoDescripcion = document.getElementById("producto-descripcion");
const productoPrecio = document.getElementById("producto-precio");
const productoImagen = document.getElementById("producto-imagen");

botonesProducto.forEach((boton) => {
    boton.addEventListener("click", () => {
        const productoSeleccionado = productos[boton.dataset.producto];

        productoNombre.textContent = productoSeleccionado.nombre;
        productoDescripcion.textContent = productoSeleccionado.descripcion;
        productoPrecio.textContent = productoSeleccionado.precio;
        productoImagen.src = productoSeleccionado.imagen;
        productoImagen.alt = productoSeleccionado.alt;

        botonesProducto.forEach((item) => {
            item.classList.remove("activo", "btn-success");
            item.classList.add("btn-outline-success");
        });

        boton.classList.add("activo", "btn-success");
        boton.classList.remove("btn-outline-success");
    });
});

const formularioProducto = document.getElementById("formulario-producto");
const mensajeProducto = document.getElementById("mensaje-producto");
const campoNombre = document.getElementById("nombre-producto");
const campoDescripcion = document.getElementById("descripcion-producto");
const campoCategoria = document.getElementById("categoria-producto");
const errorNombre = document.getElementById("error-nombre");
const errorDescripcion = document.getElementById("error-descripcion");
const errorCategoria = document.getElementById("error-categoria");
const listaProductos = document.getElementById("lista-productos");
const totalRegistros = document.getElementById("total-registros");
let contadorRegistros = 0;

function mostrarMensaje(texto, tipo) {
    mensajeProducto.textContent = texto;
    mensajeProducto.classList.remove("d-none", "alert-success", "alert-warning");
    mensajeProducto.classList.add(tipo);
}

function crearElemento(etiqueta, clases, texto = "") {
    const elemento = document.createElement(etiqueta);
    elemento.classList.add(...clases);
    elemento.textContent = texto;
    return elemento;
}

function validarFormularioProducto() {
    let formularioValido = true;

    limpiarMensajesFormulario();

    if (campoNombre.value.trim() === "") {
        errorNombre.textContent = "Ingrese el nombre del producto.";
        campoNombre.classList.add("is-invalid");
        formularioValido = false;
    }

    if (campoDescripcion.value.trim() === "") {
        errorDescripcion.textContent = "Ingrese una descripcion del producto.";
        campoDescripcion.classList.add("is-invalid");
        formularioValido = false;
    }

    if (campoCategoria.value === "") {
        errorCategoria.textContent = "Seleccione una categoria o tipo.";
        campoCategoria.classList.add("is-invalid");
        formularioValido = false;
    }

    return formularioValido;
}

function limpiarMensajesFormulario() {
    errorNombre.textContent = "";
    errorDescripcion.textContent = "";
    errorCategoria.textContent = "";

    campoNombre.classList.remove("is-invalid");
    campoDescripcion.classList.remove("is-invalid");
    campoCategoria.classList.remove("is-invalid");
}

function actualizarTotalRegistros() {
    totalRegistros.textContent = contadorRegistros;
}

function crearTarjetaProducto(nombre, descripcion, categoria) {
    const columna = crearElemento("div", ["col-md-4", "mb-3"]);
    const tarjeta = crearElemento("div", ["card", "h-100", "shadow"]);
    const cuerpo = crearElemento("div", ["card-body"]);
    const titulo = crearElemento("h5", ["card-title"], nombre);
    const textoDescripcion = crearElemento("p", ["card-text"], descripcion);
    const etiquetaCategoria = crearElemento("span", ["badge", "bg-success"], categoria);

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "mt-3");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
        listaProductos.removeChild(columna);
        contadorRegistros--;
        actualizarTotalRegistros();
        mostrarMensaje(`Producto eliminado: ${nombre}`, "alert-warning");
    });

    cuerpo.appendChild(titulo);
    cuerpo.appendChild(textoDescripcion);
    cuerpo.appendChild(etiquetaCategoria);
    cuerpo.appendChild(botonEliminar);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    listaProductos.appendChild(columna);
    contadorRegistros++;
    actualizarTotalRegistros();
}

[campoNombre, campoDescripcion, campoCategoria].forEach((campo) => {
    campo.addEventListener("input", validarFormularioProducto);
    campo.addEventListener("change", validarFormularioProducto);
});

formularioProducto.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!validarFormularioProducto()) {
        mostrarMensaje("Por favor, complete todos los campos del formulario.", "alert-warning");
        return;
    }

    const nombre = campoNombre.value.trim();
    const descripcion = campoDescripcion.value.trim();
    const categoria = campoCategoria.value;

    crearTarjetaProducto(nombre, descripcion, categoria);

    mostrarMensaje(`Producto registrado: ${nombre} | Categoria: ${categoria}`, "alert-success");

    formularioProducto.reset();
    limpiarMensajesFormulario();
});

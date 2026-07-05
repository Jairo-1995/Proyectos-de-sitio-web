(() => {
    const productos = {
        artesania: {
            nombre: "Artesanías Amazónicas",
            descripcion: "Cestas, tejidos y artículos decorativos elaborados a mano por artesanos de la Amazonía, ideales para dar un toque cultural a tu hogar.",
            precio: "$12.00",
            imagen: "img/artesania.jpg",
            alt: "Artesanías amazonicas"
        },
        natural: {
            nombre: "Productos Naturales",
            descripcion: "Miel, aceite de coco y otros productos orgánicos de la región, seleccionados para promover un consumo saludable y sostenible.",
            precio: "$8.50",
            imagen: "img/miel.jpg",
            alt: "Productos naturales amazonicos"
        },
        fruta: {
            nombre: "Frutas Exóticas",
            descripcion: "Papaya, guayusa y otras frutas amazónicas frescas, perfectas para disfrutar de sabores únicos y nutritivos.",
            precio: "$6.00",
            imagen: "img/papaya.jpg",
            alt: "Frutas exoticas amazonicas"
        }
    };

    const botonesProducto = document.querySelectorAll(".boton-producto");
    const productoNombre = document.getElementById("producto-nombre");
    const productoDescripcion = document.getElementById("producto-descripcion");
    const productoPrecio = document.getElementById("producto-precio");
    const productoImagen = document.getElementById("producto-imagen");

    const formularioProducto = document.getElementById("formulario-producto");
    const mensajeProducto = document.getElementById("mensaje-producto");
    const campoNombre = document.getElementById("nombre-producto");
    const campoDescripcion = document.getElementById("descripcion-producto");
    const campoCategoria = document.getElementById("categoria-producto");
    const errorNombre = document.getElementById("error-nombre");
    const errorDescripcion = document.getElementById("error-descripcion");
    const errorCategoria = document.getElementById("error-categoria");
    const exitoNombre = document.getElementById("exito-nombre");
    const exitoDescripcion = document.getElementById("exito-descripcion");
    const exitoCategoria = document.getElementById("exito-categoria");
    const listaProductos = document.getElementById("lista-productos");
    const totalRegistros = document.getElementById("total-registros");
    const contadorDescripcion = document.getElementById("contador-descripcion");
    const botonRegistrar = document.getElementById("boton-registrar");

    const LONGITUD_MINIMA_NOMBRE = 3;
    const LONGITUD_MINIMA_DESCRIPCION = 15;
    const PALABRAS_MINIMAS_DESCRIPCION = 4;
    let contadorRegistros = 0;

    function actualizarBotonesProducto(botonActivo) {
        botonesProducto.forEach((boton) => {
            boton.classList.remove("activo", "btn-success");
            boton.classList.add("btn-outline-success");
        });

        botonActivo.classList.add("activo", "btn-success");
        botonActivo.classList.remove("btn-outline-success");
    }

    function mostrarProductoRecomendado(producto) {
        productoNombre.textContent = producto.nombre;
        productoDescripcion.textContent = producto.descripcion;
        productoPrecio.textContent = producto.precio;
        productoImagen.src = producto.imagen;
        productoImagen.alt = producto.alt;
    }

    function manejarSeleccionProducto(evento) {
        const botonSeleccionado = evento.currentTarget;
        const productoSeleccionado = productos[botonSeleccionado.dataset.producto];

        mostrarProductoRecomendado(productoSeleccionado);
        actualizarBotonesProducto(botonSeleccionado);
    }

    function mostrarMensaje(texto, tipo) {
        mensajeProducto.textContent = texto;
        mensajeProducto.className = `alert ${tipo}`;
    }

    function crearElemento(etiqueta, clases, texto = "") {
        const elemento = document.createElement(etiqueta);
        elemento.classList.add(...clases);
        if (texto) elemento.textContent = texto;
        return elemento;
    }

    function marcarCampo({ campo, errorEl, exitoEl, mensajeError, mensajeExito }) {
        errorEl.textContent = mensajeError || "";
        exitoEl.textContent = mensajeExito || "";
        campo.classList.toggle("is-invalid", !!mensajeError);
        campo.classList.toggle("is-valid", !!mensajeExito);
        return !mensajeError;
    }

    function validarNombreProducto() {
        const nombre = campoNombre.value.trim();
        const patronNombre = /^[a-zA-Z0-9\u00c0-\u017f\s]+$/;
        const opts = { campo: campoNombre, errorEl: errorNombre, exitoEl: exitoNombre };

        if (nombre === "") return marcarCampo({ ...opts, mensajeError: "Ingrese el nombre del producto." });
        if (nombre.length < LONGITUD_MINIMA_NOMBRE) return marcarCampo({ ...opts, mensajeError: `El nombre debe tener al menos ${LONGITUD_MINIMA_NOMBRE} caracteres.` });
        if (nombre.length > 40) return marcarCampo({ ...opts, mensajeError: "El nombre no debe superar los 40 caracteres." });
        if (!patronNombre.test(nombre)) return marcarCampo({ ...opts, mensajeError: "Use solo letras, numeros y espacios." });

        return marcarCampo({ ...opts, mensajeExito: "Nombre valido." });
    }

    function validarDescripcionProducto() {
        const descripcion = campoDescripcion.value.trim();
        const palabrasDescripcion = descripcion.split(/\s+/).filter(Boolean);
        const caracteresUnicos = new Set(descripcion.replace(/\s/g, "").toLowerCase()).size;
        contadorDescripcion.textContent = `${campoDescripcion.value.length}/160 caracteres. Minimo ${LONGITUD_MINIMA_DESCRIPCION}.`;
        const opts = { campo: campoDescripcion, errorEl: errorDescripcion, exitoEl: exitoDescripcion };

        if (descripcion === "") return marcarCampo({ ...opts, mensajeError: "Ingrese una descripcion del producto." });
        if (descripcion.length < LONGITUD_MINIMA_DESCRIPCION) return marcarCampo({ ...opts, mensajeError: `La descripcion debe tener al menos ${LONGITUD_MINIMA_DESCRIPCION} caracteres.` });
        if (palabrasDescripcion.length < PALABRAS_MINIMAS_DESCRIPCION) return marcarCampo({ ...opts, mensajeError: `La descripcion debe incluir al menos ${PALABRAS_MINIMAS_DESCRIPCION} palabras.` });
        if (caracteresUnicos < 5) return marcarCampo({ ...opts, mensajeError: "Escriba una descripcion mas detallada del producto." });
        if (descripcion.length > 160) return marcarCampo({ ...opts, mensajeError: "La descripcion no debe superar los 160 caracteres." });

        return marcarCampo({ ...opts, mensajeExito: "Descripcion suficiente." });
    }

    function validarCategoriaProducto() {
        const opts = { campo: campoCategoria, errorEl: errorCategoria, exitoEl: exitoCategoria };
        if (campoCategoria.value === "") return marcarCampo({ ...opts, mensajeError: "Seleccione una categoria, tipo o estado antes de registrar." });
        return marcarCampo({ ...opts, mensajeExito: "Categoria seleccionada." });
    }

    function actualizarEstadoBoton() {
        const esValido = campoNombre.classList.contains("is-valid") &&
            campoDescripcion.classList.contains("is-valid") &&
            campoCategoria.classList.contains("is-valid");
        botonRegistrar.disabled = !esValido;
    }

    function validarFormularioProducto() {
        const esValido = validarNombreProducto() && validarDescripcionProducto() && validarCategoriaProducto();
        actualizarEstadoBoton();
        return esValido;
    }

    function limpiarMensajesFormulario() {
        [errorNombre, errorDescripcion, errorCategoria, exitoNombre, exitoDescripcion, exitoCategoria].forEach(el => el.textContent = "");
        [campoNombre, campoDescripcion, campoCategoria].forEach(el => el.classList.remove("is-invalid", "is-valid"));
        contadorDescripcion.textContent = `0/160 caracteres. Minimo ${LONGITUD_MINIMA_DESCRIPCION}.`;
        botonRegistrar.disabled = true;
    }

    function actualizarTotalRegistros() {
        totalRegistros.textContent = contadorRegistros;
    }

    function eliminarRegistroProducto(columna, nombre) {
        columna.remove();
        contadorRegistros--;
        actualizarTotalRegistros();
        mostrarMensaje(`Producto eliminado: ${nombre}`, "alert-warning");
    }

    function crearBotonEliminar(columna, nombre) {
        const botonEliminar = crearElemento("button", ["btn", "btn-danger", "btn-sm", "mt-3"], "Eliminar");
        botonEliminar.type = "button";
        botonEliminar.addEventListener("click", () => eliminarRegistroProducto(columna, nombre));
        return botonEliminar;
    }

    function crearTarjetaProducto(nombre, descripcion, categoria) {
        const columna = crearElemento("div", ["col-md-4", "mb-3"]);
        const tarjeta = crearElemento("div", ["card", "h-100", "shadow"]);
        const cuerpo = crearElemento("div", ["card-body"]);
        const titulo = crearElemento("h5", ["card-title"], nombre);
        const textoDescripcion = crearElemento("p", ["card-text"], descripcion);
        const etiquetaCategoria = crearElemento("span", ["badge", "bg-success"], categoria);
        const botonEliminar = crearBotonEliminar(columna, nombre);

        cuerpo.append(titulo, textoDescripcion, etiquetaCategoria, botonEliminar);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);

        return columna;
    }

    function agregarRegistroProducto(nombre, descripcion, categoria) {
        const tarjetaProducto = crearTarjetaProducto(nombre, descripcion, categoria);
        listaProductos.appendChild(tarjetaProducto);
        contadorRegistros++;
        actualizarTotalRegistros();
    }

    function validarCampoProducto(funcionValidacion) {
        funcionValidacion();
        actualizarEstadoBoton();
    }

    function obtenerDatosFormulario() {
        return {
            nombre: campoNombre.value.trim(),
            descripcion: campoDescripcion.value.trim(),
            categoria: campoCategoria.value
        };
    }

    function manejarEnvioFormulario(evento) {
        evento.preventDefault();

        if (!validarFormularioProducto()) {
            mostrarMensaje("Por favor, corrija los campos marcados antes de registrar.", "alert-danger");
            return;
        }

        const producto = obtenerDatosFormulario();
        agregarRegistroProducto(producto.nombre, producto.descripcion, producto.categoria);
        mostrarMensaje(`Producto registrado: ${producto.nombre} | Categoria: ${producto.categoria}`, "alert-success");

        formularioProducto.reset();
        limpiarMensajesFormulario();
    }

    function inicializarProductoRecomendado() {
        botonesProducto.forEach((boton) => {
            boton.addEventListener("click", manejarSeleccionProducto);
        });
    }

    function registrarEventosValidacion() {
        const campos = [
            { el: campoNombre, func: validarNombreProducto, events: ["input", "blur"] },
            { el: campoDescripcion, func: validarDescripcionProducto, events: ["input", "blur"] },
            { el: campoCategoria, func: validarCategoriaProducto, events: ["change", "blur"] }
        ];

        campos.forEach(({ el, func, events }) => {
            events.forEach(event => {
                el.addEventListener(event, () => validarCampoProducto(func));
            });
        });

        formularioProducto.addEventListener("submit", manejarEnvioFormulario);
    }

    function inicializarFormularioProducto() {
        registrarEventosValidacion();
        limpiarMensajesFormulario();
    }

    function iniciarAplicacion() {
        if (document.getElementById("producto-dinamico")) {
            inicializarProductoRecomendado();
        }
        if (document.getElementById("registro-producto")) {
            inicializarFormularioProducto();
        }
    }

    // Iniciar la aplicación cuando el DOM esté completamente cargado
    document.addEventListener("DOMContentLoaded", iniciarAplicacion);
})();

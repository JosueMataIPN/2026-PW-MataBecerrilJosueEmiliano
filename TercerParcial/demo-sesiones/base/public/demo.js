// La página solo hace fetch a la API. El navegador manda la cookie solo (misma página, mismo servidor).
//Facilita el acceso a los elementos de la página para tener un un código más limpio y sin tantas repeticiones.
const $ = (id) => document.getElementById(id);

//Centraliza las peticiones al servidor para mantener un manejo de respuestas y cookies de sesión mejor.
async function solicitarAPI(url, opciones = {}) {
    const configuracion = {
        method: opciones.method || 'GET',
        headers: {},
        credentials: 'same-origin'
    };

    if (opciones.body !== undefined) {
        configuracion.headers['Content-Type'] = 'application/json';
        configuracion.body = JSON.stringify(opciones.body);
    }

    const respuesta = await fetch(url, configuracion);

    let datos;
    try {
        datos = await respuesta.json();
    } catch {
        datos = null;
    }

    return {
        status: respuesta.status,
        datos: datos
    };
}

// Permite llevar un registro visible de las peticiones para facilitar la revisión de errores durante las pruebas.
function registrarBitacora(metodo, url, resultado) {
    const bitacora = $('bitacora');

    const elemento = document.createElement('li');

    const codigo = document.createElement('span');
    codigo.textContent = resultado.status;

    if (resultado.status >= 200 && resultado.status < 300) {
        codigo.className = 'codigo ok';
    } else if (resultado.status === 401) {
        codigo.className = 'codigo e401';
    } else if (resultado.status === 403) {
        codigo.className = 'codigo e403';
    } else {
        codigo.className = 'codigo error';
    }

    const detalle = document.createElement('span');
    detalle.textContent = `${metodo} ${url}`;

    const respuesta = document.createElement('pre');
    respuesta.textContent = JSON.stringify(resultado.datos, null, 2);

    elemento.appendChild(codigo);
    elemento.appendChild(detalle);
    elemento.appendChild(respuesta);

    bitacora.prepend(elemento);
}

//Permite que el usuario conozca el estado de su autenticación y el tiempo que le queda a su sesión.
async function actualizarEstadoSesion() {

    const resultado = await solicitarAPI('/api/sesion');

    registrarBitacora('GET', '/api/sesion', resultado);

    const estado = $('estado');

    if (resultado.status === 200) {

        const datos = resultado.datos;

        estado.textContent =
            `Sesión iniciada: ${datos.usuario.nombre} | ` +
            `Rol: ${datos.usuario.rol} | ` +
            `ID: ${datos.sesion} | ` +
            `Expira en: ${datos.expiraEnSegundos} segundos`;

        estado.className = 'con-sesion';

    } else {

        estado.textContent = 'No has iniciado sesión';
        estado.className = 'sin-sesion';
    }

    $('cookie-js').textContent = document.cookie || 'No hay cookies visibles para JavaScript';
}

//Permite ver las sesiones existentes y reconocer cual partenece al navegador actual.
async function actualizarTablaSesiones() {
    const resultado = await solicitarAPI('/api/diagnostico/sesiones');

    registrarBitacora('GET', '/api/diagnostico/sesiones', resultado);

    const tabla = $('tabla-sesiones');

    tabla.replaceChildren();

    if (resultado.status !== 200) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');

        celda.colSpan = 4;
        celda.textContent = resultado.datos?.error || 'No se pudieron consultar las sesiones';

        fila.appendChild(celda);
        tabla.appendChild(fila);

        return;
    }

    $('donde').textContent = `Almacenamiento de sesiones: ${resultado.datos.almacen}`;

    if (resultado.datos.sesiones.length === 0) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');

        celda.colSpan = 4;
        celda.textContent = '(sin sesiones)';

        fila.appendChild(celda);
        tabla.appendChild(fila);

        return;
    }

    resultado.datos.sesiones.forEach((sesion) => {
        const fila = document.createElement('tr');

        const valores = [
            sesion.esLaTuya ? `${sesion.sesion} (la tuya)` : sesion.sesion,
            sesion.usuario,
            sesion.visitas,
            new Date(sesion.expira).toLocaleString()
        ];

        valores.forEach((valor) => {
            const celda = document.createElement('td');
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        if (sesion.esLaTuya) {
            fila.className = 'tuya';
        }

        tabla.appendChild(fila);
    });
}

//Permite que el usuario interactue con la demostración mediante clicks en la página y que cada acción se comunique con el servidor.
function conectarEventos() {
    $('btn-refrescar').addEventListener('click', async () => {
      await actualizarEstadoSesion();
      await actualizarTablaSesiones();
    });

    $('btn-sesiones').addEventListener('click', actualizarTablaSesiones);

    $('usuario').addEventListener('change', () => {
    const contrasenas = {
        ana: 'ana12345',
        luis: 'luis12345',
        admin: 'admin12345'
    };

      $('contrasena').value = contrasenas[$('usuario').value];
    });

    $('form-login').addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const usuario = $('usuario').value;
        const contrasena = $('contrasena').value;

        const resultado = await solicitarAPI('/api/login', {
            method: 'POST',
            body: {
                usuario: usuario,
                contrasena: contrasena
            }
        });

        registrarBitacora('POST', '/api/login', resultado);

        $('contrasena').value = '';

        await actualizarEstadoSesion();
        await actualizarTablaSesiones();
    });

    document.querySelectorAll('button[data-metodo][data-url]').forEach((boton) => {
        boton.addEventListener('click', async () => {
            const metodo = boton.dataset.metodo;
            const url = boton.dataset.url;

            const resultado = await solicitarAPI(url, {
                method: metodo
            });

            registrarBitacora(metodo, url, resultado);

            await actualizarEstadoSesion();
            await actualizarTablaSesiones();
        });
    });
}

//Garantiza que la demostración esté preparada desde el inicio mostrando la configuración y el estado actual de las sesiones.
async function iniciarDemo() {
    conectarEventos();

    const resultado = await solicitarAPI('/api/config');

    registrarBitacora('GET', '/api/config', resultado);

    $('config').textContent = JSON.stringify(resultado.datos, null, 2);

    await actualizarEstadoSesion();
    await actualizarTablaSesiones();
}

iniciarDemo();
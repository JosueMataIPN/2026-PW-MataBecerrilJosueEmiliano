//vamos a dejarles 2 de las 3 funciones para validar

function validarCorreo(){
//tarea
}

function validarBoleta(){
//tarea
}

function validarContrasena(){
    if (typeof contrasena !== 'string') return false;
    return contrasena.length >= 8;
}

module.exports = {validarCorreo, validarBoleta, validarContrasena}
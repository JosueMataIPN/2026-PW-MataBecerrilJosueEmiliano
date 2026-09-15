/*
Las validaciones para este formulario se realizaran mediante el uso de Expresiones Regulares, las cuales las vamos a dividir en 3: 
1.- Texto para el nombre
2.- Numerico para la boleta
3.- Debe tener un patron para la fecha

Las expresiones regulares, son patrones que nos ayudan a validar cadenas bajo ciertas condiciones.
 */

const patrones = {
    nombre : /^[A-Za-zÁÉÍÓÚÑáéíóú\s]{2,60}$/ ,
    boleta : /^\d{10}$/ ,
    fecha : /^(0[1-9] | [12]\d | 3[01])\/(0[1-9] | 1[0-2])\/\d{4}$/
}

const mensajes = {
    nombre : "Solo letras y espacios, entre 2 y 60 caracteres.",
    boleta : "Debe tener exactamente 10 digitos numéricos.",
    fecha : "La fecha debe tener el formato DD/MM/AAAA"
}

function validarCampo(campo, valor){
    return patrones[campo].test(valor.trim())
}
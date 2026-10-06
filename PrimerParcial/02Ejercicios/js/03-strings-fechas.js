// 03-strings-fechas.js
// Métodos de string más usados + el objeto Date — conecta con la validación
// de fecha (DD/MM/AAAA) de la semana 4. Completa cada TODO.

const entrada = '  María López  ';

// TODO: trim — imprime `entrada` sin espacios sobrantes
console.log("Ejemplo de uso de .trim");
console.log(`"${entrada.trim()}"`);

// TODO: split — parte el resultado del trim en un arreglo `partes`, separado por espacio
console.log('Ejemplo de split');
const partes = entrada.trim().split(' ');
console.log(partes);

// TODO: includes — imprime si 'correo@cecyt9.ipn.mx' contiene '@'
console.log('Ejemplo de includes');
console.log('Correo@ipn.mx' .includes('@'));

// TODO: replace y replaceAll — con '05/09/2026', reemplaza '/' por '-'
//       primero con replace (una sola vez) y luego con replaceAll (todas)
console.log('Ejemplo de replace /replaceAll');
console.log('05/09/2026' .replace('/', '-'));

console.log('05/09/2026' .replaceAll('/', '-'));

// TODO: template literals — usando `nombre = 'María'` y `cupo = 25`, imprime
//       "María se inscribió en un taller con cupo para 25 personas."
console.log('Manejo de template');
const nombre = 'Maria';
const cupo = 25;
console.log(`${nombre} se inscribio a un taller con cupo de ${cupo} personas`);

// TODO: Date — completa esta función para construir un objeto Date a partir
// de un texto 'DD/MM/AAAA' (recuerda: los meses en Date empiezan en 0)
console.log('Ejemplo de Date');
function fechaDesdeTexto(textoFecha) {
  // TODO
  const [dia, mes, anio] = textoFecha.split('/').map(Number);
  return new Date(anio, mes - 1, dia);
}

// TODO: usa fechaDesdeTexto('05/09/2026'), imprime su toISOString() y su
// getDay(); luego calcula cuántos días de diferencia hay contra `new Date()`
const fechaAsistencia = fechaDesdeTexto('05/092026');
console.log('Fecha construida: ', fechaAsistencia.toISOString());
console.log('Dia de la semana (0=domingo): ', fechaAsistencia.getDay());

const hoy = new Date();
const diaDeDiferencia = Math.round((fechaAsistencia - hoy) / (1000*60*60*24));
console.log(`Faltan ${diaDeDiferencia} dia(s) para la fecha de asistencia al taller (puede ser negativo)`);
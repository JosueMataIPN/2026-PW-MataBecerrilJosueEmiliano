// 02-objetos-json.js
// Object.keys/values/entries y JSON.stringify/parse. Completa cada TODO.
 
const taller = {
  nombre: 'Introducción a Python',
  instructor: 'Ing. María López',
  cupo: 25,
  inscritos: 25,
};
 
 
// TODO: Object.keys — imprime solo los nombres de las propiedades de `taller`
console.log('Manejo de keys');
console.log(Object.keys(taller));
// TODO: Object.values — imprime solo los valores
console.log('Manejo de valores en un objeto');
console.log(Object.values(taller));
// TODO: Object.entries — recorre con for..of e imprime "campo: valor" de cada propiedad
 
// TODO: JSON.stringify — convierte `taller` a texto (guárdalo en `textoJson`) e imprímelo
 
// TODO: JSON.parse — convierte `textoJson` de vuelta a objeto (guárdalo en `objetoDeVuelta`)
//       e imprime `objetoDeVuelta.nombre`
 
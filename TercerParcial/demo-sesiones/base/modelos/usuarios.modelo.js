// Consultas a la tabla usuarios. Siempre con ? (consulta parametrizada).
const bcrypt = require('bcryptjs');

function crearModeloUsuarios(pool) {

  // Regresa el usuario sin el hash si la contraseña es correcta.
  async function verificar(usuario, contrasena) {

    if (
      typeof usuario !== 'string' ||
      typeof contrasena !== 'string' ||
      !usuario.trim() ||
      !contrasena
    ) {
      return null;
    }

    const [filas] = await pool.execute(
      `SELECT id, usuario, nombre, rol, contrasena_hash
       FROM usuarios
       WHERE usuario = ?
       LIMIT 1`,
      [usuario.trim()]
    );

    if (filas.length === 0) {
      return null;
    }

    const encontrado = filas[0];

    const coincide = await bcrypt.compare(
      contrasena,
      encontrado.contrasena_hash
    );

    if (!coincide) {
      return null;
    }

    return {
      id: encontrado.id,
      usuario: encontrado.usuario,
      nombre: encontrado.nombre,
      rol: encontrado.rol
    };
  }

  return { verificar };
}

module.exports = { crearModeloUsuarios };

const express = require('express');
const router = express.Router();
const db = require('../db/client');

// GET /api/reservas?usuario_id=...
router.get('/', async (req, res) => {
  const { usuario_id } = req.query;
  try {
    const result = await db.query(
      `SELECT r.*, s.nombre AS servicio_nombre, s.descripcion, s.precio 
       FROM reservas r
       JOIN servicios s ON r.servicio_id = s.id
       WHERE r.usuario_id = $1
       ORDER BY r.fecha`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al obtener reservas con servicio:', err);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
});

// POST /api/reservas
router.post('/', async (req, res) => {
  const { usuario_id, servicio_id, fecha, cantidad = 1 } = req.body;

  try {
    const result = await db.query(
      'SELECT COUNT(*) FROM reservas WHERE servicio_id = $1 AND fecha = $2',
      [servicio_id, fecha]
    );

    const yaReservadas = parseInt(result.rows[0].count);

    if (yaReservadas + cantidad > 6) {
      return res.status(400).json({
        message: '❌ No quedan plazas disponibles para ese servicio en esa fecha.'
      });
    }

    await db.query(
      'INSERT INTO reservas (usuario_id, servicio_id, fecha, cantidad) VALUES ($1, $2, $3, $4)',
      [usuario_id, servicio_id, fecha, cantidad]
    );

    res.json({ message: '✅ Reserva realizada con éxito' });
  } catch (err) {
    console.error('❌ Error al crear reserva:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;

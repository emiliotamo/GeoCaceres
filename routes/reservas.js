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
    // 1. Verificar si hay disponibilidad en fechas_disponibles
    const result = await db.query(
      `SELECT reservas_actuales, max_reservas
       FROM fechas_disponibles
       WHERE servicio_id = $1 AND fecha = $2`,
      [servicio_id, fecha]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: '❌ Esta fecha no existe o no está disponible para reservar.'
      });
    }

    const { reservas_actuales, max_reservas } = result.rows[0];

    if (reservas_actuales + cantidad > max_reservas) {
      return res.status(400).json({
        message: '❌ Ya no quedan plazas disponibles para esta fecha.'
      });
    }

    // 2. Insertar reserva
    await db.query(
      `INSERT INTO reservas (usuario_id, servicio_id, fecha, cantidad)
       VALUES ($1, $2, $3, $4)`,
      [usuario_id, servicio_id, fecha, cantidad]
    );

    // 3. Actualizar contador en fechas_disponibles
    await db.query(
      `UPDATE fechas_disponibles
       SET reservas_actuales = reservas_actuales + $1
       WHERE servicio_id = $2 AND fecha = $3`,
      [cantidad, servicio_id, fecha]
    );

    res.json({ message: '✅ Reserva realizada con éxito' });

  } catch (err) {
    console.error('❌ Error al crear reserva:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// DELETE /api/reservas/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM reservas WHERE id = $1', [id]);
    res.json({ message: '✅ Reserva cancelada con éxito' });
  } catch (err) {
    console.error('❌ Error al cancelar reserva:', err);
    res.status(500).json({ message: 'Error al cancelar reserva' });
  }
});

module.exports = router;
// DELETE /api/reservas/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM reservas WHERE id = $1', [id]);
    res.json({ message: '✅ Reserva cancelada con éxito' });
  } catch (err) {
    console.error('❌ Error al cancelar reserva:', err);
    res.status(500).json({ message: 'Error al cancelar reserva' });
  }
});
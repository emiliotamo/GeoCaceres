const express = require('express');
const router = express.Router();
const db = require('../db/client');

// Obtener fechas disponibles por servicio
router.get('/:servicioId', async (req, res) => {
  try {
    const servicioId = req.params.servicioId;
    const result = await db.query(
      `SELECT fecha FROM fechas_disponibles
       WHERE servicio_id = $1 AND reservas_actuales < max_reservas
       ORDER BY fecha`,
      [servicioId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener fechas:", err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;

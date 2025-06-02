// ✅ micuenta.js - Código para mostrar perfil y reservas del usuario

document.addEventListener("DOMContentLoaded", async () => {
    const userData = localStorage.getItem("usuario");
  
    if (!userData) {
      console.warn("⚠️ No hay usuario en localStorage");
      return;
    }
  
    let user;
    try {
      user = JSON.parse(userData);
    } catch (err) {
      console.error("❌ Error al parsear userData:", err);
      return;
    }
  
    const userId = user.id;
    if (!userId) {
      console.error("❌ ID de usuario no válido:", user);
      return;
    }
  
    // Mostrar datos del perfil
    const userBox = document.getElementById("perfilBox");
    if (userBox) {
      userBox.innerHTML = `
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Usuario:</strong> ${user.username}</p>
      `;
    }
  
    // Mostrar reservas
    const lista = document.getElementById("listaReservas");
    if (!lista) {
      console.warn("⚠️ No se encontró el contenedor listaReservas");
      return;
    }
  
    try {
      const res = await fetch(`/api/reservas?usuario_id=${userId}`);
      if (!res.ok) throw new Error("Error al obtener reservas");
  
      const reservas = await res.json();
  
      if (!reservas.length) {
        lista.innerHTML = `
          <p>En este momento no tienes ninguna reserva.</p>
          <a href="reservas.html" class="btn">Ir a hacer una reserva</a>
        `;
      } else {
        lista.innerHTML = ""; // limpiar primero
        reservas.forEach(r => {
          const div = document.createElement("div");
          div.className = "reserva-box";
          div.innerHTML = `
            <p><strong>${r.servicio_nombre}</strong> (${r.fecha.split('T')[0]})</p>
            <p>${r.descripcion}</p>
            <p><strong>Personas:</strong> ${r.cantidad}</p>
            <p><strong>Precio:</strong> ${r.precio} €</p>
          `;
          lista.appendChild(div);
        });
      }
    } catch (err) {
      console.error("❌ Error al cargar reservas:", err);
      lista.innerHTML = "<p>Error al cargar tus reservas.</p>";
    }
  });
  
console.log("🧨 main.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM cargado");
  
    // Verifica usuario en localStorage
    const userData = localStorage.getItem("usuario");
    console.log("🧪 Usuario guardado:", userData);
  
    if (userData) {
      const user = JSON.parse(userData);
  
      // Actualizar el header
      const authContent = document.getElementById("authContent");
      console.log("🔎 authContent:", authContent);
      if (authContent) {
        authContent.innerHTML = `
          <strong>${user.username}</strong> /
          <a href="#" onclick="logoutUser()">Cerrar sesión</a>
        `;
      }
  
      // Ocultar campos del formulario de contacto
      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      if (nameField) nameField.style.display = 'none';
      if (emailField) emailField.style.display = 'none';
    }
  
    // Botón hamburguesa
    const ham = document.querySelector('.ham-menu');
    const nav = document.querySelector('.navbar');
    if (ham && nav) {
      ham.addEventListener("click", () => {
        ham.classList.toggle('active');
        nav.classList.toggle('active');
      });
    }
  
    // Loader
    const loadder = document.getElementById('preloadder');
    if (loadder) {
      window.addEventListener("load", () => {
        loadder.style.display = "none";
      });
    }
  
    // Estrellas de valoración
    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', function () {
        const value = parseInt(this.getAttribute('data-value'));
        document.querySelectorAll('.star').forEach(s => {
          s.innerHTML = s.getAttribute('data-value') <= value ? '★' : '☆';
        });
        console.log("⭐ Valoración dada:", value);
      });
    });
  
    // (Opcional) Fetch de usuarios
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => {
        console.log('Usuarios:', data);
      })
      .catch(err => console.error('Error al obtener usuarios:', err));
  });

  async function loginUser() {
    console.log("🧪 loginUser ejecutándose");
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    try {
      const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });
  
      const data = await res.json();
  
      console.log("🔎 Respuesta del servidor:", data);
  
      if (res.ok) {
        const userObj = {
          id: data.user_id,
          username: data.username,
          name: data.name
        };
  
        console.log("✅ Usuario autenticado, guardando en localStorage:", userObj);
        localStorage.setItem("usuario", JSON.stringify(userObj));
  
        // Verificamos inmediatamente si se guardó correctamente
        const stored = localStorage.getItem("usuario");
        console.log("📦 localStorage justo antes del reload:", stored);
  
        // Esperar brevemente para asegurar que se guarda
        await new Promise(resolve => setTimeout(resolve, 100));
  
        location.reload();
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      alert("Error al iniciar sesión");
    }
  
    return false;
  }
  
# 🌍 GeoCáceres

**GeoCáceres** es una aplicación web interactiva diseñada para ofrecer información turística, cultural y de servicios sobre la ciudad de Cáceres. Combina un sistema de reservas, autenticación de usuarios y un asistente virtual basado en inteligencia artificial (GPT) para proporcionar una experiencia moderna y personalizada a residentes y visitantes.

## 🚀 Funcionalidades principales

- 🧾 Registro e inicio de sesión de usuarios  
- 🧑‍💼 Visualización del perfil y gestión de reservas  
- 📅 Sistema de reservas con validación de disponibilidad  
- 💬 Asistente Virtual IA (GPT-4o) con funciones personalizadas (farmacias, puntos limpios, etc.)  
- 📱 Interfaz responsive y adaptativa  
- 🎞️ Contenido multimedia y secciones informativas  

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript  
- **Backend:** Node.js + Express  
- **Base de datos:** PostgreSQL (gestionada con pgAdmin4)  
- **IA Integrada:** OpenAI API (GPT-4o)  
- **Gestión de entorno:** `.env` + dotenv  
- **Seguridad:** bcrypt (hash de contraseñas), CORS  

## 📁 Estructura del Proyecto

GEOCACERES/
├── db/
│ └── client.js
├── public/
│ ├── asistente/
│ │ ├── css/
│ │ └── js/
│ ├── images/
│ ├── js/
│ ├── sass/
│ ├── index.html
│ ├── asistente.html
│ ├── micuenta.html
│ ├── registro.html
│ └── reservas.html
├── routes/
│ ├── reservas.js
│ └── usuarios.js
├── .env
├── server.js
├── README.md
├── package.json
└── .gitignore

## ⚙️ Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/emiliotamo/GeoCaceres.git
cd GeoCaceres
2. Instalar dependencias
bash
Copy
Edit
npm install
3. Configurar las variables de entorno
Crea un archivo .env y añade:

DATABASE_URL=postgres://usuario:contraseña@host:puerto/base_de_datos
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
4. Ejecutar en desarrollo

npm run dev
Abre en el navegador:
http://localhost:3000

🌐 Despliegue
Backend desplegado en Render

Base de datos PostgreSQL alojada también en Render

Asistente configurado en platform.openai.com

🧠 Asistente Virtual
Nombre: OpenData Sig Cáceres

Modelo: gpt-4o

Funciones activadas: Farmacias, PMR, Puntos Limpios, Estancos, Contenedores, Desfibriladores

Integrado visualmente en asistente.html con frontend de chat interactivo

👤 Autor
Proyecto desarrollado por:
Emilio Tamayo Morillo
📍 IES Ágora — Desarrollo de Aplicaciones Web

📄 Licencia
Este proyecto está licenciado bajo MIT. Puedes usarlo, modificarlo y distribuirlo libremente.


---

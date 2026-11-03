# PA3 — Barbería Full Stack

Aplicación académica para crear una cuenta, iniciar sesión y administrar servicios de una barbería. Cada usuario solo puede gestionar sus propios servicios.

## Tecnologías
- React + TypeScript + Vite + Tailwind CSS (frontend)
- Node.js + Express + TypeScript (API REST)
- MongoDB + Mongoose (base de datos)
- bcryptjs (hash de contraseñas) + JWT (autenticación)

## Requisitos
Node.js y npm, MongoDB local instalado y ejecutándose (o MongoDB Atlas), Git opcional.

## Configuración
1. En `server`, copiar `.env.example` a `.env` y reemplazar `JWT_SECRET` por una clave secreta aleatoria de al menos 32 caracteres. Ajustar `MONGODB_URI` según MongoDB local o Atlas.
2. En `client`, copiar `.env.example` a `.env` si se necesita personalizar la dirección de la API. El valor por defecto usa `http://localhost:3000`.
3. No subir archivos `.env` a GitHub.

## Ejecutar en desarrollo
Abrir **dos terminales** en la raíz del proyecto:

**Terminal 1 (servidor):**
```powershell
cd server
npm install
npm run dev
```
Servidor en `http://localhost:3000`.

**Terminal 2 (interfaz):**
```powershell
cd client
npm install
npm run dev
```
Abrir la URL mostrada por Vite, normalmente `http://localhost:5173`.

## Funcionalidades
- Registro con contraseña almacenada como hash bcrypt.
- Inicio de sesión con JWT que expira en 2 horas.
- Middleware que verifica `Authorization: Bearer <token>` para la API de servicios.
- Listado, creación, actualización y eliminación de servicios. Acceso limitado a los registros del usuario autenticado.
- Formularios React controlados con validaciones y feedback.

## Rutas de API
| Método | Ruta | Uso |
| --- | --- | --- |
| POST | `/auth/registro` | Crear usuario |
| POST | `/auth/login` | Obtener JWT |
| GET | `/servicios` | Listar propios (JWT) |
| POST | `/servicios` | Crear servicio (JWT) |
| PUT | `/servicios/:id` | Actualizar propio (JWT) |
| DELETE | `/servicios/:id` | Eliminar propio (JWT) |

## Evidencias y entrega
Tomar capturas de la página de inicio, formulario de registro, login, lista de servicios, creación/eliminación y MongoDB Compass mostrando documentos en `barberia_pa3`. Subir repositorio público a GitHub con `client`, `server`, `.env.example` y este README.

**Enlace del repositorio:** agregar aquí la URL pública una vez creado en GitHub.

> Proyecto derivado del PA2 de barbería, extendido con autenticación y separación `client/server` para el PA3.

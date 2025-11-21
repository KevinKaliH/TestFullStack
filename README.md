# 🧩 TestFullStack — Full Stack Reservation System

Proyecto full stack desarrollado con **.NET 8 Web API (Clean Architecture)** y **React + Vite**. Incluye CRUD completo, validaciones, búsqueda dinámica, arquitectura escalable y documentación Swagger.

---

## 🚀 Tecnologías utilizadas

### Backend — ASP.NET Core Web API (.NET 8)

- Clean Architecture (Domain → Application → Infrastructure → API)
- Entity Framework Core + SQLite
- FluentValidation
- Dependency Injection (DI)
- Middleware global para manejo de errores
- Swagger para documentación pública del API
- Validaciones tanto en el API como en el frontend

### Frontend — React + Vite

- React 18 + Vite
- React-Bootstrap
- React Hook Form
- Zustand (global state management)
- Arquitectura Screaming Architecture
- Formularios con validaciones
- Búsqueda dinámica (filtros avanzados)
- CRUD de clientes, eventos y reservaciones

---

# 📁 Estructura del proyecto

## Backend (API)

```
Api/
 ├── Api                → Controladores, inyección de dependencias, Swagger
 ├── Application        → Casos de uso, servicios, lógica de negocio
 ├── Domain             → Entidades del modelo de datos
 └── Infrastructure     → EF Core, SQLite, repositorios
```

## Frontend (React)

Arquitectura **Screaming Architecture**, separada por módulos:

```
frontend/reservation-app/
 ├── modules
 │    ├── clients
 │    │    ├── components
 │    │    ├── models
 │    │    ├── hooks
 │    │    ├── provider (services)
 │    │    └── Client.tsx
 │    ├── event-types
 │    └── reservations
 └── shared
      ├── components
      ├── utils
      ├── constants
      └── models
```

> Si algo solo lo usa un módulo → va dentro del módulo. Si es global → va dentro de `/shared`.

---

# 🧪 Pasos para ejecutar el proyecto

## Clonar el repositorio

```bash
git clone https://github.com/KevinKaliH/TestFullStack.git
cd TestFullStack
```

## Ejecutar Backend (API .NET 8)

```bash
cd Api
dotnet run Api.csproj
```

### URL de Swagger (documentación)

[http://localhost:5047/swagger/index.html](http://localhost:5047/swagger/index.html)

## Ejecutar Frontend (React + Vite)

```bash
cd frontend/reservation-app
npm install
npm run dev
```

Vite te mostrará algo como: `http://localhost:5173/`

---

# 🔧 Funcionalidades principales

### CRUD Completo

- Crear
- Leer
- Actualizar
- Eliminar (solo cambia estado a inactivo, no elimina físicamente)

### Validaciones

- Frontend: React Hook Form
- Backend: FluentValidation

### Búsqueda dinámica (reservaciones)

Filtrado por:

- Cliente
- Tipo de evento
- Rango de fechas
- Código de reservación
- Estado

---

# 🗂 Base de datos

- SQLite
- Creación automática si no existe
- Tabla principal: Reservaciones, Clientes, Tipos de eventos

---

# 🛡 Middleware de errores

- Captura excepciones globales
- Retorna respuestas unificadas
- Loguea errores internos

---

# 🧱 Dependency Injection

- Repositorios
- Servicios
- Validadores
- DbContext
- Casos de uso

---

# 📚 Swagger — Documentación del API

[http://localhost:5047/swagger/index.html](http://localhost:5047/swagger/index.html)

Endpoints principales:

- `GET /reservations` → Lista todas las reservaciones
- `POST /reservations` → Crear reservación
- `PUT /reservations/{id}` → Actualizar reservación
- `DELETE /reservations/{id}` → Inactivar reservación

---

## Diagrama de arquitectura

```
Frontend (React + Vite)
         |
         v
  API (ASP.NET Core)
         |
         v
   Application Layer
         |
         v
   Domain Layer
         |
         v
 Infrastructure Layer (EF Core + SQLite)
```

## Diagrama de base de datos (simplificado)

```
Clients
- Id
- Name
- Email
- Status

EventTypes
- Id
- Name

Reservations
- Id
- ClientId
- EventTypeId
- ReservationDate
- Status
```

## Capturas de pantalla sugeridas

1. Vista del frontend (lista de reservaciones)
   ![alt text](image.png)
2. Formulario de creación/edición
   ![alt text](image-1.png)
3. Swagger UI mostrando endpoints
   ![alt text](image-2.png)

---

## Nota sobre la URL del API

Si al ejecutar el API se genera una URL diferente a la indicada (por ejemplo, `http://localhost:5047/`), **actualiza la URL en el archivo `.env` del proyecto React** para que el frontend pueda consumir correctamente el servicio. Esto asegura que las llamadas HTTP se dirijan al endpoint correcto del backend.

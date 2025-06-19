# Sistema de Gestión de Parqueadero (Parking Lot API)

Este proyecto implementa una API RESTful para la gestión completa de un parqueadero, incluyendo control de usuarios, vehículos, accesos, celdas de parqueo, incidencias y sistema de pico y placa.

## 🚀 Características

- Gestión de usuarios con diferentes perfiles (administrador, operador, usuario)
- Control de vehículos (carros y motos)
- Registro de entradas y salidas
- Gestión de celdas de parqueo
- Sistema de pico y placa
- Registro y seguimiento de incidencias
- Historial de parqueo
- Documentación interactiva de la API

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **Base de Datos**: PostgreSQL (Supabase)
- **Documentación**: HTML + Tailwind CSS + Prism.js

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd Parking-Lot-PostgreSQL-Supabase
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
DB_HOST=aws-0-us-east-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
PORT=3000
```

4. Inicializa la base de datos:
   Ejecuta el script SQL proporcionado en `Script-PostgreSQL-Parking-Lot.sql`

## 🚀 Uso

1. Inicia el servidor:
```bash
node src/app.js
```

2. Accede a la documentación interactiva:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
Parking-Lot-PostgreSQL-Supabase/
├── src/
│   ├── app.js                 # Punto de entrada de la aplicación
│   ├── config/
│   │   └── db.config.js      # Configuración de la base de datos
│   ├── models/
│   │   ├── base.model.js     # Modelo base
│   │   ├── usuario.model.js  # Modelo de usuarios
│   │   ├── vehiculo.model.js # Modelo de vehículos
│   │   └── ...              # Otros modelos
│   └── routes/
│       ├── user.routes.js    # Rutas de usuarios
│       ├── vehicle.routes.js # Rutas de vehículos
│       └── ...              # Otras rutas
├── index.html               # Documentación interactiva
├── package.json
└── Script-PostgreSQL-Parking-Lot.sql  # Script de inicialización de BD
```

## 📚 API Endpoints

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Vehículos
- `GET /api/vehicles` - Obtener todos los vehículos
- `GET /api/vehicles/:id` - Obtener vehículo por ID
- `GET /api/vehicles/plate/:placa` - Buscar vehículo por placa
- `POST /api/vehicles` - Registrar nuevo vehículo
- `PUT /api/vehicles/:id` - Actualizar vehículo
- `DELETE /api/vehicles/:id` - Eliminar vehículo

### Accesos
- `GET /api/access` - Obtener todos los registros
- `POST /api/access` - Registrar entrada/salida

### Celdas
- `GET /api/cells` - Obtener todas las celdas
- `GET /api/cells/:id` - Obtener celda por ID
- `PUT /api/cells/:id` - Actualizar estado de celda

### Incidencias
- `GET /api/incidents` - Obtener todas las incidencias
- `POST /api/incidents` - Registrar nueva incidencia

### Pico y Placa
- `GET /api/pico-placa` - Consultar restricciones
- `GET /api/pico-placa/:dia` - Consultar por día

## 🔐 Seguridad

- Todas las contraseñas se almacenan encriptadas
- Conexión segura a la base de datos mediante SSL
- Sistema de roles y permisos

## 👥 Perfiles de Usuario

1. **Administrador**
   - Acceso completo al sistema
   - Gestión de usuarios y perfiles
   - Reportes y estadísticas

2. **Operador**
   - Control de accesos
   - Gestión de celdas
   - Registro de incidencias

3. **Usuario**
   - Consulta de disponibilidad
   - Registro de vehículos
   - Historial personal

## 📊 Modelos de Datos

### Usuario
```json
{
  "id_usuario": "integer",
  "tipo_documento": "string",
  "numero_documento": "string",
  "primer_nombre": "string",
  "primer_apellido": "string",
  "direccion_correo": "string",
  "numero_celular": "string",
  "estado": "string",
  "PERFIL_USUARIO_id": "integer"
}
```

### Vehículo
```json
{
  "id": "integer",
  "placa": "string",
  "color": "string",
  "modelo": "string",
  "marca": "string",
  "tipo": "string",
  "USUARIO_id_usuario": "integer"
}
```

## 🤝 Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Agradecimientos

- Equipo de desarrollo
- Contribuidores
- Comunidad de Node.js y PostgreSQL 
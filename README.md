# Issue Tracker

Una aplicación Next.js para el seguimiento de issues con Prisma y MySQL.

## 🚀 Despliegue Optimizado

### Docker (Recomendado para Producción)

```bash
# Build optimizado
docker build -t issue-tracker .

# Ejecutar con variables de entorno
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:password@host:3306/database" \
  issue-tracker
```

### Docker Compose (Desarrollo Local)

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f app
```

### Optimizaciones Implementadas

1. **Dockerfile Multi-stage**: Reduce el tamaño final de la imagen
2. **Caché de dependencias**: Acelera builds subsecuentes
3. **Output standalone**: Optimización específica para contenedores
4. **Usuario no-root**: Mejora la seguridad
5. **Healthcheck**: Mejor monitoreo del contenedor
6. **Compresión**: Assets optimizados
7. **.dockerignore**: Contexto de build más pequeño

### Tiempo de Build Estimado

- **Primer build**: ~3-4 minutos
- **Builds subsecuentes**: ~1-2 minutos (gracias al caché)
- **Reducción**: De 10 minutos a 2-4 minutos ⚡

## 📋 Requisitos

- Node.js 20+
- pnpm
- MySQL 8.0+
- Docker (opcional)

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Configurar base de datos
cp .env.example .env
# Editar DATABASE_URL en .env

# Ejecutar migraciones
pnpm prisma migrate dev

# Iniciar desarrollo
pnpm dev
```

## 🔧 Scripts Disponibles

```bash
pnpm dev          # Desarrollo con Turbopack
pnpm build        # Build de producción
pnpm start        # Iniciar servidor de producción
pnpm lint         # Linter
pnpm docker:build # Build de imagen Docker
pnpm docker:run   # Ejecutar contenedor Docker
```

## 🗄️ Base de Datos

La aplicación usa MySQL con Prisma ORM. El esquema incluye:

- **Issues**: Gestión de tickets/problemas
- Estados: OPEN, IN_PROGRESS, CLOSED

## 🌐 Endpoints API

- `GET /api/health` - Health check
- `GET /api/issues` - Listar issues
- `POST /api/issues` - Crear issue

## 🔒 Variables de Entorno

```env
DATABASE_URL="mysql://user:password@localhost:3306/issuetracker"
NEXT_TELEMETRY_DISABLED=1
```

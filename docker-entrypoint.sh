#!/bin/bash

# Script de inicio para contenedor Docker
set -e

echo "🚀 Iniciando aplicación..."

# Verificar conexión a la base de datos
echo "📡 Verificando conexión a la base de datos..."
npx prisma db push --accept-data-loss || {
    echo "❌ Error conectando a la base de datos"
    exit 1
}

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones..."
npx prisma migrate deploy || {
    echo "❌ Error ejecutando migraciones"
    exit 1
}

# Generar cliente de Prisma (por si acaso)
echo "⚙️ Generando cliente Prisma..."
npx prisma generate

echo "✅ Aplicación lista para iniciar"

# Iniciar la aplicación
exec "$@"
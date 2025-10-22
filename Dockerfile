# Dockerfile optimizado para Next.js con Prisma
FROM node:20-alpine AS base

# Instalar dependencias necesarias para Prisma y pnpm
RUN apk add --no-cache libc6-compat openssl curl
RUN corepack enable pnpm

# Configurar directorio de trabajo
WORKDIR /app

# ===== ETAPA DE DEPENDENCIAS =====
FROM base AS deps
# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Instalar dependencias de producción y desarrollo
# Usar cache mount para acelerar reinstalaciones
RUN --mount=type=cache,target=/root/.pnpm \
    pnpm install --frozen-lockfile

# ===== ETAPA DE BUILD =====
FROM base AS builder
WORKDIR /app

# Copiar dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copiar código fuente
COPY . .

# Generar cliente de Prisma
RUN pnpm prisma generate

# Deshabilitar telemetría de Next.js para el build
ENV NEXT_TELEMETRY_DISABLED=1

# Build de la aplicación
RUN pnpm build

# ===== ETAPA DE PRODUCCIÓN =====
FROM base AS runner
WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Copiar archivos de build y configuración
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copiar Prisma para migraciones
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/app/generated ./app/generated

# Copiar package.json para el script de inicio
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copiar script de entrada
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Script de inicio
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
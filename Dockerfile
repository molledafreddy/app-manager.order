FROM --platform=linux/amd64 node:16-alpine

WORKDIR /app

# Copiar package files primero para aprovechar cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar el resto del código
COPY . .

# Variables de entorno para Railway
ENV NODE_ENV=production
ENV REACT_APP_API_BASE=https://api-manager-o3iu9.ondigitalocean.app
ENV PORT=3000

# Build de la aplicación
RUN npm run build

# Instalar serve globalmente
RUN npm install -g serve

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]
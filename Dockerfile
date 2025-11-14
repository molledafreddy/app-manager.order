FROM node:18-alpine

WORKDIR /app

# Instalar wget y git
RUN apk add --no-cache wget git

# Copiar package files primero
COPY package.json ./
COPY package-lock.json* ./

# Limpiar cache de npm y reinstalar
RUN npm cache clean --force

# Instalar dependencias
RUN npm install --legacy-peer-deps --force --no-audit --no-fund


# Copiar el resto del código
COPY . .

# Asegurar que archivos legales estén en public
COPY public/privacy-policy.html public/
COPY public/terms-of-service.html public/
COPY public/data-deletion.html public/

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV GENERATE_SOURCEMAP=false
ENV CI=false

# Build
RUN npm run build

# Instalar serve
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
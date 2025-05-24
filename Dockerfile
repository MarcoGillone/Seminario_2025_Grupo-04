# Etapa de construcción
FROM node:18-alpine as builder
ENV npm_config_prefix=./node_modules
WORKDIR /app
# Establecer la ubicación personalizada para node_modules
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
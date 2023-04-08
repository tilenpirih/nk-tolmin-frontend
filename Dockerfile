# Build stage
FROM node:16.13.0-alpine3.14 as build-stage

WORKDIR /app

ARG DEPLOY_ENVIRONMENT=production
ENV DEPLOY_ENVIRONMENT ${DEPLOY_ENVIRONMENT}

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build -- --mode=$DEPLOY_ENVIRONMENT

# Production stage
FROM nginx:alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM node:14.16.1-alpine as build

WORKDIR /app
COPY . .

RUN npm ci && npm run build

FROM nginxinc/nginx-unprivileged:1-alpine

COPY ./default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
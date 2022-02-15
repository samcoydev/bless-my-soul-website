FROM node:14.15-alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN npm install
RUN ng build --configuration=development

FROM nginx:1.17-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/web/dist /usr/share/nginx/html 
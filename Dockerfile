# Stage 1: Building artifact
FROM node:latest as node
WORKDIR /app
COPY . . 
RUN npm install -g @angular/cli@15.2.10
RUN npm install --force 
#RUN npm install ngx-toastr@16.2.0
RUN ng build --configuration=development
# Stage 2: Running artifact
FROM nginx:alpine
COPY ./nginx1.conf /etc/nginx/conf.d/default.conf
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/template /usr/share/nginx/html
EXPOSE 80
CMD nginx -g "daemon off;"

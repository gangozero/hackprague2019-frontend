FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

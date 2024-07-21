# Utiliser une image de base
FROM nginx:alpine

# Installer Git
RUN apk add --no-cache git

# Supprimer le contenu par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Cloner le dépôt GitHub
RUN git clone https://github.com/michelnyobe/todo-list.git /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]

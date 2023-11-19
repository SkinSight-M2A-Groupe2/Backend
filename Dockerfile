# Le dockefile permet de pouvoir mettre tout notre code source et nos dépendances dans le conteneur qu'on va créer

# On va utiliser l'image node comme base
FROM node:20.9 AS base

# Crée un dossier app dans le conteneur
# Toutes les commandes qu'on lancera après seront exécutées dans ce dossier
WORKDIR /app

# On copie le fichier package.json qui contient toutes nos dépendances dans le conteneur
# Le . à la fin signifie qu'on copie le fichier dans le dossier courant (app)
COPY package.json .

# La commande EXPOSE n'a aucun effet sur le conteneur, elle permet juste de documenter le port sur lequel notre application va écouter
EXPOSE 3000

# Mise en place de plusieurs environnements grâce à la particularité de la commande FROM
# On peut mettre en place plusieurs environnements dans un seul Dockerfile sans que l'un interfère avec l'autre
# L'alias servira d'indication au docker-compose
# Plus d'informations sur la mise en place d'un Dockerfile à échelle multiples https://docs.docker.com/build/building/multi-stage/
FROM base AS development

# On lance la commande npm install pour installer toutes les dépendances à partir du fichier package.json
RUN npm install

# La raison pour laquelle on copie le code source après avoir installé les dépendances est que chaque étape est mise en cache

# Si on change le code source et que les dépendances n'ont pas été modifiées ou ajoutées, Docker va voir que le fichier package.json 
# n'a pas changé et ne va pas relancer l'installation des dépendances car le cache est toujours valide

# On copie tout le code source dans le conteneur, (premier . == dossier courant, deuxième . == dossier courant du conteneur))
COPY . .

# On indique à notre conteneur quelle commande il doit lancer quand on le démarre
# Ici, on lance la commande npm run dev lors du déploiement du conteneur
# npm run start est une commande qui est définie dans le fichier package.json
CMD ["npm", "run", "start"]

FROM base AS production
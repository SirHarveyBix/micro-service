# Micro service mini project

Ce mini projet met en place les bases du micro service

Le [front](./client/) tourne sous node 16 => `nvm install 16 && nvm use 16`.
Les differents autres services doivent etre lancées simultanement :

- [comments](./comments/)
- [event-bus](./event-bus/)
- [moderation](./moderation/)
- [posts](./posts/)
- [query](./query/)

utilisez `yarn start`, et `yarn` pour tout tout installer.

il est possible d'utiliser les Dockerfile, depuis la racine (après avoir executer `yarn` dans chacun des dossiers)
Ex: `docker build -t posts ./posts`  suivi par `docker run posts`

note: le service 'Query' depend de event-bus, il ne pourra etre executé que si event-bus est lancé.

vous avez une source documentaire concernant les routes possible : [response.http](./response.http)
vous aurez besoin de l'extention [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (VScode) pour lancer ces routes depuis votre IDE preferé
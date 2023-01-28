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

vous avez une source documentaire concernant les routes possible : [response.http](./response.http)
vous aurez besoin de l'extention [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (VScode) pour lancer ces routes depuis votre IDE preferé
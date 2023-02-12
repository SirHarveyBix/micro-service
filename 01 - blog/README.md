# Micro service mini project

Ce mini projet met en place les bases du micro service a l'aide doker et kubernetes

- [front](./client/) - node 16 => `nvm install 16 && nvm use 16`.
- [comments](./comments/)
- [event-bus](./event-bus/)
- [moderation](./moderation/)
- [posts](./posts/)
- [query](./query/)
- [infra](./infra/k8s/)

actuellement impossible :

- *il est possible d'utiliser les Dockerfile, depuis la racine (après avoir executer `yarn` dans chacun des dossiers)
Ex: `docker build -t posts ./posts`  suivi par `docker run posts`*

note: le service 'Query' depend de event-bus, il ne pourra etre executé que si event-bus est lancé.

concernant l'orchestration des service avec kubernetes voir le dossier : [infra](./infra/k8s/)

vous avez une source documentaire concernant les routes possible : [response.http](./response.http) grace a l'extention [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (VScode).

---

Pour lancer le projet : `kubectl apply -f ./infra/k8s` (hebrgé sur mon docker hub).

*sujet a  creuser : `type:  LoadBalancer | ClusterIP | NodePort`*

Pour lancer cette app vous avez besoin de [docker](https://docs.docker.com/get-started/overview/) (il vous faudra un compte si vous souhaitez lancer ce projet sans utuliser mes repos du [docker hub](https://hub.docker.com/repositories/sirharvey)) et [kubernetes](https://kubernetes.io/fr/docs/home/),

Pour chacun des services vous avez besoin de build chacun des services : `docker build -t sirharvey/posts ./posts`, et de `push`sur le docker hub : `docker push sirharvey/posts`.
Une fois fait, vous devrez appliquer la configuration : `kubectl apply -f ./infra/k8s`,
enfin, si vous modifiez un des service, a nouveau vous devrez :

- `docker build -t sirharvey/posts ./posts`, 
- `docker push sirharvey/posts`,
  ce qui mettra a jours l'image docker sur docker hub,

pour que ces changements soient pris en compte par kubernets : `kubectl rollout restart deployment posts-deploy`

__Dans le cas ou vous souhaitez avoir votre propre deploiement: il vous faudra modifier chaque ficher de [config](./infra/k8s/), et remplacer `sirharvey`, par votre DockerID (meme chose pour `docker build -t [DockerID]/posts ./posts`)__

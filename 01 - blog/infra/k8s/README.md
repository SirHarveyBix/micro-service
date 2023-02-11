# focntionnement bref kubernetes.

 apres avoir executer la commande : `docker build -t posts:0.0.1 .` dans le repertoire : [posts](../../posts/)

- `kubectl apply -f posts.yaml` : execute le fichier de config, ici [posts.yaml](./posts.yaml), __l'image `posts:0.0.1` doit etre créee__

- `kubectl get pods` affiche les informations sur tout les pods en cours

- `kubectl get deployments` affiche les informations sur tout les deployments en cours

- `kubectl get services` affiche les services en cours

- `kubectl exec -it posts sh` execute un commande dans le pod (ici on lance le terminal)

- `kubectl logs posts` affiche les logs du pod

- `kubectl describe pod posts` affiche les information du pod en question

- `kubectl describe deployments posts` affiche les information du deployments en question

- `kubectl delete pod posts` supprime le pod concerné

- `kubectl delete deployment posts` supprime le deployment concerné

pour creer l'image et la pousser sur le [Docker hub](https://hub.docker.com/), il est import de mentionner son dockerID : [`docker build -t sirharvey/posts .`](https://hub.docker.com/repository/docker/sirharvey/posts/general),ensuite : `docker push sirharvey/posts`

restart deployment : `kubectl rollout restart deployment posts-deploy`
il est toujours possible de retrouver tout ses deployments `kubectl get deployments`

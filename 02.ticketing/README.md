# Ticketing

`skaffold dev`

hosts file :
(macos: /etc/hosts)
`127.0.0.1 ticketing.dev`

Creer un secret partager pour les pods : `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=yolo`

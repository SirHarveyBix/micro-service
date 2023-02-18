FROM node:16.19-alpine

# fix create-react-app bug from running container
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json /app/

RUN npm i

COPY ./ /app/

CMD ["npm", "start"]
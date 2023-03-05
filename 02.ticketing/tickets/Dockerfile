FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev --only=prod

COPY . .

CMD ["npm", "start"]
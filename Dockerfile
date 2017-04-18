FROM node:alpine

WORKDIR /feathers

COPY ./ /feathers

RUN npm install -g pm2 && \
npm install

EXPOSE 3030

CMD ["pm2", "start", "src/index.js"]

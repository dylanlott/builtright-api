FROM node:alpine
WORKDIR /feathers
COPY ./ /feathers
ENV NODE_ENV production 
RUN npm install --production
EXPOSE 3030
CMD ["node", "src/index.js"]

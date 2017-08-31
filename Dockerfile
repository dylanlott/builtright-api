FROM node:alpine
COPY ./ /app 
WORKDIR /app
RUN npm install
VOLUME ["/app"]
EXPOSE 3000
CMD ["node", "index.js"]

FROM node:alpine
WORKDIR /user/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "node", "app.js" ]
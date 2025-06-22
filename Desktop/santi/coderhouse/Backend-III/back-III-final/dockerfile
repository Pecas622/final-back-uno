FROM node
WORKDIR /practica-final
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm","start"]
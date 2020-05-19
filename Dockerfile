FROM node:7


WORKDIR /app

# copy package.json file to new directory
COPY package.json ./app

# install node dependency packages
RUN npm install

# copy src files to app directory
COPY . /app
CMD ["npm", "start"]

# exposing port 3000 once container has launched
EXPOSE 3000

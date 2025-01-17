# node base debian image
FROM node:12.16.3

WORKDIR /app 

COPY . /app

CMD ["npm", "run start"]

# # install node dependency packages
# RUN npm install

# # exposing port 3000 once container has launched
# EXPOSE 3000

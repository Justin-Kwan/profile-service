# node base debian image
FROM node:12.16.3

WORKDIR /app

COPY . /app

CMD ["npm", "run start"]

# # install node dependency packages
# RUN npm install
#
# # copy src files to app directory
# COPY . /app
# CMD ["npm", "start"]
#
# # exposing port 3000 once container has launched
# EXPOSE 3000

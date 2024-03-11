FROM node:20.11.0-alpine AS development


ENV DockerHOME=/home/app/backend

# Set work directory
RUN mkdir -p '$DockerHOME'
# RUN mkdir $DockerHOME/public

# Where your backend app lives in your docker container
WORKDIR $DockerHOME

# Copy the current directory contents into the container at $DockerHOME
COPY .. $DockerHOME

# Install necessary packages on the container
RUN apk update && apk add gcc icu-data-full

# Update npm to the latest version
RUN npm update -g npm

# Run this command to install all dependencies for the Node.js app
RUN npm install

# Build the app
RUN npm run build

# Use the node user to run the app
USER node

# Make port available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "start:dev"]


###########################################################################################
FROM node:20.11.0-alpine AS production


ENV DockerHOME=/home/app/backend

# Set work directory
RUN mkdir -p '$DockerHOME'
# RUN mkdir $DockerHOME/public

# Where your backend app lives in your docker container
WORKDIR $DockerHOME

# Copy the current directory contents into the container at $DockerHOME
COPY .. $DockerHOME

# Install necessary packages on the container
RUN apk update && apk add gcc icu-data-full

# Update npm to the latest version
RUN npm update -g npm

# Run this command to install all dependencies for the Node.js app
RUN npm install

# Build the app
RUN npm run build

# Use the node user to run the app
USER node

# Make port available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "start:prod"]

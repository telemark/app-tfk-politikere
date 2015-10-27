###########################################################
#
# Dockerfile for app-tfk-politikere
#
###########################################################

# Setting the base to nodejs 4.2
FROM node:4.2

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install

# Expose 8000
EXPOSE 8000

# Startup
ENTRYPOINT node standalone.js
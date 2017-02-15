## This file is solely for development purpose.
## It was created in order to be able to build the framework in a clean node environment
## Usage :
##  Docker needs to be installed and your proxy and DNS servers properly setup.
##  Although default proxies are defined in the build file below, they may be overridden
## in the build command line by defined them as arguments (--build-arg "http_proxy=...") 
##
##  Build
##        docker build -t addisontest .
##  Run (remap container port to host 443 port)
##        docker run -it -p 443:8443 addisontest
##  Access in a web browser using base URL https://localhost
FROM node:5.12-wheezy

## remove if running in a non proxy environment
ENV http_proxy "http://proxy.houston.hpecorp.net:8080"
ENV https_proxy "http://proxy.houston.hpecorp.net:8080"
ENV no_proxy  "/var/run/docker.sock,localaddress,localhost,.hpe.com,.hpecorp.net,127.0.0.1,10.0.0.0/16,172.0.0.0/16"

# Create non-privileged user account to run with
ENV user node
RUN groupadd -r $user && useradd -ms /bin/bash -g $user $user
USER $user
WORKDIR /home/$user

# Install dependent packages (from npm@HPE) and application files
COPY package.json ./
RUN npm --registry https://registry.npmjs.itcs.hpecorp.net/ install
COPY . /home/$user/

# Defining a HOST environment variable will make Addison listen on all interfaces (0.0.0.0)
# on port 8443  (as port 443 cannot be bound to when running as a non-privileged user)
ENV HOST 0.0.0.0
ENV PORT 8443

# Expose port on which Addison is listening
EXPOSE $PORT

# Define default command.
CMD [ "npm", "start" ]
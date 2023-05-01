# smart-plug-server

## Quickstart

```bash
# Clone this repository
$ git clone https://github.com/smart-plug/smart-plug-server.git

# Go to project path
$ cd smart-plug-server

# Install dependences
$ npm install

# Start server 
$ npm run dev
```

## Using Docker

Go to the directory that has your `Dockerfile` and run the following command to build the Docker image. The `-t` flag lets you tag your image so it's easier to find later using the `docker images` command:

```bash
docker build . -t smart-plug-server
```

Your image will now be listed by Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            16         3b66eb585643    5 days ago
smart-plug-server               latest     d64d3505b0d2    1 minute ago
```

### Running the image

Running your image with `-d` runs the container in detached mode, leaving the container running in the background. The `-p` flag redirects a public port to a private port inside the container. Run the image you previously built:

```bash
docker run -p 49160:3000 -d smart-plug-server
```

Print the output of your app:

```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
> smart-plug-server@1.0.0 dev
> ts-node-dev src/index.ts

[INFO] 19:05:29 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.0.4)
```

If you need to go inside the container you can use the `exec` command:

```bash
# Enter the container
$ docker exec -it <container id> /bin/bash
```

### Shut down the image

```bash
# Kill our running container
$ docker kill <container id>
<container id>
```

# Docker

Build image (dockerfile in same folder):
```shell
docker build .
```

Run (frontend: port 3000, backend: port 5000):
```shell
docker run -p 3000:3000 <id>
```

List active containers (add -a for all):
```shell
docker ps
```

Stop a container:
```shell
docker stop <name>
```

# MERN

Frontend and Backend (from respective root folders):
```shell
npm start
```

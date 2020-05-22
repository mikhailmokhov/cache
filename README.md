# Cache Prototype
A simple cache without a database support. The server maintains a key–value associative array of items (json objects). `MEMORY_LIMIT` setting allows to limit amount of memory that can be used by the server. When the limit is reached, subsequent inserts cause older data to be purged in least recently used order.

## Install
`yarn`

## Run locally
`yarn run dev`

Access http://localhost:8080

## Settings
`PORT` and `MEMORY_LIMIT` in `.env` file where memory limit corresponds to `process.memoryUsage().heapUsed` nodejs parameter. After `heapUsed` reaches `MEMORY_LIMIT` subsequent inserts will cause older data to be purged in least recently used order. If for some reason memory limit is reached, but cache has no items to remove (the cache is already empty), server will return 507 error.   


## Endpoints
Healthcheck, current memory usage and memory limit `GET` http://localhost:8080/

Add item `POST` http://localhost:8080/v1/items

Get item `GET` http://localhost:8080/v1/items/{itemId}

Delete item `DELETE` http://localhost:8080/v1/items/{itemId}

(Testing) See all the items `GET` http://localhost:8080/v1/items


## Deploy
Project automatically builds Docker image, pushes it to Docker Hub and deploys image container to Digital Ocean Kubernetes cluster on push to master via GitHub actions.

Access Cluster http://64.227.108.161:31997

See deployment history https://github.com/steel8rat/cache/actions

Docker Hub repo https://hub.docker.com/repository/docker/steel8rat/cache

Github actions workflow config `.github/workflows/do-k8s-deploy.yml`

Digital Ocean Kubernetes config `do-k8s/api-server.yml`

## Test

`yarn run test`








# Snap GP

Snap GP aim to show topology of pollers/containers, their host, and managing them by switching container into hosts

## Before running the app

In order to run properly, you need to provide the .CSV file for topology and the .SH file for switching.
You can either :
* Go to api/Dockerfile.api and fill the two variables
```shell
ENV PATH_TOPOLOGY=/my/path/topology.csv
ENV PATH_SWITCH=/my/path/switch.sh
```
* Comment the two variables in api/Dockerfile.api and create and fill your own .env file with the same variables name as above
* Comment the two variables in api/Dockerfile.api and modify in api/config.py

## Run the app in dev mod

To run the app, make sure you have **Docker** installed on your device. Then run
```shell
docker-compose up
```

## Deploy the application

```shell
docker build -f Dockerfile.prod -t snapgp .
docker run --rm -p 3000:3000 snapgp
```





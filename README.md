# Snap GP

Snap GP aim to show topology of pollers/containers, their host, and managing them by switching container into hosts

## Run the app

To run the app, make sure you have **Docker** installed on your device. Then run 

```shell
docker build -f Dockerfile.front_back -t snapgp .
docker run --rm -p 3000:3000 snapgp
```



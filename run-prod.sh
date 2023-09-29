#!/bin/sh

IMAGE_NAME=contractus_web
CONTAINER_NAME=contractus_web_container

docker build -t $IMAGE_NAME .
docker run -d --rm -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME

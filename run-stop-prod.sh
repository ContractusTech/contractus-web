#!/bin/sh

IMAGE_NAME=contractus_web
CONTAINER_NAME=contractus_web_container

docker stop $CONTAINER_NAME
docker rmi -f $IMAGE_NAME

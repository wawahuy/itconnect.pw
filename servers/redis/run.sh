#!/bin/bash

source ../../scripts/docker_first.sh

docker rmi $(docker images -f "dangling=true" -q)
docker-compose stop
docker-compose rm -f
docker-compose up -d --build
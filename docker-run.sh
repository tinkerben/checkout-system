#!/bin/sh

docker run -v $PWD:/app -w /app -it node:15.13.0-alpine sh

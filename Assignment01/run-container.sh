#!/bin/bash

podman build -t book-of-programming-nginx-image .

# Since port 80 is already in use on my host machine by Apache2 Web Server, I will map the container port 80 to the host port 8081
podman run --name book-of-programming-nginx-container -p 8081:80 -d book-of-programming-nginx-image

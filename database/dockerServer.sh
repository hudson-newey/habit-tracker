#!/bin/bash
sudo docker pull mongo:latest
sudo docker run -d -p 27017:27017 --name=habit-tracker mongo:latest

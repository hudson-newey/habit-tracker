#!/bin/bash

if [ ! -d ./build/ ]; then
    echo "Building new solution";
    ./build.sh;
else;
    echo "Using cached build...";
fi

# database -> server -> client server

./build/database/dockerServer.sh;
./build/server &;
./build/clientServer &;

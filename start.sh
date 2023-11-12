#!/bin/bash

echo "Starting production environment...";

if [ ! -d ./build/ ]; then
    ./build.sh;
else;
    echo "Using cached build...";
fi

# database -> server -> client server

./build/database/dockerServer.sh;
./build/server &;
./build/clientServer &;

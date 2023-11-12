#!/bin/bash

echo "Building solution...";

if [ -d ./build/ ]; then
    rm -r ./build/;
fi

mkdir build;

go build ./server/server.go -o ./build/server;
go build ./clientServer/clientServer.go -o ./build/clientServer;

cd ./client;
ng build --output-path ../build/client;

cp ./database/ ./build/database;

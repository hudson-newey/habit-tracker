#!/bin/bash
rm -rf ./dist/;

pnpm build;

cd ../clientServer/;
go build ./clientServer;
./clientServer ../client/dist/client/index.html

#!/bin/bash
rm -rf ./dist/;

pnpm build;

# enable these lines if you want to restart the client server every time
# cd ../clientServer/;
# go build ./clientServer;
#./clientServer ../client/dist/client/index.html

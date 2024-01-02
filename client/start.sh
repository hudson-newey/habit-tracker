#!/bin/bash
echo "Warning: This script should only be used for development environments.";
pnpm build;

cd ../clientServer/;
go build ./clientServer;
./clientServer ../client/dist/client/index.html

#!/bin/bash
version=$( awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json )
echo "👉 Building production version v$version"
yarn build:prod
mkdir -p prod-packages/dist-v$version
cp -r dist-prod/* prod-packages/dist-v$version/
echo "🎉 Done 👉 The package is in prod-packages/dist-v$version"
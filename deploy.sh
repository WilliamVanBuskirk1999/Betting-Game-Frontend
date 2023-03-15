#!/usr/bin/env sh

set -e

npm run build

cd dist

git init add -A

git commit -m 'New Deployment'

git push -f git@github.com:WilliamVanBuskirk1999/WilliamVanBuskirk1999.github.io.git main:gh-pages

cd -
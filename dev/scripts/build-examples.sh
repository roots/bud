#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

echo -e "\nCleaning examples"
rm -rf examples/*/dist
rm -rf examples/*/node_modules
rm -rf examples/*/.budfiles
rm -rf examples/sage/public
rm -rf examples/sage/storage/bud

echo -e "\nBuilding: basic"
cd examples/basic
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: babel"
cd ../babel
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

# echo -e "\nBuilding critical-css"
# cd ../critical-css
# cp package.json package.json.bak
# yarn bud init
# yarn bud build --debug --ci
# cp package.json.bak package.json
# rm package.json.bak

echo -e "\nBuilding: esbuild"
cd ../esbuild
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: md"
cd ../md
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: postcss"
cd ../postcss
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: preset-recommend"
cd ../preset-recommend
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: react"
cd ../react
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: sage"
cd ../sage
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: sass"
cd ../sass
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: tailwindcss"
cd ../tailwindcss
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: typescript"
cd ../typescript
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: vue"
cd ../vue
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo -e "\nBuilding: wordpress-theme"
cd ../wordpress-theme
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

exit

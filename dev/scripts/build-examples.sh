#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

echo "Cleaning examples"
rm -rf examples/*/dist
rm -rf examples/*/node_modules
rm -rf examples/*/.budfiles
rm -rf examples/sage/public
rm -rf examples/sage/storage/bud

echo ""
echo "Building: basic"
cd examples/basic
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: babel"
cd ../babel
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building critical-css"
cd ../critical-css
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: esbuild"
cd ../esbuild
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: md"
cd ../md
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: postcss"
cd ../postcss
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: preset-recommend"
cd ../preset-recommend
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: react"
cd ../react
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: sage"
cd ../sage
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: sass"
cd ../sass
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: tailwindcss"
cd ../tailwindcss
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: typescript"
cd ../typescript
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: vue"
cd ../vue
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

echo ""
echo "Building: wordpress-theme"
cd ../wordpress-theme
cp package.json package.json.bak
yarn bud init
yarn bud build --debug --ci
cp package.json.bak package.json
rm package.json.bak

exit

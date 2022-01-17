#!/bin/sh

echo removing public packages
rm -rf /roots/verdaccio/@roots

echo copying files
cp -rf /roots/bud/examples /roots/examples/yarn
cp -rf /roots/bud/examples /roots/examples/npm

#!/bin/sh

echo removing public packages
rm -rf $ROOTS_PATH/verdaccio/@roots

echo copying files
cp -rf $BUD_PATH/examples $ROOTS_PATH/examples/yarn
cp -rf $BUD_PATH/examples $ROOTS_PATH/examples/npm


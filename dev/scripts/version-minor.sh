#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"

source "${SCRIPTS_DIR}/handler.sh"

yarn workspaces foreach --no-private version minor

source "${SCRIPTS_DIR}/prep.sh"
source "${SCRIPTS_DIR}/build-examples.sh"

yarn install

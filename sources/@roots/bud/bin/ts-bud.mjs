#!/usr/bin/env -S ts-node --esm --transpileOnly --cwdMode

// eslint-disable-next-line n/no-process-env
process.env.BUD_JS_BIN = `ts-node`

import '../lib/cli/index.js'

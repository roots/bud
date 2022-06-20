#!/usr/bin/env -S ts-node --esm --transpileOnly --skipProject --cwdMode

(async () => {
  await import('../lib/cli/index.js');
})()

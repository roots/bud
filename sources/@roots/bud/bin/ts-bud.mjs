#!/usr/bin/env -S ts-node --esm --transpileOnly --cwdMode

(async () => {
  await import('../lib/cli/index.js');
})()

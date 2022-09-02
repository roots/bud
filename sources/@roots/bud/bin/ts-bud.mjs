#!/usr/bin/env -S ts-node --esm --transpileOnly --cwdMode
/* eslint-disable n/shebang */

(async () => {
  await import(`../lib/cli/index.js`);
})()

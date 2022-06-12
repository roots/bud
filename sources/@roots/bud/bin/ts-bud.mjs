#!/usr/bin/env -S ts-node --esm --transpileOnly --swc

(async () => {
  await import('./bud.mjs')
})()

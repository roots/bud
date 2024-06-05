import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    alias: {
      'sources/@roots/(.*)/lib/(.*)': `sources/@roots/$1/src/$2`,
    },
    coverage: {
      enabled: false,
      include: [
        `sources/@roots/*/src/*.ts`,
        `sources/@roots/*/src/*.tsx`,
        `sources/@roots/*/src/**/*.ts`,
        `sources/@roots/*/src/**/*.tsx`,
      ],
    },
    exclude: [`tests/e2e`, `**/node_modules`],
    include: [
      `sources/@roots/**/*.test.ts`,
      `sources/@roots/**/*.test.tsx`,
      `tests/**/*.test.ts`,
      `tests/**/*.test.tsx`,
    ],
  },
})

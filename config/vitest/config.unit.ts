import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    coverage: {
      enabled: false,
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

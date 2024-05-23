import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    exclude: [`**/node_modules`, `tests/e2e`],
    include: [
      `sources/@roots/**/*.test.ts`,
      `sources/@roots/**/*.test.tsx`,
      `tests/**/*.test.ts`,
      `tests/**/*.test.tsx`,
    ],
  },
})

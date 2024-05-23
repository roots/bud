import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    include: [`tests/e2e/**/*.test.ts`],
  },
})

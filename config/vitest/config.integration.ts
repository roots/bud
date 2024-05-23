import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    include: [`tests/integration/**/*.test.ts`],
    setupFiles: [`./config/vitest/setup.integration.ts`],
  },
})

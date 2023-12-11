import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    include: [`tests/integration/**/*.test.ts`],
    pool: `forks`,
    poolOptions: {
      forks: {
        maxForks: 1,
        minForks: 1,
      },
    },
    setupFiles: [`./config/vitest/setup.integration.ts`],
    watch: false,
  },
})

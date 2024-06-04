import {defineConfig} from 'vitest/config'

import shared from './config.shared'

export default defineConfig({
  test: {
    ...shared,
    include: [`tests/integration/**/*.test.ts`],
    isolate: true,
    pool: `threads`,
    poolOptions: {
      threads: {
        isolate: true,
        useAtomics: true,
      },
    },
    setupFiles: [`./config/vitest/setup.integration.ts`],
  },
})

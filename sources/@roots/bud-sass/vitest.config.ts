import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [`**/types/*.ts`],
      include: [`src/**/*.ts`],
      provider: `v8`,
    },
    include: [`test/*.test.ts`],
  },
})

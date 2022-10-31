export default {
  test: {
    include: [`sources/@roots/*/src/**/*.test.ts`],
    exclude: [
      `sources/**/node_modules/**`,
      `sources/**/dist/**`,
      `sources/**/cypress/**`,
      `sources/**/.{idea,git,cache,output,temp}/**`,
      `sources/**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*`,
    ],
  },
}

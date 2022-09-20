import {describe, expect, it} from '@jest/globals'
import {Bud, factory, repoPath} from '@repo/test-kit/bud'
import * as fs from '@roots/bud-support/fs'
import {Bench} from 'tinybench'

describe(`benchmark`, () => {
  it(`should run in less than 10ms`, async () => {
    const bench = new Bench({
      iterations: 100,
    })

    bench.add(`factory`, async () => {
      const bud: Bud = await factory()
      await bud.run()
      return bud
    })

    await bench.run()

    const result = bench?.getTask(`factory`)?.result
    console.log(result)

    await fs.ensureDir(repoPath(`tests`, `unit`, `tests`, `artifacts`))
    await fs.writeFile(
      repoPath(`tests/unit/tests/artifacts/latest.json`),
      JSON.stringify(result, null, 2),
    )

    expect(result?.mean).toBeLessThan(process.env.CI ? 30 : 20)
  })
})

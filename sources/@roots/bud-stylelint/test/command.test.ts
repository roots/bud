import {describe, expect, it} from 'vitest'
import {execa} from 'execa'

describe(`bud stylelint`, () => {
  it('should return 0', async () => {
    const result = await execa('yarn', [
      'workspace',
      '@tests/stylelint-command',
      'run',
      'bud',
      'stylelint',
    ])

    expect(result.exitCode).toBe(0)
  })
})

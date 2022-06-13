import {paths} from '@repo/constants'
import {read, write} from '@roots/bud-framework/parsers/yml'
import {join} from 'node:path'

describe('bud.yml', () => {
  describe('read', () => {
    it('read is a fn', async () => {
      expect(read).toBeInstanceOf(Function)
    })
    it('reads yml', async () => {
      const manifest: Record<string, any> = await read(
        join(process.cwd(), '.yarnrc.yml'),
      )
      expect(manifest.enableTelemetry).toBe(false)
    })
  })

  describe('write', () => {
    it('is a fn', async () => {
      expect(write).toBeInstanceOf(Function)
    })

    test.todo('writes yml')
  })
})

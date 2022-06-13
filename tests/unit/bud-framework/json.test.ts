import {read, write} from '@roots/bud-framework/parsers/json5'
import {join} from 'node:path'

describe('bud.json', () => {
  describe('read', () => {
    it('read is a fn', async () => {
      expect(read).toBeInstanceOf(Function)
    })
    it('reads json', async () => {
      const manifest = await read(join(process.cwd(), 'package.json'))
      expect(manifest.name).toBe('bud')
    })
  })

  describe('write', () => {
    it('is a fn', async () => {
      expect(write).toBeInstanceOf(Function)
    })

    test.todo('writes json')
  })
})

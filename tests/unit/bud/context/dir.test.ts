import {Dir} from '@roots/bud/context/dir'
import {join} from 'node:path'

describe('unit', function () {
  describe('context', () => {
    describe('dir', () => {
      let impl: Dir

      beforeEach(async () => {
        impl = new Dir(process.cwd())
      })

      test('cwd is rekt', async () => {
        impl.set('cwd', 'void')

        try {
          await impl.find()
        } catch (e) {
          expect(e).toBeInstanceOf(Error)
        }
      })

      test('cwd is ok', async () => {
        const result = await impl.find()
        expect(result.cwd).toBe(process.cwd())
      })

      test('resolves up', async () => {
        const cwd = join(process.cwd(), 'sources')
        impl.set('cwd', cwd)

        const result = await impl.find()
        expect(result.project).toBe(process.cwd())
      })
    })
  })
})

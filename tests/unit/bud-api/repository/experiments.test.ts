import {Bud, factory} from '@repo/test-kit/bud'
import {join} from 'path'

describe('bud.experiments', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({
      features: {
        dashboard: false,
        log: false,
      },
      location: {
        project: join(process.cwd(), 'examples/sage'),
      },
    })
  })

  it('is a function', () => {
    expect(bud.experiments).toBeInstanceOf(Function)
  })

  it('enables build.config.experiments', async () => {
    bud.experiments('lazyCompilation', true)
    await bud.build.make()

    const output = await bud.hooks.filterAsync(
      'build.experiments',
    )

    expect(output).toEqual({lazyCompilation: true})
  })
})

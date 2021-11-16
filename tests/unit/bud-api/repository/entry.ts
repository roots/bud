import {factory, Framework} from '@roots/bud'
import {join} from 'path'

describe('bud.entry', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
        location: {
          project: join(process.cwd(), 'examples/sage'),
        },
      },
    })

    bud.logger.instance.scope('bud.entry test')
  })

  beforeEach(async () => {
    await bud.hooks.promise('build/entry', async entry => ({}))
  })

  it('sets an entrypoint using (string, string) fn signature', async () => {
    bud.entry('app', 'scripts/app.js')
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js'],
      },
    })
  })

  it('sets an entrypoint using (string, string) fn signature with globbing', async () => {
    bud.entry('app', '**/app.{css,js}').build
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature', async () => {
    bud.entry('app', ['scripts/app.js', 'styles/app.css'])
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature with globbing', async () => {
    bud.entry('app', ['**/app.js', '**/editor.css'])
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/editor.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature', async () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
    })
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature with globbing', async () => {
    bud.entry({
      app: ['**/app.js', 'styles/*.css'],
    })
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: [
          'scripts/app.js',
          'styles/app.css',
          'styles/editor.css',
        ],
      },
    })
  })

  it('sets multiple entrypoints using k, v fn signature', async () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
      editor: ['scripts/editor.js', 'styles/editor.css'],
    })
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
      editor: {
        import: ['scripts/editor.js', 'styles/editor.css'],
      },
    })
  })
})

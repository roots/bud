import {config, factory, Framework} from '@roots/bud'

describe.skip('bud.entry', function () {
  let bud: Framework

  beforeAll(async () => {
    bud = await factory({
      config: {
        ...config,
        features: {
          dashboard: false,
          log: false,
        },
        location: {
          ...config.location,
          project: `${process.cwd()}/examples/sage`,
          src: 'resources',
        },
      },
    })

    bud.build.make()
  })

  beforeEach(() => {
    bud.hooks.on('build/entry', {})
  })

  it('sets an entrypoint using (string, string) fn signature', () => {
    bud.entry('app', 'scripts/app.js').build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js'],
      },
    })
  })

  it('sets an entrypoint using (string, string) fn signature with globbing', () => {
    bud.entry('app', '**/app.{css,js}').build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature', () => {
    bud
      .entry('app', ['scripts/app.js', 'styles/app.css'])
      .build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature with globbing', () => {
    bud.entry('app', ['**/app.js', '**/editor.css']).build.make()
    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/editor.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature', () => {
    bud
      .entry({
        app: ['scripts/app.js', 'styles/app.css'],
      })
      .build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature with globbing', () => {
    bud.entry({
      app: ['**/app.js', 'styles/*.css'],
    })

    bud.build.make()

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

  it('sets multiple entrypoints using k, v fn signature', () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
      editor: ['scripts/editor.js', 'styles/editor.css'],
    })

    bud.build.make()

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

import {
  Framework,
  setupBud,
  config,
  teardownBud,
} from '../../util'

describe('bud.entry', function () {
  let bud: Framework

  beforeAll(() => {
    bud = setupBud('production', {
      ...config,
      location: {
        ...config.location,
        project: `${process.cwd()}/examples/sage`,
        src: 'resources',
      },
    })
    return
  })

  afterAll(() => {
    teardownBud(bud)
    return
  })

  beforeEach(() => {
    bud.hooks.on('build/entry', {})
  })

  it('sets an entrypoint using (string, string) fn signature', () => {
    bud.entry('app', 'scripts/app.js')
    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js'],
      },
    })
  })

  it('sets an entrypoint using (string, string) fn signature with globbing', () => {
    bud.entry('app', '**/app.{css,js}')
    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature', () => {
    bud.entry('app', ['scripts/app.js', 'styles/app.css'])

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature with globbing', () => {
    bud.entry('app', ['**/app.js', '**/editor.css'])
    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/editor.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature', () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
    })

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

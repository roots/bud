import {Bud, factory} from '@repo/test-kit/bud'

describe('bud.entry', function () {
  let bud: Bud

  beforeAll(async () => (bud = await factory()))
  beforeEach(() => bud.hooks.on('build.entry', {}))

  it('sets an entrypoint using (string, string) fn signature', async () => {
    await bud.api.call('entry', 'app', 'scripts/app.js')

    expect(bud.hooks.filter('build.entry')).toEqual({
      app: {import: ['scripts/app.js']},
    })
  })

  it('sets an entrypoint using (string, string) fn signature with globbing', async () => {
    await bud.api.call('entry', 'app', '**/app.{css,js}')

    const {
      app: {import: value},
    } = bud.hooks.filter('build.entry')

    expect(value).toContain('scripts/app.js')
    expect(value).toContain('styles/app.css')
  })

  it('sets an entrypoint using (string) fn signature', async () => {
    await bud.api.call('entry', 'styles/app.css')

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      default: {
        import: ['styles/app.css'],
      },
    })
  })
  it('sets an entrypoint using (array) fn signature', async () => {
    await bud.api.call('entry', ['scripts/app.js', 'styles/app.css'])

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      default: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature', async () => {
    await bud.api.call('entry', 'app', [
      'scripts/app.js',
      'styles/app.css',
    ])

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature with globbing', async () => {
    await bud.api.call('entry', 'app', ['**/app.js', '**/editor.css'])

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/editor.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature', async () => {
    await bud.api.call('entry', {
      app: ['scripts/app.js', 'styles/app.css'],
    })

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature with globbing', async () => {
    await bud.api.call('entry', {app: ['**/app.js', 'styles/*.css']})

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css', 'styles/editor.css'],
      },
    })
  })

  it('sets multiple entrypoints using k, v fn signature', async () => {
    await bud.api.call('entry', {
      app: ['scripts/app.js', 'styles/app.css'],
      editor: ['styles/editor.css'],
    })

    expect(bud.hooks.filter('build.entry')).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
      editor: {
        import: ['styles/editor.css'],
      },
    })
  })

  it('supports other props', async () => {
    const input: Record<string, any> = {
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
        runtime: 'main',
      },
      editor: {
        import: ['styles/editor.css'],
        dependOn: ['app'],
      },
    }

    await bud.api.call('entry', input)

    expect(bud.hooks.filter('build.entry')).toStrictEqual(input)
  })
})

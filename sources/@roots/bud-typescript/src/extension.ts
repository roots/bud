import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-typescript')
@expose('typescript')
@dependsOn(['@roots/bud-babel'])
export default class BudTypeScript extends Extension {
  public get typecheck() {
    return this.app.extensions.get('@roots/bud-typescript/typecheck')
  }

  @bind
  public async init() {
    const {default: typecheck} = await import('./typecheck/index.js')
    await this.app.extensions.add(typecheck)
  }

  @bind
  public async register() {
    const loader = await this.resolve('ts-loader')
    const compiler = await this.resolve('typescript')

    this.app.build
      .setLoader('ts', loader)
      .setItem('ts', {
        loader: 'ts',
        options: {
          compiler,
          transpileOnly: true,
        },
      })
      .setRule('ts', {
        test: ({hooks}) => hooks.filter('pattern.ts'),
        include: [({path}) => path('@src')],
        use: ['babel', 'ts'],
      })

    this.app.build.rules.js.setUse(['babel', 'ts'])

    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )
  }
}

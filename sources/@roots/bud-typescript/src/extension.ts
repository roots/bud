import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-typescript')
@expose('typescript')
@options({
  transpileOnly: true,
})
@dependsOn(['@roots/bud-babel', '@roots/bud-typescript/typecheck'])
export default class BudTypeScript extends Extension {
  public get typecheck() {
    return this.app.extensions.get('@roots/bud-typescript/typecheck')
  }

  @bind public async init() {
    this.setOption('context', this.app.path('./'))
  }

  @bind public async register() {
    const loader = await this.resolve('ts-loader')

    this.app.build
      .setLoader('ts', loader)
      .setItem('ts', {
        loader: 'ts',
        options: this.getOptions,
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

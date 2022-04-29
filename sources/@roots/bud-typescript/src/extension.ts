import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-typescript')
@expose('typescript')
@dependsOn(['@roots/bud-babel', '@roots/bud-typescript/typecheck'])
export default class BudTypeScript extends Extension {
  public get typecheck() {
    return this.app.extensions.get('@roots/bud-typescript/typecheck')
  }

  @bind
  public async register() {
    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )

    this.app.build
      .setLoader('ts', this.resolve('ts-loader'))
      .setItem('ts', {
        loader: 'ts',
        options: {
          compiler: this.resolve('typescript'),
          transpileOnly: true,
        },
      })
      .setRule('ts', {
        test: ({hooks}) => hooks.filter('pattern.ts'),
        include: [({path}) => path('@src')],
        use: ['babel', 'ts'],
      })

    this.app.build.rules.js.setUse(['babel', 'ts'])
  }
}

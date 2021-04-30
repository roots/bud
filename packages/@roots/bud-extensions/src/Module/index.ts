import {Module as Contract} from '@roots/bud-framework'

export abstract class Module<Plugin = any, Options = any>
  implements Contract {
  public name: Contract['name']

  public options?: Contract['options']

  public dependencies?: Contract['dependencies']

  public devDependencies?: Contract['devDependencies']

  public register?: Contract['register']

  public boot?: Contract['boot']

  public api?: Contract['api']

  public make?: Contract['make']

  public when?: Contract['when']

  public publish?: Contract['publish']
}

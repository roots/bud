import type {ApplyPlugin, Extension, ExtensionLiteral} from '../extension'
import {Service} from '../service.js'
import type {Modules} from '../types/registry/modules'
import type {Service as BaseExtensionsService} from '../types/services/extensions'

/**
 * Extensions Service
 *
 * @public
 */
export abstract class Extensions
  extends Service
  implements BaseExtensionsService
{
  public static label = `extensions`

  public abstract repository: Modules

  public abstract unresolvable: Set<string>

  public has<K extends keyof Modules>(
    key: K & string,
    ...iterable: any[]
  ): boolean {
    return this.repository[key] ? true : false
  }

  public get<K extends keyof Modules>(key: K & string) {
    return this.repository[key]
  }

  public remove<K extends keyof Modules>(key: K & string): this {
    delete this.repository[key]
    return this
  }

  public set<K extends keyof Modules>(value: Modules[K & string]): this {
    this.repository[value.label] = value
    return this
  }

  public abstract instantiate<K extends keyof Modules>(
    extension:
      | (new (...args: any[]) => Modules[K & string])
      | ExtensionLiteral,
  ): Modules[K & string]

  public abstract filterApplicableExtensions(
    extensions: Array<string>,
  ): Array<string>

  public abstract import(signifier: string): Promise<Extension>

  public abstract add(
    input:
      | (new (...args: any[]) => Extension)
      | ExtensionLiteral
      | Array<(new (...args: any[]) => Extension) | ExtensionLiteral>,
  ): Promise<void>

  public abstract run<K extends keyof Modules & string>(
    extension: Modules[K],
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_configAfter'
      | '_buildBefore'
      | '_buildAfter'
      | '_make',
  ): Promise<this>

  public abstract runAll(
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_configAfter'
      | '_buildBefore'
      | '_buildAfter'
      | '_make',
  ): Promise<any>

  public abstract runDependencies<K extends keyof Modules>(
    extension: Modules[K & string] | (keyof Modules & string),
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_configAfter'
      | '_buildBefore'
      | '_buildAfter'
      | '_make',
  ): Promise<void>

  public abstract make(): Promise<ApplyPlugin[]>
}

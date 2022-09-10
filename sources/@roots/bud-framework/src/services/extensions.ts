import type {ApplyPlugin, Extension, ExtensionLiteral} from '../extension'
import {Service as BaseService} from '../service.js'
import type {Modules} from '../types/registry/modules'
import type * as Base from '../types/services/extensions'

export type {Base}

/**
 * Extensions Service
 *
 * @public
 */
export abstract class Service extends BaseService implements Base.Service {
  public static label = `extensions`

  public abstract repository: Modules

  public abstract unresolvable: Set<string>

  public methodNames: Array<Base.LifecycleMethods>

  public has<K extends keyof Modules>(key: K & string): boolean {
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
    methodName: Base.LifecycleMethods,
  ): Promise<this>

  public abstract runAll(methodName: Base.LifecycleMethods): Promise<any>

  public abstract runDependencies<K extends keyof Modules>(
    extension: Modules[K & string] | (keyof Modules & string),
    methodName: Base.LifecycleMethods,
  ): Promise<void>

  public abstract make(): Promise<ApplyPlugin[]>
}

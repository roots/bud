import {Extension, Extensions, Project} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import {Controller} from '../Controller/controller.service'

/**
 * Import extension code
 *
 * @public
 */
export interface Importer {
  /**
   * Reducer to be used with to import and set {@link Controller} instances
   * from {@link Extension.BudManifest} records in an order compiant with their
   * listed dependencies.
   *
   * @public
   */
  mapManifests(): Promise<Array<Controller>>

  /**
   * Maps {@link Extension.BudManifest} to required peers
   *
   * @public
   */
  mapToPeerList(name: string): Array<String>

  /**
   * Maps {@link Extension.BudManifest.name} to {@link Extension.BudManifest} records
   *
   * @public
   */
  mapToManifest(name: string): Extension.BudManifest

  /**
   * Filters records which do not match {@link Extension.BudManifest} schema
   *
   * @public
   */
  filterNonExtensions(manifest: Extension.BudManifest): boolean

  /**
   * Imports a module from a {@link Extension.BudManifest} record
   * and adds it to the {@link Extensions} service
   *
   * @param manifest - bud module manifest
   *
   * @public
   */
  makeController(manifest: Extension.BudManifest): Promise<Controller>
}

export class Importer {
  public controllers: Set<Controller> = new Set()
  public manifests: Set<Extension.BudManifest>

  public constructor(
    public extensions: Extensions,
    public project: Project,
  ) {
    extensions.log('info', {
      message: 'bud.extensions.importer',
      suffix: 'instantiated',
    })
  }

  @bind
  public async mapManifests(): Promise<Array<Controller>> {
    this.manifests = new Set(
      Object.values(
        this.project.get<Record<string, Extension.BudManifest>>('modules'),
      )
        .filter(Boolean)
        .filter(this.filterNonExtensions)
        .filter(this.filterExisting),
    )

    for (const manifest of this.manifests) {
      const controller = await this.makeController(manifest)
      this.controllers.add(controller)
    }

    return Array.from(this.controllers)
  }

  @bind
  public filterNonExtensions(manifest: Extension.BudManifest): boolean {
    return manifest?.bud?.type === 'extension'
  }

  @bind
  public filterExisting(manifest: Extension.BudManifest): boolean {
    return !this.extensions.has(manifest.name)
  }

  @bind
  public async makeController(
    manifest: Extension.BudManifest,
  ): Promise<Controller> {
    const importedModule = await this.extensions.import(manifest.name)

    return this.extensions.makeController(
      importedModule,
      manifest.bud.peers,
    )
  }
}

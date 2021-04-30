import {Framework} from '@roots/bud-framework'
import {Base} from './Base'
import {boundMethod as bind} from 'autobind-decorator'
import fs from 'fs-extra'
import {sync} from 'globby'
import {dirname} from 'path'

export class Discovery extends Base {
  public get packagePaths() {
    return sync([
      this.app.path('modules', '@roots/sage/package.json'),
      this.app.path('modules', 'bud-*/package.json'),
      this.app.path('modules', '**/bud-*/package.json'),
    ])
  }

  @bind
  public boot({sequence}: Framework): void {
    sequence([this.discoverPackages, this.registerDiscovered])
  }

  @bind
  public discoverPackages(): void {
    this.setStore(
      this.packagePaths
        .filter(this.filterUnique)
        .reduce(this.reducePackages, {}),
    )
  }

  @bind
  public registerDiscovered() {
    this.app.store.isTrue('discover') &&
      this.every((name: string) => {
        const extension = require(name)

        this.app.extensions.add(extension)
      })
  }

  @bind
  public reducePackages(pkgs: Framework.Pkgs, pkg: string) {
    const json = fs.readJsonSync(pkg)

    Object.assign(json, {
      isCore: json.name?.includes('@roots/'),
      isPreset: json.keywords?.includes('bud-preset'),
      isExtension: json.keywords?.includes('bud-extension'),
    })

    if (!json.isExtension) return pkgs

    return {
      ...pkgs,
      [json.name]: {
        ...json,
        path: dirname(pkg),
        type: 'extension',
        core: json.isCore,
      },
    }
  }
}

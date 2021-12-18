/* eslint-disable simple-import-sort/imports */
import {Framework, Service} from '@roots/bud-framework'
import {bind, fs, pkgUp, safeResolve} from '@roots/bud-support'
import {posix} from 'path'

import type {Peers as Model} from './peers.interface'

import {graph, graphPath} from './graph'

const {readJson} = fs
const {dirname, join} = posix

/**
 * Peers service class
 *
 * @public
 */
export class Peers implements Model.Interface {
  /**
   * Log helper
   *
   * @public
   */
  public get log(): Service['log'] {
    return this.app.project.log
  }

  public graph: graph = graph
  public rootManifest: Record<string, any> = {}
  public mergedDependencies: Record<string, any> = {}

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(
    public app: Framework,
    public version: string,
  ) {}

  /**
   * Returns path for a module name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async resolveModulePath(name: string) {
    try {
      const result = await pkgUp({
        cwd: dirname(safeResolve(name)),
      })

      return dirname(result)
    } catch (err) {
      this.log('error', `${name} manifest cannot be resolved`)
      return
    }
  }

  /**
   * Returns manifest for a module from name (if findable)
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getManifest(directoryPath: string) {
    try {
      return await readJson(join(directoryPath, '/package.json'))
    } catch (err) {
      this.log('error', {
        message: `manifest could not be resolved`,
        suffix: directoryPath,
      })
    }
  }

  /**
   * Returns true if a module is a bud
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public isExtension(manifest: Record<string, any>): boolean {
    return manifest?.bud?.type === 'extension'
  }

  @bind
  public async setProjectJson() {
    this.rootManifest = await this.getManifest(
      this.app.path('project'),
    )

    this.mergedDependencies = Object.entries({
      ...(this.rootManifest.devDependencies ?? {}),
      ...(this.rootManifest.dependencies ?? {}),
    }).reduce((a, [k, v]) => {
      return k.startsWith('@types') ? a : {...a, [k]: v}
    }, {})
  }

  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async discover() {
    await this.setProjectJson()

    this.graph.addNode('root', {
      ...this.rootManifest,
      mergedDependencies: this.mergedDependencies,
      resolvable: true,
    })

    await Promise.all(
      Object.entries(this.mergedDependencies).map(
        async ([pkg, version]) => {
          const resolvable = await this.collectNodes('root', pkg)

          this.graph.setNodeAttribute(
            pkg,
            'resolvable',
            resolvable,
          )

          this.graph.setEdgeAttribute(
            'root',
            pkg,
            'resolvable',
            resolvable,
          )
        },
      ),
    )

    this.app.project.set(
      'extensions',
      this.graph
        .neighbors('root')
        .filter(
          node =>
            this.graph.getNodeAttribute(node, 'type') ==
            'extension',
        )
        .map(extension => {
          return this.graph.getNodeAttributes(extension)
        }),
    )

    return this
  }

  @bind
  public async collectNodes(origin: string, target: string) {
    !this.graph.hasNode(target) && this.graph.addNode(target)

    const path = await this.resolveModulePath(target)
    if (!path) {
      this.graph.setNodeAttribute(origin, 'resolvable', false)
      return false
    }

    let json = await this.getManifest(path)
    if (!json) {
      this.graph.setNodeAttribute(origin, 'resolvable', false)
      return false
    }

    const type = json?.bud ? 'extension' : 'dependency'
    json = {
      ...(json ?? {}),
      path,
      peerDependencies: json?.peerDependencies ?? {},
      extensions: json?.bud?.peers ?? [],
      type,
      resolvable: this.graph.getNodeAttribute(
        origin,
        'resolvable',
      ),
    }

    this.graph.updateNodeAttributes(target, attr => ({
      ...(attr ?? {}),
      ...(json ?? {}),
    }))

    !this.graph.hasDirectedEdge(origin, target) &&
      this.graph.addDirectedEdge(origin, target)

    /**
     * Regular dependency so we simply return whether or not its present
     */
    if (
      this.graph.getNodeAttribute(target, 'type') !== 'extension'
    ) {
      return this.mergedDependencies[target] ? true : false
    }

    try {
      /**
       * Check the peerDependencies of the extension
       */
      const missingPeers = await Object.entries(
        json.peerDependencies,
      ).reduce(async (missing, [peer, version]) => {
        const allMissing = await missing

        if (!this.mergedDependencies[peer]) {
          allMissing.push({peer, version})
        }

        return allMissing
      }, Promise.resolve([]))

      /**
       * Check the extensions of the extension
       */
      const validExtensions = json.extensions.reduce(
        async (resolvable, extension: string) => {
          const allResolved = await resolvable

          const extensionResolved = await this.collectNodes(
            target,
            extension,
          )

          const extensionsResolved =
            allResolved === false ? false : extensionResolved

          return Promise.resolve(extensionsResolved)
        },
        Promise.resolve(true),
      )

      const goodToGo =
        missingPeers.length == 0 && validExtensions

      if (!goodToGo) {
        this.app.error(
          target,
          'has missing dependencies in its path',
        )
        graphPath(this.graph, 'root', target).map(node =>
          this.graph.setNodeAttribute(node, 'resolvable', false),
        )
        this.app.error(missingPeers)
        this.graph.updateAttribute('missingPeers', peers =>
          Array.from(
            new Set([...(peers ?? []), ...missingPeers]),
          ),
        )
      }

      return goodToGo
    } catch (err) {
      this.app.error(err)
      return false
    }
  }
}

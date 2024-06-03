import type {Modules} from '@roots/bud-framework'
import type {Context} from '@roots/bud-framework/context'

const CORE_MODULES = [
  `@roots/bud-api`,
  `@roots/bud-build`,
  `@roots/bud-cache`,
  `@roots/bud-client`,
  `@roots/bud-compiler`,
  `@roots/bud-dashboard`,
  `@roots/bud-extensions`,
  `@roots/bud-framework`,
  `@roots/bud-hooks`,
  `@roots/bud-server`,
]

interface Extensions {
  builtIn: Partial<Array<keyof Modules & string>>
  discovered: Array<string>
}

const extensions: Extensions = {
  builtIn: [
    `@roots/bud-entrypoints`,
    `@roots/bud-minify`,
    `@roots/bud-extensions/cdn`,
    `@roots/bud-extensions/esm`,
    `@roots/bud-extensions/fix-style-only-entrypoints`,
    `@roots/bud-extensions/clean-webpack-plugin`,
    `@roots/bud-extensions/copy-webpack-plugin`,
    `@roots/bud-extensions/html-webpack-plugin`,
    `@roots/bud-extensions/import-map`,
    `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    `@roots/bud-extensions/mini-css-extract-plugin`,
    `@roots/bud-extensions/webpack-define-plugin`,
    `@roots/bud-extensions/webpack-hot-module-replacement-plugin`,
    `@roots/bud-extensions/webpack-lifecycle-plugin`,
    `@roots/bud-extensions/webpack-manifest-plugin`,
    `@roots/bud-extensions/webpack-profile-plugin`,
    `@roots/bud-extensions/webpack-provide-plugin`,
    `@roots/bud-extensions/tsconfig-values`,
  ],
  discovered: [],
}

export default (
  manifest?: Context[`manifest`],
  ...sets: Array<Array<string>>
) => {
  sets.forEach(set => set && extensions.discovered.push(...set))

  manifest &&
    Object.keys({
      ...(manifest?.devDependencies ?? {}),
      ...(manifest?.dependencies ?? {}),
    })
      .filter(
        signifier =>
          signifier.startsWith(`@roots/bud-`) ||
          signifier.startsWith(`@roots/sage`) ||
          signifier.startsWith(`bud-`),
      )
      .filter(
        signifier =>
          !CORE_MODULES.some(coreSignifier => signifier === coreSignifier),
      )
      .filter(
        signifier =>
          !manifest.bud?.denylist ||
          !manifest.bud.denylist.includes(signifier),
      )
      .filter(
        signifier =>
          !manifest.bud?.allowlist ||
          manifest.bud.allowlist.includes(signifier),
      )
      .flatMap(signifier => signifier.split(`,`))
      .map((signifier: keyof Modules & string) =>
        extensions.discovered.push(signifier),
      )

  return extensions
}

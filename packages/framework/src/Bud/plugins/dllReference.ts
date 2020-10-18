import {DllReferencePlugin} from 'webpack'

export const options: (
  bud: Framework.Bud,
) => DllReferencePlugin.Options = bud => ({
  context: bud.build.config.get('context'),
  manifest: bud.dist('library/manifest.json'),
  scope: 'xyz',
  sourceType: 'commonjs2',
})

export const make: Framework.Extension.Make = (
  opts: DllReferencePlugin.Options,
) => new DllReferencePlugin(opts)

export const when: Framework.Extension.When = bud => {
  const {library} = bud.build.config.get('entry')
  const enabled = bud.features.enabled('library')
  const manifestExists = bud.fs.exists(
    'dist/library/manifest.json',
  )

  return library && enabled && manifestExists
}

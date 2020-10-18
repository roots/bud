import {DllPlugin} from 'webpack'

export const options: (
  bud: Framework.Bud,
) => DllPlugin.Options = bud => ({
  context: bud.build.config.get('context'),
  name: '[name]-[hash]',
  path: bud.dist('library/[name].json'),
})

export const make: Framework.Extension.Make = (opts: DllPlugin.Options) =>
  new DllPlugin(opts)

export const when: Framework.Extension.When = bud => {
  const {library} = bud.build.config.get('entry')
  const enabled = bud.features.enabled('library')

  return library && enabled
}

import {DllPlugin} from 'webpack'

export const options: (
  bud: Framework.Bud,
) => DllPlugin.Options = bud => ({
  context: bud.store['build'].get('context'),
  name: '[name]-[hash]',
  path: bud.dist('library/[name].json'),
})

export const make: Adapter.make = (opts: DllPlugin.Options) =>
  new DllPlugin(opts)

export const when: Adapter.when = bud => {
  const {library} = bud.store['build'].get('entry')
  const enabled = bud.store['features'].enabled('library')

  return library && enabled
}

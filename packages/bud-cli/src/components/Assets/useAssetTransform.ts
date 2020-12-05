import {Stats} from 'webpack'

const useTransform: Transform = assets => {
  const transform: (
    assets: BudStats['assets'],
  ) => BudStats['assets'] = assets =>
    assets?.map(asset => ({
      ...asset,
      info: Object.keys(asset.info)
        .filter(key => key !== 'hotModuleReplacement')
        .reduce((acc, item) => `${acc} [${item}]`, ``),
      hot:
        assets.filter(
          check =>
            check.name.split('.').shift() ==
              asset.name.split('.').shift() &&
            check.name.includes('hot-update'),
        ).length > 0,
    }))

  return transform(assets) ?? []
}

interface Asset {
  chunks: Array<number | string>
  chunkNames: string[]
  emitted: boolean
  isOverSizeLimit?: boolean
  name: string
  size: number
  hot?: boolean
  info?: string
}

interface BudStats {
  assets: Array<Asset>
}

interface Transform {
  (assets: Stats.ToJsonOutput['assets']): BudStats['assets']
}

export {useTransform}

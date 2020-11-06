import {Stats} from 'webpack'

interface Asset {
  chunks: Array<number | string>
  chunkNames: string[]
  emitted: boolean
  isOverSizeLimit?: boolean
  name: string
  size: number
  hot: boolean
}

interface BudStats {
  assets: Array<Asset>
}

interface Transform {
  (assets: Stats.ToJsonOutput['assets']): BudStats['assets']
}

const useTransform: Transform = assets => {
  const transform: (
    assets: Stats.ToJsonOutput['assets'],
  ) => BudStats['assets'] = assets =>
    assets?.map(asset => ({
      ...asset,
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

export {useTransform as default}

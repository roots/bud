import {Stats} from 'webpack'
import {isArray} from 'lodash'

const useTransform: Transform = assets => {
  const transform: (
    assets: Stats.ToJsonOutput['assets'],
  ) => Assets = assets =>
    assets &&
    Object.values(assets).reduce((assets, asset): Array<{
      [key: string]: string
    }> => {
      if (!asset.chunkNames[0]) {
        return assets
      }

      return [
        ...assets,
        Object.entries(asset).reduce(
          (fields, [label, field]) => {
            field = isArray(field)
              ? (field as string[]).join(', ')
              : field

            field =
              label == 'size'
                ? `${(field as any) / 1000}kb`
                : field

            if (label == 'emitted') {
              field = field ? '✓' : ' '
            }

            return {
              ...fields,
              [label]:
                typeof field == 'string' ||
                typeof field == 'number'
                  ? field
                  : JSON.stringify(field),
              hot: '',
            }
          },
          {},
        ),
      ]
    }, [])

  return transform(assets)
}

interface Asset {
  [key: string]: string
}

type Assets = Array<Asset>

interface Transform {
  (assets: Stats.ToJsonOutput['assets']): Assets
}

export {useTransform}

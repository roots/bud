import type {Configuration} from 'webpack'

function addRefresh(entries, [name, assets]) {
  return {
    ...(entries ?? {}),
    [name]: {
      ...assets,
      import: [
        'react-refresh/runtime',
        ...(assets.import ?? []),
      ],
    },
  }
}

function reducer(entry: Configuration['entry']) {
  return entry
    ? Object.entries(entry).reduce(addRefresh, entry)
    : {}
}

export default reducer

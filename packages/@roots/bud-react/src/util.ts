import type {Configuration} from 'webpack'

function addRefresh(entries, [name, assets]) {
  return {
    'react-dev': {
      import: ['react-refresh/runtime'],
    },
    ...(entries ?? {}),
    [name]: {
      ...assets,
      dependOn: ['react-dev', ...(assets.dependOn ?? [])],
    },
  }
}

function reducer(entry: Configuration['entry']) {
  return entry
    ? Object.entries(entry).reduce(addRefresh, entry)
    : {}
}

export default reducer

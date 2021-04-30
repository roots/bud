import type {Configuration} from 'webpack'

function addRefresh(a, [name, assets]) {
  return {
    ...a,
    [name]: ['react-refresh/runtime', ...assets],
  }
}

function reducer(entry: Configuration['entry']) {
  return Object.entries(entry).reduce(addRefresh, entry)
}

export default reducer

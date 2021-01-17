import fetchExternals from './fetchExternals'
import {windowVariables} from './windowVariables'

export async function externals(
  data: {context; request},
  callback,
): Promise<void> {
  const externalsMap = await fetchExternals()

  if (
    externalsMap[data.request] ||
    windowVariables[data.request]
  ) {
    return callback(
      null,
      externalsMap[data.request] ??
        windowVariables[data.request],
    )
  }

  return callback
}

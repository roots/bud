import filesystem from 'fs-extra'
import resolveFrom from 'resolve-from'
import path from 'path'

const fs = {
  from: resolveFrom,
  ...path,
  ...filesystem,
}

export {fs}

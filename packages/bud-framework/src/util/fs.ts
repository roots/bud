import filesystem from 'fs-extra'
import path from 'path'

const fs = {
  ...path,
  ...filesystem,
}

export {fs}

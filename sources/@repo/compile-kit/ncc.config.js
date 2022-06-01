import {paths} from '@repo/constants'
import {join} from 'node:path'

const config = async () =>
  await import(join(paths.config, 'ncc.config.js'))

export default config

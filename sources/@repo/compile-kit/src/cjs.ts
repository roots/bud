import {error, log} from '@repo/logger'
import {chunk} from 'lodash-es'
import {cpus} from 'os'

import config from '../ncc.config.js'
import {compileCjs} from './compiler/cjs.js'

const packageArgument = process.argv[2]

const run = async () => {
  const size = cpus().length / 2 ?? 1
  log(`chunk size`, size)

  const compilerConfig = await config()
  try {
    return packageArgument !== 'all'
      ? await compileCjs(packageArgument)
      : await chunk(compilerConfig.packages, size).reduce(
          async (promised, chunk) => {
            await promised
            await Promise.all(chunk.map(compileCjs))
          },
          Promise.resolve(),
        )
  } catch (err) {
    error(err)
  }
}

run()

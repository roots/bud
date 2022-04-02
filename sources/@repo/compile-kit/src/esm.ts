import {error, log} from '@repo/logger'
import {chunk} from 'lodash'
import {cpus} from 'os'

import * as config from '../ncc.config'
import {compileEsm} from './compiler/esm'

const packageArgument = process.argv[2]

const run = async () => {
  const size = cpus().length / 2 ?? 1
  log(`chunk size`, size)
  try {
    return packageArgument !== 'all'
      ? await compileEsm(packageArgument)
      : await chunk(config.packages, size).reduce(
          async (promised, chunk) => {
            await promised
            await Promise.all(chunk.map(compileEsm))
          },
          Promise.resolve(),
        )
  } catch (err) {
    error(err)
  }
}

run()

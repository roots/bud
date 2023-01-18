import {join} from 'node:path'

import {paths} from '@repo/constants'
import {error, log} from '@repo/logger'
import downloadTarball from 'download-package-tarball'
import getPackage from 'get-package-json-from-registry'

const [dirArgument, pkgArgument] = process.argv[2].split(`,`)

export const vendor = async ({pkgArgument, dirArgument}) => {
  const pkg = await getPackage(pkgArgument)
  const {
    dist: {tarball},
  } = pkg

  const dir = join(paths.sources, dirArgument)

  try {
    log(`downloading ${pkgArgument} to ${dir}`)
    await downloadTarball({url: tarball, dir})
  } catch (err) {
    error(err)
  }
}

vendor({pkgArgument, dirArgument})

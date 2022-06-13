import {error, log} from '@repo/logger'
import downloadTarball from 'download-package-tarball'
import getPackage from 'get-package-json-from-registry'
import {join} from 'node:path'

const [dirArgument, pkgArgument] = process.argv[2].split(',')

export const vendor = async ({pkgArgument, dirArgument}) => {
  const pkg = await getPackage(pkgArgument)
  const {
    dist: {tarball},
  } = pkg

  const dir = join(process.cwd(), dirArgument)

  try {
    log(`downloading ${pkgArgument} to ${dir}`)
    await downloadTarball({url: tarball, dir})
  } catch (err) {
    error(err)
  }
}

vendor({pkgArgument, dirArgument})

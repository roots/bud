/* eslint-disable n/no-process-env */
import type {execa} from 'execa'

import getLatestVersion from '../utilities/getLatestVersion.js'

export default async function install(sh: typeof execa) {
  const {data} = await import(`../state.js`)

  const latest = await getLatestVersion()

  process.stdout.write(`Installing dependencies... \n`)

  switch (data.pacman) {
    case `npm`:
      await sh(
        data.pacman,
        [
          `install`,
          ...data.transpilers.map(mapVersion(latest)),
          `--dev-only`,
        ],
        {
          cwd: data.directory,
          env: {
            ...process.env,
            NODE_ENV: `development`,
          },
        },
      )
    case `yarn`:
      await sh(
        data.pacman,
        [`add`, ...data.transpilers.map(mapVersion(latest)), `--dev`],
        {
          cwd: data.directory,
          env: {
            ...process.env,
            NODE_ENV: `development`,
          },
        },
      )
  }
}

function mapVersion(version: string): (signifier: string) => string {
  return (signifier: string) => `${signifier}@${version}`
}

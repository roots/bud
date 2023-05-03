/* eslint-disable n/no-process-env */
import type {execa} from 'execa'

export default async function install(sh: typeof execa) {
  const {data} = await import(`../state.js`)

  process.stdout.write(`Building project... \n`)

  switch (data.pacman) {
    case `npm`:
      await sh(`npx`, [`bud`, `build`, `production`], {
        cwd: data.directory,
        env: {
          ...process.env,
          NODE_ENV: `development`,
        },
      })

    case `yarn`:
      await sh(`yarn`, [`bud`, `build`, `production`], {
        cwd: data.directory,
        env: {
          ...process.env,
          NODE_ENV: `development`,
        },
      })
  }
}

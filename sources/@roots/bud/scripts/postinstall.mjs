/* eslint-disable no-console */
/* eslint-disable n/no-process-env */
import {execa} from '@roots/bud-support/execa'

// browerslist updater
;(async () => {
  if (process.env.npm_package_version === `0.0.0`) return

  try {
    console.log(`updating browserslist database`)

    const cwd = process.env.INIT_CWD
    const sh = execa(`npx`, [`browserslist`, `--update-db`], {
      cwd,
      reject: false,
      shell: true,
    })

    console.log(cwd)

    const handle = data => {
      const message = data.toString()
      console.log(message)
      if (message.includes(`succ`)) sh.kill(`SIGQUIT`)
    }
    sh.stdout?.on(`data`, handle)
    sh.stderr?.on(`data`, handle)
  } catch (e) {}
})()

import {exec} from 'child_process'

export const killPort = port =>
  exec(`kill $(lsof -ti:${port})`, (err, stdout, stderr) => {
    ;[stderr, err].map(err => {
      console.error(err)
      process.exit(1)
    })

    process.exit(0)
  })

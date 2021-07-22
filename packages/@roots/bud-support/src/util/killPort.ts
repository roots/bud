import {exec} from 'child_process'

export const killPort = port =>
  exec(`kill $(lsof -ti:${port})`, (err, stdout, stderr) => {
    const errors = [stderr, err]

    errors?.map(err => {
      if (!err) return

      process.stderr.write(JSON.stringify(err))
      process.exit(1)
    })

    process.stdout.write(stdout)
  })

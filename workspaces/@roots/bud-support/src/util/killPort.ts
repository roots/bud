import {exec} from 'child_process'

export const killPort = (port: number) => {
  if (typeof port !== 'number') {
    throw new Error(`killPort: port must be a number`)
  }

  exec(`kill $(lsof -ti:${port})`, (err, stdout, stderr) => {
    const errors = [stderr, err]

    errors?.map(err => {
      if (!err) return

      process.stderr.write(JSON.stringify(err))
      process.exit(1)
    })

    process.stdout.write(stdout)
  })
}

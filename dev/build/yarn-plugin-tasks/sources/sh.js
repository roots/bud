import execa from 'execa'
import chalk from 'chalk'

export default async function (cmds, useIdent = true) {
  await Promise.all(
    cmds.map(async cmd => {
      const stdout = d => {
        this.context.stdout.write(
          d.toString().replace(/➤\sYN\d\d\d\d:\s/g, ''),
        )
      }

      const [invoke, ...params] = cmd.split(' ')

      try {
        const task = execa(invoke, params)

        task.stdout.on('data', stdout)
        task.stderr.on('data', stdout)

        return task
      } catch (err) {
        throw new Error(err)
      }
    }),
  )

  return Promise.resolve()
}

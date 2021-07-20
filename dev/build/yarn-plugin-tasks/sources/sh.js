import execa from 'execa'

export default async function (cmds) {
  await Promise.all(
    cmds.map(async cmd => {
      const [invoke, ...params] = cmd.split(' ')
      const task = execa(invoke, params)

      task.stdout.on('data', d =>
        this.context.stdout.write(
          d.toString().replace(/YN\d\d\d\d:\s/g, ''),
        ),
      )

      return task
    }),
  )

  return Promise.resolve()
}

import execa from 'execa'

export default async function (cmds, useIdent = true) {
  const label =
    this.path.length > 1
      ? this.path
          .splice(this.path.length - 1)
          .join(' ')
          .concat(' › ')
      : ``

  const format = d =>
    d
      .toString()
      .replace(/➤\sYN\d\d\d\d:\s/g, '')
      .replace(/\n/, `\n${label}`)

  await Promise.all(
    cmds.map(async cmd => {
      const stdout = d => {
        this.context.stdout.write(
          useIdent === true ? format(d) : d,
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

import execa from 'execa'

export default async function (cmds, useIdent = true) {
  await Promise.all(
    cmds.map(async cmd => {
      const ident = this.path.join(' ').concat(' › ')

      const stdout = d => {
        this.context.stdout.write(
          useIdent === true
            ? ident.concat(
                d.toString().replace(/➤\sYN\d\d\d\d:\s/g, ''),
              )
            : d,
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

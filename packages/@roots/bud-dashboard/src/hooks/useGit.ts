import {React, execa} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'

export const useGit = (): Dashboard.UseGit.Status => {
  const [head, setHead] = React.useState(null)
  const [branch, setBranch] = React.useState(null)
  const [status, setStatus] = React.useState(null)

  React.useEffect(() => {
    setInterval(async () => {
      const update = await execa('git', ['status', '--short'])

      if (update !== status) {
        setStatus(update)
      }
    }, 1000)
  }, [])

  React.useEffect(() => {
    setInterval(async () => {
      const revision = await execa('git', [
        'rev-parse',
        '--short',
        'HEAD',
        '--no-color',
      ])

      setHead(revision)
    })
  }, [])

  React.useEffect(() => {
    setInterval(async () => {
      const branch = await execa('git', [
        'branch',
        '--show-current',
        '--no-color',
      ])

      setBranch(branch)
    })
  }, [])

  const hasError: boolean =
    [head, branch, status].filter(res => res?.stderr)?.length > 0

  return {
    head: head?.stdout?.toString() ?? null,
    branch: branch?.stdout?.toString() ?? null,
    status: !status?.stdout?.toString()
      ? '0'
      : status.stdout
          .toString()
          .split('\n')
          .filter(item => item !== '').length,
    hasError,
  }
}

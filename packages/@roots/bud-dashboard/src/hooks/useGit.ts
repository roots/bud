import {useState, useEffect} from 'react'
import execa from 'execa'
import {Dashboard} from '@roots/bud-framework'

export const useGit = (): Dashboard.UseGit.Status => {
  const [head, setHead] = useState(null)
  const [branch, setBranch] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    setInterval(async () => {
      const update = await execa('git', ['status', '--short'])

      if (update !== status) {
        setStatus(update)
      }
    }, 1000)
  }, [])

  useEffect(() => {
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

  useEffect(() => {
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

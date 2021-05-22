import {useState, useEffect} from 'react'
import execa from 'execa'
import {Dashboard} from '@roots/bud-framework'
import {isEqual} from 'lodash'

export const useGit = (): Dashboard.UseGit.Status => {
  const [isRepo, setIsRepo] = useState(null)
  const [head, setHead] = useState(null)
  const [branch, setBranch] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    isEqual(isRepo, null) &&
      (async () => {
        try {
          await execa('git', [
            'rev-parse',
            '--is-inside-work-tree',
          ])

          setIsRepo(true)
        } catch (err) {
          setIsRepo(false)
        }
      })()
  }, [])

  useEffect(() => {
    isRepo &&
      setInterval(async () => {
        try {
          const {stdout} = await execa('git', [
            'status',
            '--short',
          ])

          const statusRes = stdout.toString()
            ? '0'
            : stdout
                .toString()
                .split('\n')
                .filter(item => item !== '').length

          !isEqual(status, statusRes) && setStatus(statusRes)
        } catch (err) {
          return
        }
      }, 1000)
  }, [isRepo])

  useEffect(() => {
    isRepo &&
      setInterval(async () => {
        const {stdout} = await execa('git', [
          'branch',
          '--show-current',
          '--no-color',
        ])

        setBranch(stdout.toString())
      })
  }, [isRepo])

  useEffect(() => {
    isRepo &&
      setInterval(async () => {
        try {
          const {stdout} = await execa('git', [
            'rev-parse',
            '--short',
            'HEAD',
            '--no-color',
          ])
          setHead(stdout.toString())
        } catch (err) {
          return
        }
      })
  }, [isRepo])

  const hasError: boolean =
    [head, branch, status].filter(res => res?.stderr)?.length > 0

  return {
    isRepo,
    head,
    branch,
    status,
    hasError,
  }
}

import {useState, useEffect} from 'react'
import execa from 'execa'
import {Dashboard} from '@roots/bud-framework'
import {isEqual} from 'lodash'

export const useGit = (): Dashboard.UseGit.Status => {
  const [isRepo, setIsRepo] = useState(null)
  const [head, setHead] = useState(null)
  const [branch, setBranch] = useState(null)
  const [status, setStatus] = useState(null)
  const [untracked, setUntracked] = useState(null)

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
            '--untracked',
          ])

          const lns = stdout.split('\n')

          const modded = lns
            .filter(ln => ln.includes('M '))
            .map(ln => ln.replace('M ', '').replace('\n', ''))

          !isEqual(status, modded) && setStatus(modded)

          const freshFiles = lns
            .filter(ln => ln.includes('?? '))
            .map(ln => ln.replace('?? ', '').replace('\n', ''))

          !isEqual(untracked, freshFiles) &&
            setUntracked(freshFiles)
        } catch (err) {
          return
        }
      }, 1000)
  }, [isRepo])

  useEffect(() => {
    status &&
      (async () => {
        const {stdout} = await execa('git', [
          'branch',
          '--show-current',
          '--no-color',
        ])

        setBranch(stdout)
      })()
  }, [status])

  useEffect(() => {
    branch &&
      (async () => {
        try {
          const {stdout} = await execa('git', [
            'rev-parse',
            '--short',
            'HEAD',
            '--no-color',
          ])

          setHead(stdout)
        } catch (err) {
          return
        }
      })()
  }, [branch])

  const hasError: boolean =
    [head, branch, status].filter(res => res?.stderr)?.length > 0

  return {
    isRepo,
    head,
    branch,
    status,
    untracked,
    hasError,
  }
}

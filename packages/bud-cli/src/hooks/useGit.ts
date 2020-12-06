import {useEffect, useState} from 'react'
import execa from 'execa'

const params = {
  root: ['rev-parse', '--show-toplevel'],
  files: ['ls-tree', '--full-tree', '-r', '--name-only', 'HEAD'],
  head: ['rev-parse', '--short', 'HEAD'],
  branch: ['branch', '--show-current'],
  dirty: ['diff', 'HEAD'],
  status: ['status', '--short'],
}

export type GitStatus = {
  head: string
  branch: string
  dirty: string
  status: string
  err: boolean
}

export type UseGit = () => GitStatus

export const useGit: UseGit = () => {
  const [head, setHead] = useState(null)
  const [status, setStatus] = useState(null)
  const [branch, setBranch] = useState(null)
  const [dirty, setDirty] = useState(null)

  const [err, setErr] = useState(false)

  useEffect(() => {
    if (err) {
      setHead(null)
      setBranch(null)
      setDirty(null)
      setStatus(null)
    }

    ;(async () => {
      try {
        const {stdout: head} = await execa('git', params.head)
        setHead(head)

        const {stdout: branch} = await execa(
          'git',
          params.branch,
        )
        setBranch(branch)

        const {stdout: dirty} = await execa('git', params.dirty)
        setDirty(dirty)

        const {stdout: status} = await execa(
          'git',
          params.status,
        )
        setStatus(status)
      } catch {
        setErr(true)
      }
    })()
  }, [])

  return {head, branch, dirty, status, err}
}

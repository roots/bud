import useSWR from 'swr'
import execa from 'execa'
import { useCallback } from 'react'

export interface CmdRes {
  stdout?: string
  stderr?: string
}

export interface GitStatus {
  [key: string]: boolean | CmdRes
}

export interface HookResult extends GitStatus {
  hasError: boolean
}

export type UseGit = () => GitStatus

const params = {
  head: ['rev-parse', '--short', 'HEAD'],
  branch: ['branch', '--show-current'],
  dirty: ['diff', 'HEAD'],
  status: ['status', '--short'],
}

const fetch = async (...params: string[]) => {
  const res = await execa('git', params)
  return res
}

export const useGit: UseGit = () => {
  const {data: head, mutate: setHead} = useSWR<GitStatus>(
    params.head,
    fetch,
  )

  const {data: branch, mutate: setBranch} = useSWR<GitStatus>(
    params.branch,
    fetch,
  )

  const {data: dirty, mutate: setDirty} = useSWR<GitStatus>(
    params.dirty,
    fetch,
  )
  const {data: status, mutate: setStatus} = useSWR<GitStatus>(
    params.status,
    fetch,
  )

  useCallback(() => {
    setInterval(() => {
      setHead()
      setBranch()
      setDirty()
      setStatus()
    }, 1000)
  }, [head, branch, dirty, status])

  const hasError =
    [head, branch, dirty, status].filter(res => res?.stderr)
      ?.length > 0

  return {
    head: head?.stdout,
    branch: branch?.stdout,
    dirty: dirty?.stdout,
    status: status?.stdout,
    hasError,
  }
}

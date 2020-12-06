import useSWR from 'swr'
import execa from 'execa'

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
  const {data: head} = useSWR<GitStatus>(params.head, fetch)
  const {data: branch} = useSWR<GitStatus>(params.branch, fetch)
  const {data: dirty} = useSWR<GitStatus>(params.dirty, fetch)
  const {data: status} = useSWR<GitStatus>(params.status, fetch)

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

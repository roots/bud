import {
  useEffect,
  useSwr,
  mutate,
  execa,
} from '@roots/bud-support'

export interface Res {
  stdout?: string
  stderr?: string
}

export interface GitStatus {
  head: string
  branch: string
  status: number
  hasError: boolean
}

export type UseGit = () => GitStatus

const fetch = async key => {
  const params = {
    head: ['rev-parse', '--short', 'HEAD'],
    branch: ['branch', '--show-current'],
    status: ['status', '--short'],
  }

  return await execa('git', params[key.replace('git.', '')])
}

export const useGit: UseGit = () => {
  const {data: head} = useSwr<Res>('git.head', fetch)
  const {data: branch} = useSwr<Res>('git.branch', fetch)
  const {data: status} = useSwr<Res>('git.status', fetch)

  useEffect(() => {
    setInterval(() => {
      mutate('git.head')
      mutate('git.branch')
      mutate('git.status')
    }, 1000)
  }, [])

  const changed = status?.stdout
    ?.split('\n')
    .filter(item => item !== '').length

  const hasError =
    [head, branch, status].filter(res => res?.stderr)?.length > 0

  return {
    head: head?.stdout,
    branch: branch?.stdout,
    status: changed > 0 ? changed : null,
    hasError,
  }
}

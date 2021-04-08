import {
  useEffect,
  useSwr,
  mutate,
  execa,
} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'

const fetch = async key => {
  const params = {
    head: ['rev-parse', '--short', 'HEAD', '--no-color'],
    branch: ['branch', '--show-current', '--no-color'],
    status: ['status', '--short'],
  }

  return await execa('git', params[key.replace('git.', '')])
}

export const useGit: Dashboard.UseGit.Hook = () => {
  const {data: head} = useSwr<Dashboard.UseGit.Res>(
    'git.head',
    fetch,
  )

  const {data: branch} = useSwr<Dashboard.UseGit.Res>(
    'git.branch',
    fetch,
  )

  const {data: status} = useSwr<Dashboard.UseGit.Res>(
    'git.status',
    fetch,
  )

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
    head: head?.stdout.toString(),
    branch: branch?.stdout.toString(),
    status: changed > 0 ? changed : null,
    hasError,
  }
}

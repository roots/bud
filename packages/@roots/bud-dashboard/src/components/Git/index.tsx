import {
  React,
  Box,
  FunctionComponent,
  Text,
} from '@roots/bud-support'
import {Dashboard} from '../../interface'
import {useGit} from '../../hooks/useGit'

export const Git: FunctionComponent<
  Partial<Dashboard.AppProps>
> = ({theme}) => {
  const {branch, status, head} = useGit()
  const {flavor, warning, accent, success} = theme.colors

  const guard = branch && head && status
  if (!guard) return null

  const gitProps = [
    {key: 'branch', data: branch, color: flavor},
    {
      key: 'head',
      data: head,
      color: status ? warning : success,
    },
    {key: 'status', data: status, color: accent},
  ]

  return (
    <Box
      flexDirection="row"
      justifyContent="flex-end"
      flexGrow={1}>
      {gitProps.map(({key, data, color}) => (
        <Text key={key} backgroundColor={color}>
          {' '}
          {data}{' '}
        </Text>
      ))}
    </Box>
  )
}

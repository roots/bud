import React from 'react'
import {Box, Text} from 'ink'
import {useGit} from '../../hooks/useGit'

export const Git = ({theme}) => {
  const {branch, status, head} = useGit()
  const {flavor, warning, accent, success} = theme.colors

  const guard = branch && head && status
  if (!guard) return null

  const gitProps = [
    {key: 'Branch', data: branch, color: flavor},
    {
      key: 'Head',
      data: head,
      color: status ? warning : success,
    },
    {key: 'Changed', data: status, color: accent},
  ]

  return (
    <Box
      flexDirection="column"
      paddingX={1}
      borderStyle="single"
      borderColor={theme.colors.faded}>
      {gitProps.map(({key, data, color}) => (
        <Text key={key}>
          {key}: <Text color={color}>{data}</Text>
        </Text>
      ))}
    </Box>
  )
}

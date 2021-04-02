import {React, Box, Text} from '@roots/bud-support'

export const List = ({items}: {items: string[][]}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between">
      {items.map((item, id) => (
        <Text wrap="truncate-end" key={id}>
          {item}
        </Text>
      ))}
    </Box>
  )
}

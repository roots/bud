import {React, Box, Text, isArray} from '@roots/bud-support'

export const Errors = ({errors, color}) => {
  const guard = errors && isArray(errors) && errors.length > 0

  return !guard ? null : (
    <Box
      flexDirection="column"
      borderColor={color}
      borderStyle="round">
      {errors?.map((err, id) => (
        <Text key={id}>{err}</Text>
      ))}
    </Box>
  )
}

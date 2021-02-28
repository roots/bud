import {React, Box, Text, isArray} from '@roots/bud-support'

export const Errors = ({errors, color}) => {
  return isArray(errors) && errors.length > 0 ? (
    <Box
      flexDirection="column"
      borderColor={color}
      borderStyle="round"
      marginX={1}>
      {errors?.map((err, id) => (
        <Text key={id}>{err}</Text>
      ))}
    </Box>
  ) : null
}

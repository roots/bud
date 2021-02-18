import {React, Box, Text, isArray} from '@roots/bud-support'

export const Errors = ({errors, color}) =>
  errors ? (
    <Box flexDirection="column">
      <Box
        flexDirection="column"
        borderColor={color}
        borderStyle="round"
        marginBottom={1}
        padding={1}>
        {(!isArray(errors) ? [errors] : errors)?.map(
          (err, id) => (
            <Text key={id} wrap="wrap">
              {err}
            </Text>
          ),
        )}
      </Box>
    </Box>
  ) : null

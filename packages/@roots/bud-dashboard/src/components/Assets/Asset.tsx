import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'
import {Dashboard} from '../../interface'
import {Indicator} from './Indicator'

export const Asset: FunctionComponent<Dashboard.Asset> = ({
  size,
  name,
  emitted,
  chunkNames,
  theme,
}) =>
  !name.includes('.json') ? (
    <Box flexDirection={'row'} justifyContent={'space-between'}>
      <Box width={theme.col(7)}>
        <Text
          wrap="truncate-end"
          color={
            emitted
              ? theme.colors.foreground
              : theme.colors.faded
          }>
          <Indicator {...theme.colors} active={emitted} />
          {name}{' '}
        </Text>
      </Box>

      <Box
        width={theme.col(3)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate" color={theme.colors.accent}>
          {chunkNames.toString()}
        </Text>
      </Box>

      <Box
        width={theme.col(2)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate-end" color={theme.colors.success}>
          {size / 1000}kb
        </Text>
      </Box>
    </Box>
  ) : null

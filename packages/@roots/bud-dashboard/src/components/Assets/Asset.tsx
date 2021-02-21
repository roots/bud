import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'
import {Indicator} from '../Indicator'

export const Asset: FunctionComponent<{
  chunks: Array<number | string>
  chunkNames: string[]
  emitted: boolean
  isOverSizeLimit?: boolean
  name: string
  size: number
  col: any
  colors: any
}> = ({
  size,
  name,
  isOverSizeLimit,
  emitted,
  chunkNames,
  col,
  colors,
}) =>
  !name.includes('.json') ? (
    <Box flexDirection={'row'} justifyContent={'space-between'}>
      <Box width={col(7)}>
        <Text
          wrap="truncate-end"
          color={emitted ? colors.foreground : colors.faded}>
          <Indicator {...colors} active={emitted} />
          {name}{' '}
        </Text>
      </Box>

      <Box
        width={col(3)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate" color={colors.accent}>
          {chunkNames.toString()}
        </Text>
      </Box>

      <Box
        width={col(2)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate-end" color={colors.success}>
          {size / 1000}kb
        </Text>
      </Box>
    </Box>
  ) : null

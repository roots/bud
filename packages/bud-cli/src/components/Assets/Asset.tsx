import {
  React,
  FunctionComponent,
  Box,
  Text,
} from '@roots/bud-support'
import {Indicator} from '../UI/Indicator'
import {useStyle} from '@roots/ink-use-style'
import {CompilationAsset} from '../../hooks/useCompilation'

export const Asset: FunctionComponent<CompilationAsset> = ({
  name,
  active,
  size,
  info,
}) => {
  const {col, colors} = useStyle()

  return (
    <Box flexDirection={'row'} justifyContent={'space-between'}>
      <Box width={col(7)}>
        <Text
          wrap="truncate-end"
          color={active ? colors.foreground : colors.faded}>
          <Indicator active={active} />
          {name}{' '}
        </Text>
      </Box>

      <Box
        width={col(3)}
        alignItems="flex-end"
        justifyContent="flex-end">
        <Text wrap="truncate" color={colors.accent}>
          {info}
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
  )
}

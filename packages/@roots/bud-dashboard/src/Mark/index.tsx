import {
  React,
  Box,
  BigText,
  Static,
  Gradient,
  FunctionComponent,
} from '@roots/bud-support'

export const Mark: FunctionComponent<{text: string}> = ({
  text,
}) => (
  <Static items={[{id: 0, text}]}>
    {header => (
      <Box
        key={header.id}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start">
        <Gradient name="teen">
          <BigText font="tiny" text={header.text} />
        </Gradient>
      </Box>
    )}
  </Static>
)

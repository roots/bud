import {
  React,
  Box,
  BigText,
  Static,
  Gradient,
} from '@roots/bud-support'

export const Mark = ({text}) => (
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

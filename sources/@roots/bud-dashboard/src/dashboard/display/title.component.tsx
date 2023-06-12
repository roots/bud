import figures from '@roots/bud-support/figures'
import * as Ink from '@roots/bud-support/ink'

interface Props
  extends React.PropsWithChildren<{
    final?: boolean
    finalFigure?: string
    indent?: Array<boolean>
  }> {}

const Title = ({
  children,
  final = false,
  finalFigure = figures.lineUpRight,
  indent = [],
}: Props) => {
  return (
    <Ink.Box flexDirection="row">
      <Ink.Text dimColor>
        {indent.map(indent =>
          indent ? figures.lineVertical.concat(`  `) : `   `,
        )}
        {final ? finalFigure : figures.lineUpDownRight}
        {figures.line}
        {` `}
      </Ink.Text>
      {children}
    </Ink.Box>
  )
}

export default Title

import figures from '@roots/bud-support/figures'
import * as Ink from '@roots/bud-support/ink'

const Space = ({
  children,
  final = false,
}: React.PropsWithChildren<{final?: boolean}>) => {
  const arrayedChildren = Array.isArray(children) ? children : [children]

  return (
    <Ink.Box flexDirection="column">
      {arrayedChildren.map((Child, index) => (
        <Ink.Box flexDirection="row" key={index}>
          <Ink.Text dimColor>
            {!final ? figures.lineVertical : `  `}
          </Ink.Text>
          {Child}
        </Ink.Box>
      ))}
    </Ink.Box>
  )
}

export default Space

import figures from '@roots/bud-support/figures'
import Ink, {React} from '@roots/bud-support/ink'

type Props = React.PropsWithChildren<{
  final?: boolean
  inset?: number
  indent?: Array<boolean>
}>

const Title = ({children, final = false, indent = []}: Props) => {
  return (
    <Ink.Box flexDirection="row">
      <Ink.Text dimColor>
        {indent.map(indent =>
          indent ? `${figures.lineVertical} ` : `  `,
        )}
        {final ? `└─ ` : `├─ `}
      </Ink.Text>
      {children}
    </Ink.Box>
  )
}

export default Title

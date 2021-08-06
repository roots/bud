import {Ink, React} from '@roots/bud-support'

export const Component = ({title = 'Error', body}) => {
  return (
    <Ink.Box
      flexDirection="column"
      borderColor="red"
      borderStyle="round"
      marginBottom={1}
      padding={1}>
      <Ink.Text wrap="wrap" bold>
        {title}
      </Ink.Text>

      <Ink.Text wrap="wrap">{body}</Ink.Text>
    </Ink.Box>
  )
}

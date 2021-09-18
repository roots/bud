import {Ink, React} from '@roots/bud-support'

/**
 * Error component
 *
 * @public
 */
export const Error = ({title = 'Error', body}) => {
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

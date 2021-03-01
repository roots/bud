import {
  Box,
  React,
  useState,
  patchConsole,
  Text,
  Spinner,
  useEffect,
} from '@roots/bud-support'
import {Framework} from '@roots/bud-typings'

export const Console = ({
  bud,
  progress,
}: {
  bud: Framework
  progress: any
}) => {
  const [stdout, setStdout] = useState([])

  patchConsole((stream, data) => {
    setStdout([
      ...stdout.slice(0, Math.min(9, stdout.length)),
      `${data.toString()}`,
    ])
  })

  useEffect(() => {
    progress?.message &&
      setStdout([
        ...stdout.slice(0, Math.min(9, stdout.length)),
        `${progress.message.toString()}`,
      ])
  }, [progress?.message])

  return (
    <Box flexDirection="column" minHeight={10} height={10}>
      {stdout?.length > 0 ? (
        stdout.map((item, id) => (
          <Text key={id} wrap="truncate-end">
            {item}
          </Text>
        ))
      ) : (
        <Text>
          <Spinner /> Watching
        </Text>
      )}
    </Box>
  )
}

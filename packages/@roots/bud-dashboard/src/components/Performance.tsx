import {Ink, React} from '@roots/bud-support'

const gT = (num: string | number, num2: string | number) => {
  return new Number(num) > new Number(num2)
}

export const Performance = () => {
  const [rss, setRss] = React.useState<number>(0)
  const [maxRss, setMaxRss] = React.useState<number>(0)

  const [heapTotal, setHeapTotal] = React.useState<number>(0)
  const [maxHeapTotal, setMaxHeapTotal] =
    React.useState<number>(0)

  const [heapUsed, setHeapUsed] = React.useState<number>(0)
  const [maxHeapUsed, setMaxHeapUsed] = React.useState<number>(0)

  const [external, setExternal] = React.useState<number>(0)
  const [maxExternal, setMaxExternal] = React.useState<number>(0)

  const [arrayBuffers, setArrayBuffers] =
    React.useState<number>(0)

  const [maxArrayBuffers, setMaxArrayBuffers] =
    React.useState<number>(0)

  React.useEffect(() => {
    const mem = Object.fromEntries(
      Object.entries(process.memoryUsage()).map(([k, v]) => {
        return [k, Math.round(v / 1024 / 1024)]
      }),
    )

    setRss(mem.rss)
    gT(mem.rss, maxRss) && setMaxRss(mem.rss)

    setHeapTotal(mem.heapTotal)
    gT(mem.heapTotal, maxHeapTotal) &&
      setMaxHeapTotal(mem.heapTotal)

    setHeapUsed(mem.heapUsed)
    gT(mem.heapUsed, maxHeapUsed) && setMaxHeapUsed(mem.heapUsed)

    setExternal(mem.external)
    gT(mem.external, maxExternal) && setMaxExternal(mem.external)

    setArrayBuffers(mem.arrayBuffers)
    gT(mem.arrayBuffers, maxArrayBuffers) &&
      setMaxArrayBuffers(mem.arrayBuffers)
  }, [
    maxRss,
    maxHeapTotal,
    maxHeapUsed,
    maxExternal,
    maxArrayBuffers,
  ])

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text>rss </Ink.Text>
        <Ink.Text>
          {rss} (max: {maxRss})
        </Ink.Text>
      </Ink.Box>

      <Ink.Box flexDirection="row">
        <Ink.Text>heapTotal </Ink.Text>
        <Ink.Text>
          {heapTotal} (max: {maxHeapTotal})
        </Ink.Text>
      </Ink.Box>

      <Ink.Box flexDirection="row">
        <Ink.Text>heapUsed </Ink.Text>
        <Ink.Text>
          {heapUsed} (max: {maxHeapUsed})
        </Ink.Text>
      </Ink.Box>

      <Ink.Box flexDirection="row">
        <Ink.Text>external </Ink.Text>
        <Ink.Text>
          {external} (max: {maxExternal})
        </Ink.Text>
      </Ink.Box>

      <Ink.Box flexDirection="row">
        <Ink.Text>arrayBuffers </Ink.Text>
        <Ink.Text>
          {arrayBuffers} (max: {maxArrayBuffers})
        </Ink.Text>
      </Ink.Box>
    </Ink.Box>
  )
}

import React, {useEffect, useState} from 'react'
import {Text, Box} from 'ink'

const gT = (num: string | number, num2: string | number) => {
  return new Number(num) > new Number(num2)
}

export const Performance = () => {
  const [rss, setRss] = useState<number>(0)
  const [maxRss, setMaxRss] = useState<number>(0)

  const [heapTotal, setHeapTotal] = useState<number>(0)
  const [maxHeapTotal, setMaxHeapTotal] = useState<number>(0)

  const [heapUsed, setHeapUsed] = useState<number>(0)
  const [maxHeapUsed, setMaxHeapUsed] = useState<number>(0)

  const [external, setExternal] = useState<number>(0)
  const [maxExternal, setMaxExternal] = useState<number>(0)

  const [arrayBuffers, setArrayBuffers] = useState<number>(0)

  const [maxArrayBuffers, setMaxArrayBuffers] =
    useState<number>(0)

  useEffect(() => {
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
  })

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text>rss </Text>
        <Text>
          {rss} (max: {maxRss})
        </Text>
      </Box>

      <Box flexDirection="row">
        <Text>heapTotal </Text>
        <Text>
          {heapTotal} (max: {maxHeapTotal})
        </Text>
      </Box>

      <Box flexDirection="row">
        <Text>heapUsed </Text>
        <Text>
          {heapUsed} (max: {maxHeapUsed})
        </Text>
      </Box>

      <Box flexDirection="row">
        <Text>external </Text>
        <Text>
          {external} (max: {maxExternal})
        </Text>
      </Box>

      <Box flexDirection="row">
        <Text>arrayBuffers </Text>
        <Text>
          {arrayBuffers} (max: {maxArrayBuffers})
        </Text>
      </Box>
    </Box>
  )
}

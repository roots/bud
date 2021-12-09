import {Text} from 'ink'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {URL} from 'url'
import Spinner from 'ink-spinner'

interface IndicatorProps {
  url: URL
  label: string
}

export const Indicator = ({url, label}: IndicatorProps) => {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!(url instanceof URL)) return
    ;(async () => {
      try {
        const res = await axios(url.toString(), {
          method: 'HEAD',
        })

        setStatus(res.status)
      } catch (error) {
        error?.response?.status
          ? setStatus(error.response.status)
          : setStatus(400)
      }
    })()
  }, [url, status])

  return status == null ? (
    <Text>
      <Spinner /> {status} [{label}]
    </Text>
  ) : status == 200 ? (
    <Text color="green">
      ◉ {status} [{label}]
    </Text>
  ) : (
    <Text color="red">
      ◉ {status} [{label}]
    </Text>
  )
}

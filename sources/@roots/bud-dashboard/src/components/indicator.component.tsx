import axios from 'axios'
import {Text} from 'ink'
import React, {useEffect, useState} from 'react'

interface IndicatorProps {
  url: URL
  label: string
}

/**
 * Status indicator for dev/proxy servers
 *
 * @remarks
 * Passes 'bud-healthcheck' header to identify this
 * request so as to not spam the console
 *
 * @public
 */
export const Indicator = ({url, label}: IndicatorProps) => {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!(url instanceof URL)) return
    ;(async () => {
      try {
        const res = await axios(url.toString(), {
          headers: {
            'bud-healthcheck': true,
          },
        })

        setStatus(res.status)
      } catch (error) {
        error?.response?.status
          ? setStatus(error.response.status)
          : setStatus(400)
      }
    })()
  }, [url, label, status])

  if (status === null) return null

  return status == 200 ? (
    <Text color="green">
      ◉ {status} [{label}] {url.origin}
    </Text>
  ) : (
    <Text color="red">
      ◉ {status} [{label}] {url.origin}
    </Text>
  )
}

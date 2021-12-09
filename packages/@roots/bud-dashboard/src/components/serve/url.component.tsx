import {Text} from 'ink'
import {isString} from 'lodash'
import React, {useEffect, useState} from 'react'
import {URL} from 'url'

import {Indicator} from './indicator.component'

export const Url = ({value, label}) => {
  const [url, setUrl] = useState<URL>(null)
  const [formatted, setFormatted] = useState(null)

  useEffect(() => {
    setUrl(new URL(value))
  }, [value])

  useEffect(() => {
    if (!url?.origin || !isString(url.origin)) return

    if (
      [
        url.origin.endsWith(':80'),
        url.origin.endsWith(':443'),
        url.origin.endsWith(':8080'),
      ].find(Boolean)
    ) {
      setFormatted(url.origin.split(':').slice(0, 2).join(':'))
      return
    }

    setFormatted(url.origin)
    return
  }, [url])

  return formatted ? (
    <Text>
      <Indicator label={label} url={url} /> {formatted}
    </Text>
  ) : null
}

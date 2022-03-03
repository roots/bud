import React, {useEffect, useState} from 'react'

import {Indicator} from './indicator.component'

/**
 * URL component
 *
 * @public
 */
export const Url = ({value, label}) => {
  const [url, setUrl] = useState<URL>(null)

  useEffect(() => {
    value &&
      !url &&
      setInterval(() => {
        setUrl(new URL(value))
      }, 500)
  }, [value, url])

  if (!url) return null

  return <Indicator label={label} url={url} />
}

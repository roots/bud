import useSWR, {mutate} from 'swr'
import {useEffect, useState} from 'react'

declare interface DataModel {
  focus: string
  items: {
    [key: string]: boolean
  }
}

export const useFocus: (
  initialData?: DataModel,
) => [string, (string) => void] = (
  initialData = {
    focus: 'assets',
    items: {
      assets: true,
      errors: false,
      warnings: false,
      dev: false,
    },
  },
) => {
  const {data} = useSWR('focus', {
    initialData,
  })

  const [focus, setFocus] = useState(data.focus)

  useEffect(() => {
    mutate('focus', {
      ...Object.entries(data.items).reduce(
        (acc, [name]: [string, boolean]) => ({
          ...acc,
          [name]: false,
        }),
        data.items,
      ),
      [focus]: true,
    })
  }, [focus])

  return [focus, setFocus]
}

export default useFocus

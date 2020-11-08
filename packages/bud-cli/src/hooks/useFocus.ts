import useSWR, {mutate} from 'swr'
import {useEffect, useState} from 'react'

const INITIAL: {initialData: UseFocus.Focus} = {
  initialData: {
    active: 'assets',
    items: {
      assets: true,
      errors: false,
      warnings: false,
      dev: false,
    },
  },
}

export const useFocus: UseFocus.Hook = (initial = INITIAL) => {
  const {data} = useSWR('focus', initial)
  const [focus, setFocus] = useState<UseFocus.Focus>(data)

  useEffect(() => {
    mutate('focus', {
      ...Object.entries(data.items).reduce(
        (acc, [name]: [string, boolean]) => ({
          ...acc,
          [name]: false,
        }),
        data.items,
      ),
      [focus.active]: true,
    })
  }, [focus])

  return [focus, setFocus]
}

export namespace UseFocus {
  export interface Hook {
    (initialData?: {initialData: Focus}): [Focus, Handler]
  }

  export interface Focus {
    active: string
    items: Items
  }

  export interface Items {
    [key: string]: boolean
  }

  export type Handler = React.Dispatch<
    React.SetStateAction<UseFocus.Focus>
  >
}

import {
  useEffect,
  useState,
  useSwr,
  mutate,
} from '@roots/bud-support'
import {Dashboard} from '@roots/bud-framework'

const INITIAL: {initialData: Dashboard.UseFocus.Focus} = {
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

export const useFocus: Dashboard.UseFocus.Hook = (
  initial = INITIAL,
) => {
  const {data} = useSwr('focus', initial)
  const [focus, setFocus] = useState<Dashboard.UseFocus.Focus>(
    data,
  )

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

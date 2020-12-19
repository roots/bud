import {React, useApp, useInput} from '@roots/bud-support'

import {useCompilation} from '../hooks/useCompilation'
import {Reporter} from './Reporter'

import type {Bud} from '@roots/bud-typings'

const Serve: React.FunctionComponent<{bud: Bud}> = ({bud}) => {
  const app = useApp()
  const compilation = useCompilation(bud)

  useInput(input => {
    if (input == 'q') {
      app.exit()
      console.clear()
      process.exit()
    }
  })

  return (
    <Reporter
      bud={bud}
      stats={compilation?.stats}
      errors={compilation?.errors}
      progress={compilation?.progress}
    />
  )
}

export {Serve, Serve as default}

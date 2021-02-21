import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  useInput,
} from '@roots/bud-support'
import type {Framework} from '@roots/bud-typings'

import {useStyle} from '@roots/ink-use-style'
import {useDisk} from '../../hooks/useDisk'
import {usePackageJson} from '../../hooks/usePackageJson'
import {useCompilation} from '../../hooks/useCompilation'

import {Header} from './Header'
import {Body} from './Body'
import {Footer} from './Footer'
import {Errors, Main, Screen} from '../../components'

export const Reporter: FunctionComponent<{
  bud: Framework
}> = ({bud}) => {
  const app = useApp()
  const {stats, progress, errors} = useCompilation(bud)

  useInput(input => {
    if (input == 'q') {
      console.clear()
      app.exit()
    }
  })

  useEffect(() => {
    if (!bud.isProduction) return

    const hasErrors = errors?.length > 0
    const isComplete = progress?.decimal >= 1

    ;(isComplete || hasErrors) &&
      setTimeout(() => {
        app.exit()
      }, 100)
  }, [stats, progress, errors])

  const style = useStyle(bud.store.get('theme'))
  const [disk] = useDisk(bud)
  const pkg = usePackageJson(disk)

  const height = !(errors?.length > 0)
    ? style?.bounds?.height - 2
    : null

  return (
    <Screen width={style?.bounds?.width}>
      <Header
        colors={style?.colors}
        stats={stats}
        pkg={pkg}
        progress={progress}
      />

      <Main height={height}>
        <Body
          errors={errors}
          bud={bud}
          col={style?.col}
          colors={style?.colors}
          stats={stats}
        />

        <Errors color={style?.colors.error} errors={errors} />

        <Footer
          errors={errors}
          bud={bud}
          bounds={style?.bounds}
          col={style?.col}
          pkg={pkg}
          colors={style?.colors}
          progress={progress}
          stats={stats}
        />
      </Main>
    </Screen>
  )
}

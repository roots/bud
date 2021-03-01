import {
  React,
  FunctionComponent,
  useEffect,
  useApp,
  Box,
  useInput,
} from '@roots/bud-support'
import type {Framework} from '@roots/bud-typings'

import {useStyle} from '@roots/ink-use-style'
import {useDisk} from '../../hooks/useDisk'
import {usePackageJson} from '../../hooks/usePackageJson'
import {useCompilation} from '../../hooks/useCompilation'

import {Header} from './Header'
import {Body} from './Body'
import {Footer, DevelopmentFeatures} from './Footer'
import {Errors, Main, Screen} from '../../components'
import {Mark} from '../../Mark'

export const Reporter: FunctionComponent<{
  bud: Framework
}> = ({bud}) => {
  const app = useApp()
  const {
    stats,
    progress,
    errors,
    hasErrors,
    warnings,
    hasWarnings,
  } = useCompilation(bud)

  useInput(input => {
    if (input == 'q') {
      console.clear()
      app.exit()
      process.exit()
    }
  })

  useEffect(() => {
    if (!bud.isProduction) return

    const isComplete = progress?.decimal >= 1

    ;(isComplete || hasErrors) &&
      setTimeout(() => {
        app.exit()
      }, 100)
  }, [stats, progress, errors])

  const style = useStyle(bud.store.get('theme'))
  const [disk] = useDisk(bud)
  const pkg = usePackageJson(disk)

  return (
    <Screen justifyContent="space-between">
      <Mark text={bud.store.get('args._')[0].split('/').pop()} />

      <Header
        hasErrors={hasErrors}
        colors={style?.colors}
        stats={stats}
        pkg={pkg}
        progress={progress}
      />

      <Screen>
        <Main padding={1} maxWidth={style?.bounds?.width}>
          <Body
            hasErrors={hasErrors}
            bud={bud}
            col={style?.col}
            colors={style?.colors}
            stats={stats}
          />

          {hasErrors && errors && (
            <Errors
              color={style?.colors.error}
              errors={errors}
            />
          )}

          {hasWarnings && warnings && (
            <Errors
              color={style?.colors.warning}
              errors={warnings}
            />
          )}

          <Box flexDirection="column">
            <Box margin={1} flexDirection="column">
              <DevelopmentFeatures
                bud={bud}
                colors={style?.colors}
                stats={stats}
              />
            </Box>
          </Box>

          <Box flexDirection="column">
            <Box margin={1} flexDirection="column">
              <Footer
                hasErrors={hasErrors}
                bud={bud}
                bounds={style?.bounds}
                col={style?.col}
                pkg={pkg}
                colors={style?.colors}
                progress={progress}
                stats={stats}
              />
            </Box>
          </Box>
        </Main>
      </Screen>
    </Screen>
  )
}

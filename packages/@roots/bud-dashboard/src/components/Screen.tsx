import type {Framework} from '@roots/bud-framework'
import {Ink, React} from '@roots/bud-support'

export const Screen = ({
  app,
  color,
  title,
  children,
}: {
  app: Framework
  color?: any
  title?: string
  children: any
}) =>
  title ? (
    <Ink.Box flexDirection="column" marginY={1}>
      <Ink.Text
        backgroundColor={app.store.get(
          color ?? 'theme.colors.primary',
        )}>
        {' '}
        {title}{' '}
      </Ink.Text>
      <Ink.Box flexDirection="column" marginTop={1}>
        {children}
      </Ink.Box>
    </Ink.Box>
  ) : (
    <Ink.Box flexDirection="column" marginTop={1}>
      {children}
    </Ink.Box>
  )

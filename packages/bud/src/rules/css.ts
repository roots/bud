import type Framework from '@roots/bud-typings'

export const test: Conditional = ({patterns}) =>
  patterns.get('css')

export const exclude: Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Use = bud => {
  const use: UseItem = item => bud.build.getItem(item)
  console.log(bud.mode.is('production'))
  const style = bud.mode.is('production')
    ? use('mini-css')
    : use('style')

  return [style, use('css'), use('resolve-url')]
}

declare type Conditional = Framework.Factory<
  Framework.Rule.Conditional
>

declare type Exclude = Framework.Factory<
  Framework.Rule.Conditional
>

declare type Use = Framework.Factory<Framework.Rule.Use>
declare type UseItem = (item: string) => Framework.Rule.Generic

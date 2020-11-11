export const test: Conditional = ({patterns}) =>
  patterns.get('css')

export const exclude: Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Use = bud => {
  const use: UseItem = item => bud.build.getItem(item)
  const style = bud.mode.is('production')
    ? use('mini-css')
    : use('style')

  return [style, use('css'), use('resolve-url')]
}

declare type Conditional = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

declare type Exclude = Framework.Rule.Factory<
  Framework.Rule.Conditional
>

declare type Use = Framework.Rule.Factory<Framework.Rule.Use>
declare type UseItem = (item: string) => Framework.Rule.Generic

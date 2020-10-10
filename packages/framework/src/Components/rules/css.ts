export const test: Conditional = bud =>
  bud.store['patterns'].get('css')

export const exclude: Exclude = bud =>
  bud.store['patterns'].get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => {
  const use: UseLoader = loader =>
    bud.components['items'].get(loader).make()

  return [
    bud.mode.is('production') ? use('minicss') : use('style'),
    use('css'),
    use('resolve-url'),
  ]
}

declare type Conditional = Build.Rule.Factory<
  Build.Rule.Conditional
>

declare type Exclude = Build.Rule.Factory<Build.Rule.Conditional>

declare type UseLoader = (loader: string) => Build.Rule.Generic

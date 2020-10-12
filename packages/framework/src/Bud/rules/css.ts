export const test: Conditional = bud =>
  bud.store['patterns'].get('css')

export const exclude: Exclude = bud =>
  bud.store['patterns'].get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => {
  const use: UseLoader = item => bud.build.items[item].make()

  return [
    bud.mode.is('production') ? use('minicss') : use('style'),
    use('css'),
    use('resolveUrl'),
  ]
}

declare type Conditional = Build.Rule.Factory<
  Build.Rule.Conditional
>

declare type Exclude = Build.Rule.Factory<Build.Rule.Conditional>

declare type UseLoader = (item: string) => Build.Rule.Generic

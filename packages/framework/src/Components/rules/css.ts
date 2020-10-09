export const test: Conditional = bud =>
  bud.store['patterns'].has('css')

export const exclude: Exclude = bud =>
  bud.store['patterns'].get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => {
  const use: Loaders.UseLoader = loader =>
    bud.components['items'].get(loader).make()

  return [
    bud.mode.is('production')
      ? use('minicss-loader')
      : use('style-loader'),
    use('css-loader'),
    use('resolve-url-loader'),
  ]
}

declare type Conditional = Build.Rule.Factory<
  Build.Rule.Conditional
>

declare type Exclude = Build.Rule.Factory<Build.Rule.Conditional>

declare namespace Loaders {
  export type UseLoader = (loader: string) => Build.Rule.Product
}

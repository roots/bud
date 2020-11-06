import '@roots/bud-typings'
import '@roots/bud-postcss'

export as namespace Tailwind

export type Config = Framework.Fluent<
  Framework.Bud,
  string | Framework.Index<any>
>

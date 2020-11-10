export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => patterns.get('js')

export const exclude: Framework.Rule.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => [patterns.get('modules'), /bud/]

export const enforce: Framework.Rule.Enforce = 'pre'

export const use: Framework.Rule.Factory<Framework.Rule.Use> = ({
  build,
}) => [build.items.get('eslint')]

export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => patterns.get('svg')

export const use: Framework.Rule.Factory<Framework.Rule.Conditional> = ({
  build,
}) => [build.getItem('svg')]

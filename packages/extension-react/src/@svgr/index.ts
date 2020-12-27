import type {
  Module,
  Rule,
  Item,
  Loader,
  Framework,
} from '@roots/bud-typings'

/**
 * @svgr-loader register loader
 */
export const registerLoader: Module.RegisterOne<Loader> = [
  '@svgr-loader',
  require.resolve('@svgr/webpack'),
]

/**
 * @svgr-loader register loader
 */
export const registerItem: Module.RegisterOne<Item.Module> = [
  '@svgr',
  {
    ident: '@svgr',
    loader: '@svgr-loader',
  },
]

/**
 * @svgr-loader register use
 */
export const registerRule: Module.RegisterOne<Rule.Module> = [
  '@svgr',
  {
    test: (bud: Framework): RegExp => bud.patterns.get('svg'),
    use: (bud: Framework): Rule[] => [
      bud.build.items.get('@svgr'),
    ],
  },
]

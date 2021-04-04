import {Hooks} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework'

/**
 * Item hooks
 */
export function rules(app: Framework): void {
  app.publish(
    {
      /**
       * rule
       */
      rule: () => ({
        'rule/js': app.subscribe('rule/js'),
        'rule/css': app.subscribe('rule/css'),
        'rule/image': app.subscribe('rule/image'),
        'rule/svg': app.subscribe('rule/svg'),
        'rule/font': app.subscribe('rule/font'),
        'rule/html': app.subscribe('rule/html'),
      }),
    },
    'providers/rule',
  )

  const jsRules: Hooks.PublishDict = {
    /**
     * rule/js
     */
    'rule/js': () => ({
      test: app.subscribe('rule/js/test'),
      exclude: app.subscribe('rule/js/exclude'),
      use: app.subscribe('rule/js/use'),
    }),

    'rule/js/test': () => app.store.get('patterns.js'),
    'rule/js/exclude': () => app.store.get('patterns.modules'),
    'rule/js/use': () => [app.subscribe('item/raw')],
  }

  app.publish(
    {
      ...jsRules,

      /**
       * rule/css
       */
      'rule/css': () => ({
        test: app.subscribe('rule/css/test'),
        exclude: app.subscribe('rule/css/exclude'),
        use: app.subscribe('rule/css/use'),
      }),

      'rule/css/test': () => app.store.get('patterns.css'),

      'rule/css/exclude': () =>
        app.store.get('patterns.modules'),

      'rule/css/use': () => [
        app.isProduction
          ? app.subscribe('item/minicss')
          : app.subscribe('item/style'),
        app.subscribe('item/css'),
      ],

      /**
       * rule/svg
       */
      'rule/svg': () => ({
        test: app.subscribe('rule/svg/test'),
        use: app.subscribe('rule/svg/use'),
      }),
      'rule/svg/test': () => app.store.get('patterns.svg'),
      'rule/svg/use': () => [app.subscribe('item/svg')],

      /**
       * rule/font
       */
      'rule/font': () => ({
        test: app.subscribe('rule/font/test'),
        use: app.subscribe('rule/font/use'),
      }),
      'rule/font/test': () => app.store.get('patterns.font'),
      'rule/font/use': () => [app.subscribe('item/font')],

      /**
       * rule/html
       */
      'rule/html': () => ({
        test: app.subscribe('rule/html/test'),
        use: app.subscribe('rule/html/use'),
      }),
      'rule/html/test': () => app.store.get('patterns.html'),
      'rule/html/use': () => [app.subscribe('item/raw')],

      /**
       * rule/image
       */
      'rule/image': () => ({
        test: app.subscribe('rule/image/test'),
        use: app.subscribe('rule/image/use'),
      }),
      'rule/image/test': () => app.store.get('patterns.image'),
      'rule/image/use': () => [app.subscribe('item/image')],
    },
    'providers/rule',
  )
}

import {Framework} from '@roots/bud-framework'

/**
 * Item hooks
 */
export function rules(this: Framework): void {
  this.publish({
    /**
     * rule
     */
    rule: () => ({
      'rule/js': this.subscribe('rule/js'),
      'rule/css': this.subscribe('rule/css'),
      'rule/image': this.subscribe('rule/image'),
      'rule/svg': this.subscribe('rule/svg'),
      'rule/font': this.subscribe('rule/font'),
      'rule/html': this.subscribe('rule/html'),
    }),
  })

    /**
     * rule/js
     */
    .publish({
      'rule/js': () => ({
        test: this.subscribe('rule/js/test'),
        exclude: this.subscribe('rule/js/exclude'),
        use: this.subscribe('rule/js/use'),
      }),

      'rule/js/test': () => this.store.get('patterns.js'),
      'rule/js/exclude': () =>
        this.store.get('patterns.modules'),
      'rule/js/use': () => [this.subscribe('item/raw')],
    })

    /**
     * rule/css
     */
    .publish({
      'rule/css': () => ({
        test: this.subscribe('rule/css/test'),
        exclude: this.subscribe('rule/css/exclude'),
        use: this.subscribe('rule/css/use'),
      }),

      'rule/css/test': () => this.store.get('patterns.css'),

      'rule/css/exclude': () =>
        this.store.get('patterns.modules'),

      'rule/css/use': () => [
        this.isProduction
          ? this.subscribe('item/minicss')
          : this.subscribe('item/style'),
        this.subscribe('item/css'),
      ],
    })

    /**
     * rule/svg
     */
    .publish({
      'rule/svg': () => ({
        test: this.subscribe('rule/svg/test'),
        use: this.subscribe('rule/svg/use'),
      }),
      'rule/svg/test': () => this.store.get('patterns.svg'),
      'rule/svg/use': () => [this.subscribe('item/svg')],
    })

    /**
     * rule/font
     */
    .publish({
      'rule/font': () => ({
        test: this.subscribe('rule/font/test'),
        use: this.subscribe('rule/font/use'),
      }),
      'rule/font/test': () => this.store.get('patterns.font'),
      'rule/font/use': () => [this.subscribe('item/font')],
    })

    /**
     * rule/html
     */
    .publish({
      'rule/html': () => ({
        test: this.subscribe('rule/html/test'),
        use: this.subscribe('rule/html/use'),
      }),
      'rule/html/test': () => this.store.get('patterns.html'),
      'rule/html/use': () => [this.subscribe('item/raw')],
    })

    /**
     * rule/image
     */
    .publish({
      'rule/image': () => ({
        test: this.subscribe('rule/image/test'),
        use: this.subscribe('rule/image/use'),
      }),
      'rule/image/test': () => this.store.get('patterns.image'),
      'rule/image/use': () => [this.subscribe('item/image')],
    })
}

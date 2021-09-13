import {Framework, Module} from '@roots/bud-framework'

/**
 * BudEmotionExtension interface
 *
 * @public
 */
export interface BudEmotionExtension extends Module {}

/**
 * Adds EmotionCSS to the framework
 *
 * @public
 */
export const BudEmotionExtension: BudEmotionExtension = {
  /**
   * {@inheritDoc @roots/bud-framework#Module.name}
   *
   * @public
   */
  name: '@roots/bud-emotion',

  /**
   * {@inheritDoc @roots/bud-framework#Module.boot}
   *
   * @public
   */
  boot({babel}: Framework) {
    babel?.setPlugins && babel.setPlugin('@emotion/babel-plugin')
  },
}

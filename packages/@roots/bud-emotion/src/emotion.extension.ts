import {Extension, Framework} from '@roots/bud-framework'

/**
 * BudEmotionExtension interface
 *
 * @public
 */
export interface EmotionExtension extends Extension.Module {
  name: string
  boot: (framework: Framework) => Promise<void>
}

export const name: EmotionExtension['name'] =
  '@roots/bud-emotion'

export const boot: EmotionExtension['boot'] = async ({
  babel,
}: Framework) => {
  babel?.setPlugins &&
    babel.setPlugin(
      '@emotion/babel-plugin',
      require.resolve('@emotion/babel-plugin'),
    )
}

import {Tailwind} from '@roots/bud-framework'

export const tailwind: Tailwind.Configure = function (
  config: Omit<Tailwind.Config, null> = null,
  implementation:
    | 'tailwindcss'
    | '@tailwindcss/jit' = 'tailwindcss',
) {
  /**
   * Lock down our config
   */
  config = config ?? this.postcss.plugins[implementation]

  /**
   * Set plugin
   */
  this.postcss.set([implementation, config])

  /**
   * Undo auto-ordering
   */
  this.postcss.setOrder(
    this.postcss.order.filter(
      k => k !== 'tailwindcss' && k !== '@tailwindcss/jit',
    ),
  )

  /**
   * Update order
   */
  if (this.postcss.order.includes('postcss-import')) {
    this.postcss.setOrder([
      ...this.postcss.order.splice(
        0,
        this.postcss.order.indexOf('postcss-import') + 1,
      ),
      implementation,
      ...this.postcss.order,
    ])

    return this
  }

  this.postcss.setOrder([implementation, ...this.postcss.order])

  return this
}

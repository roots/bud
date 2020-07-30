import type {Bud, Translate} from './Types'

const translate: Translate = function (output: string): Bud {
  this.features.set('translate', output ? true : false)

  this.features.enabled('translate') &&
    this.options.merge('babel', {
      ...this.options.get('babel'),
      plugins: [
        ...this.options.get('babel').plugins,
        [this.require('@wordpress/babel-plugin-makepot'), {output}],
      ],
    })

  return this
}

export {translate}

import type {Factory} from '@roots/bud-build/registry'

const html: Factory = async ({filter, makeRule, path}) =>
  makeRule()
    .setInclude([() => path()])
    .setTest(filter(`pattern.html`))
    .setUse([`html`])

export {html as default}

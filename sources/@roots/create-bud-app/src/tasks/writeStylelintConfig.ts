import prettier from 'prettier'

import type CreateCommand from '../commands/create.js'

export default async function writeStylelintConfigTask(
  command: CreateCommand,
) {
  command.context.stdout.write(`Writing stylelint.config.js... \n`)

  const extensions = [`@roots/bud-stylelint/config`]

  command.support.includes(`sass`) &&
    extensions.push(`@roots/bud-sass/stylelint-config`)

  command.support.includes(`tailwindcss`) &&
    extensions.push(`@roots/bud-tailwindcss/stylelint-config`)

  await command.fs.write(
    `stylelint.config.cjs`,
    prettier.format(
      `\
module.exports = {
  extends: [
    ${extensions.reduce((all, ext) => `${all} \`${ext}\`,`, ``)}
  ]
}`,
      {parser: `babel`},
    ),
  )
}

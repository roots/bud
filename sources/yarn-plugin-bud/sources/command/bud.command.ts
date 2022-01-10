import {CommandClass} from 'clipanion'

import {Command} from './base.command'

export class Bud extends Command {
  public static paths: CommandClass['paths'] = [[`@bud`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `run developer commands`,
    details: `\
Use this command to assist with developer tasks and debugging across the repository.

If you are just trying to build \`bud.js\` run \`yarn @bud make\`.

If you are doing development work in the repository you can run \`yarn @bud build -w\` to watch for changes and rebuild automatically.

There are additional commands to assist with:

🐋 using docker

- \`yarn @bud down --help\`
- \`yarn @bud up --help\`
- \`yarn @bud $ --help\`

🧼 cleaning build artifacts

- \`yarn @bud clean --help\`

🧱 compiling packages to single file, zero dependency executables

- \`yarn @bud compile --help\`

📙 documenting code

- \`yarn @bud docs --help\`

🤨 linting code

- \`yarn @bud lint --help\`

🛠  building all packages as in CI

- \`yarn @bud make --help\`

📦  proxying packages in a local dev environment

- \`yarn @bud proxy --help\`

🚚  ship it

- \`yarn @bud release --help\`
`,
  }

  public async execute() {
    this.context.stdout.write(Bud.usage.details)
  }
}

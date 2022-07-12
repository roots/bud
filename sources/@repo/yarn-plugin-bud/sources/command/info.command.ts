import {paths} from '@repo/constants'
import {execSync} from 'child_process'
import {CommandClass} from 'clipanion'
import {readJsonSync} from 'fs-extra'

import {Command} from './base.command'

/**
 * `@bud` command class
 *
 * @internal
 */
export class Info extends Command {
  /**
   * Command name
   *
   * @internal
   */
  public static label = '@bud info'

  /**
   * Command paths
   *
   * @internal
   */
  public static paths: CommandClass['paths'] = [['@bud', 'info']]

  public get hasPm2() {
    try {
      execSync('yarn pm2 -v')
      return true
    } catch (e) {
      return false
    }
  }

  public get hasVolta() {
    try {
      execSync('volta -v')
      return true
    } catch (e) {
      return false
    }
  }

  public get voltaList() {
    return execSync('volta list')
      .toString()
      .trim()
      .split('\n')
      .filter(ln => {
        return ln.startsWith('runtime') || ln.startsWith('package-manager')
      })
      .map(ln =>
        '- '.concat(
          ln
            .split(' / ')
            .shift()
            .split(' (current')
            .shift()
            .replace('runtime ', ''),
        ),
      )
      .join('\n')
  }

  public get hasVerdaccio() {
    try {
      execSync('verdaccio -v')
      return true
    } catch (e) {
      return false
    }
  }

  public get head() {
    return execSync('git rev-parse HEAD').toString().trim()
  }

  public get branch() {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  }

  public get pm2() {
    return execSync('yarn pm2 ls').toString().trim()
  }

  public get verdaccio() {
    return execSync('yarn verdaccio --version').toString().trim()
  }

  public get logs() {
    return execSync('yarn pm2 logs --out --lines 5 --nostream')
      .toString()
      .trim()
      .split('\n')
      .splice(2)
      .join('\n')
  }

  public get requiredNode() {
    return readJsonSync(`${paths.root}/package.json`).volta.node
  }

  public get requiredNpm() {
    return readJsonSync(`${paths.root}/package.json`).volta.npm
  }

  public get pm2Version() {
    return execSync('yarn pm2 --version')
      .toString()
      .trim()
      .replace('v', '')
  }

  public get nodeVersion() {
    return process.version.replace('v', '')
  }

  public get yarn() {
    return execSync('yarn -v').toString().trim().replace('v', '')
  }

  public get npm() {
    return execSync('npm -v').toString().trim().replace('v', '')
  }

  public get gitLog() {
    return execSync(
      `git log --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' origin..${this.branch}`,
    )
      .toString()
      .trim()
  }

  /**
   * Command execute
   *
   * @internal
   */
  public async execute() {
    this.log(`    
 _               _
| |__  _   _  __| |
|  _ \\| | | |/ _  |
| |_) | |_| | (_| |
|_.__/ \\__._|\\__._|
`)
    if (this.hasVolta) {
      process.stdout.write(`
⚡ toolchain:

${this.voltaList}
`)
    } else {
      process.stdout.write(`
installed:

- node@${this.nodeVersion} (required: ${this.requiredNode})
- yarn@${this.yarn} 
- npm@${this.npm} (required: ${this.requiredNpm})
${this.hasPm2 ? `- pm2@v${this.pm2Version}` : ``}
${this.hasVerdaccio ? `- verdaccio@${this.verdaccio}` : ``}`)
      process.stdout.write(
        `It is recommended to use volta when working with bud. See: https://volta.sh.
        Easy install: \`curl https://get.volta.sh | bash\`
`,
      )
    }

    if (this.nodeVersion !== this.requiredNode)
      process.stdout.write(`
\x1b[31m✘\x1b[0m node version mismatch

Your node version is ${process.version} but ${this.requiredNode} is required.
Consider using volta to guarantee you are using the correct version of node.`)

    if (this.npm !== this.requiredNpm)
      process.stdout.write(`
\x1b[31m✘\x1b[0m npm version mismatch

Your npm version is ${this.npm} but ${this.requiredNode} is required.`)

    if (!this.hasPm2)
      process.stdout.write(`
\x1b[31m✘\x1b[0m pm2 missing

pm2 is required to be installed globally but was not found.

To install pm2, run any of the following:
  $ yarn @bud registry install
  $ volta install pm2
  $ npm install -g pm2
  $ cd $HOME && yarn global add pm2
`)

    if (!this.hasVerdaccio)
      process.stdout.write(`
\x1b[31m✘\x1b[0m verdaccio missing

verdaccio is required to be installed globally but was not found.

To install verdaccio, run any of the following:
  $ yarn @bud registry install
  $ volta install verdaccio
  $ npm install -g verdaccio
  $ cd $HOME && yarn global add verdaccio
`)

    process.stdout.write(`
On branch \`${this.branch}\`:

${this.gitLog}
`)

    if (this.hasPm2 && this.hasVerdaccio) {
      process.stdout.write(`
pm2:

${this.pm2}

logs:

${this.logs}`)
    }
  }
}

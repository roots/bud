import chalk from '@roots/bud-support/chalk'
import figures from '@roots/bud-support/figures'
// @ts-ignore
import {highlight} from '@roots/bud-support/highlight'
import logger from '@roots/bud-support/logger'

/**
 * Decorator that logs a deprecation warning to the console
 * when the function is called.
 */
export const deprecated =
  (
    method: string,
    message?: string,
    examples: Array<[string, string]> = [],
  ) =>
  (target: any, key: string, descriptor: any) => {
    const originalMethod = descriptor.value
    descriptor.value = function (...args: any) {
      const warn =
        this.logger && typeof this.logger.warn === `function`
          ? this.logger.warn
          : logger.warn

      const warning = [
        chalk.yellow(`${method}.${key}`),
        `has been deprecated and will be removed in a future release.`,
      ]

      if (message)
        warning.push(
          `${message.replace(/\s(bud\..*)\s/, chalk.green(` $1 `))}:`,
        )

      if (examples.length)
        warning.push(
          ...examples.flatMap(([description, example]) => [
            `\n\n`,
            `${chalk.blue(figures.triangleRightSmall)} ${description}:`,
            `\n\n`,
            chalk.dim(`  \`\`\`js`),
            `\n`,
            `  ${highlight(example)}`,
            `\n`,
            chalk.dim(`  \`\`\``),
          ]),
        )

      warn(...warning)
      return originalMethod.apply(this, args)
    }

    return descriptor
  }

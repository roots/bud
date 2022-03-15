import {spawn} from 'child_process'

/**
 * Base command
 *
 * @public
 */
export abstract class Command {
  /**
   * @public
   */
  public onMessage(message: string): void {
    return null
  }

  /**
   * @public
   */
  public constructor(
    public path: string,
    onMessage?: (message: string) => void,
  ) {
    if (onMessage) this.onMessage = onMessage
  }

  /**
   * @public
   */
  public static execute(
    onMessage: (message: string) => void,
    ...commandArgs: Array<string>
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = spawn(commandArgs.shift(), commandArgs)

      onMessage &&
        command.stdout.on('data', message => onMessage(message.toString()))

      command.on('close', resolve)
      command.on('error', reject)
    })
  }

  /**
   * @public
   */
  public static normalizeDependencies(
    dependencies: Array<string | [string, string]>,
  ): Array<string> {
    return dependencies
      .reduce((acc, dependency) => {
        if (Array.isArray(dependency)) {
          acc.push(`${dependency[0]}@${dependency[1]}`)
        } else {
          acc.push(dependency)
        }
        return acc
      }, [])
      .filter(Boolean)
  }
}

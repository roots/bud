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

  public abstract getLatestVersion(signifier: string): Promise<string>

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
    commandArgs: Array<string>,
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = spawn(commandArgs.shift(), commandArgs)
      const message = []

      command.stdout.on(`data`, incoming => {
        message.push(incoming.toString())
        onMessage && onMessage(incoming.toString())
      })
      command.stderr.on(`data`, incoming => {
        message.push(incoming.toString())
        onError && onError(incoming.toString())
      })

      command.on(`close`, () => resolve(message))
      command.on(`error`, () => reject())
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

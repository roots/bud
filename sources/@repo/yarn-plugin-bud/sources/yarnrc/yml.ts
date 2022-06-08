import * as fs from 'fs-extra'
import * as yml from 'js-yaml'
import {get, set} from 'lodash'

/**
 * Helper class for dealing with yml
 *
 * @internal
 */
export class Yml {
  /**
   * yml data (json)
   *
   * @internal
   */
  public data: Record<string, any> = {}

  /**
   * Class constructor
   *
   * @param path - path to yml file
   *
   * @internal
   */
  public constructor(public path: string) {}

  /**
   * Logs message to process.stdout
   *
   * @param message - message to log
   *
   * @internal
   */
  public log(message: string): void {
    process.stdout.write(
      `[${this.path.replace(process.cwd(), '')}] ${message}\n`,
    )
  }

  /**
   * Reads yml file, returns self
   *
   * @returns - Yml
   *
   * @internal
   */
  public async read(): Promise<Yml> {
    const source = await fs.readFile(this.path, 'utf8')
    this.data = yml.load(source, {json: true})
    this.log(`read from disk`)

    return this
  }

  /**
   * Writes yml file, returns self
   *
   * @internal
   */
  public async write(): Promise<Yml> {
    const source = yml.dump(this.data)
    await fs.writeFile(this.path, source, 'utf8')
    this.log(`written to disk`)

    return this
  }

  /**
   * Get value from yml
   *
   * @param key - string key of yml data
   * @returns - requested value
   *
   * @internal
   */
  public get(key: string): Promise<any> {
    return get(this.data, key)
  }

  /**
   * Set value in yml
   *
   * @param key - string key of yml data
   * @param value - value to set
   * @returns - self
   *
   * @internal
   */
  public set(key: string, value: any): Yml {
    set(this.data, key, value)
    this.log(`set ${key} to ${value}`)

    return this
  }
}

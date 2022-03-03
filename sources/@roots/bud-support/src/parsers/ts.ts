/**
 * TS Node
 *
 * @public
 */
export async function read(path: string) {
  try {
    const {register} = await import('ts-node')
    register({transpileOnly: true})

    return require(path)
  } catch (error) {
    return this.error(error)
  }
}

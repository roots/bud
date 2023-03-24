import fs from 'fs-jetpack'
import yaml from 'js-yaml'

export const read = async (file: string): Promise<any> => {
  const source = await fs.readAsync(file, `utf8`)
  return yaml.load(source)
}

export const write = async (file: string, data: any): Promise<void> => {
  const source = yaml.dump(data, {skipInvalid: true})
  await fs.writeAsync(file, source)
}

export const parse = async (source: string) => {
  return yaml.load(source)
}

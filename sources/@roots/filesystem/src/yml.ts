import fs from 'fs-jetpack'
import yaml from 'js-yaml'

export const read = async (file: string): Promise<any> => {
  const source = await fs.readAsync(file, `utf8`)
  return yaml.load(source)
}

export const write = async (file: string, data: any): Promise<void> => {
  const source = yaml.dump(data)
  await fs.writeAsync(file, source)
}

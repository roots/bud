import yaml from 'js-yaml'

import * as fs from './filesystem.js'

export const read = async (file: string): Promise<any> => {
  const source = await fs.read(file)
  return yaml.load(source)
}

export const write = async (file: string, data: any): Promise<void> => {
  const source = yaml.dump(data)
  await fs.write(file, source)
}

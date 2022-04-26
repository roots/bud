import {readFile, writeFile} from '../external/fs-extra'
import {yaml} from '../external/yaml'

export const read = async (file: string): Promise<any> => {
  const source = await readFile(file, 'utf8')
  return yaml.load(source)
}

export const write = async (file: string, data: any): Promise<void> => {
  const source = yaml.dump(data)
  await writeFile(file, source)
}

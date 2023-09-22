import { dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const fs = await import(`node:fs/promises`)

const path = resolve(fileURLToPath(dirname(import.meta.url)), `test.txt`)
console.log(`file.js`, `path`, path)

const contents = await fs.readFile(path, `utf8`)
console.log(`file.js`, `contents`, contents)

export default contents

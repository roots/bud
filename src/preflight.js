import {join, resolve} from 'path'
import mergeDirs from 'merge-dirs'

const cwd = process.cwd()
const projectDeps = join(cwd, 'node_modules')
const budDeps = resolve(`${__dirname}/../../node_modules`)

mergeDirs(budDeps, projectDeps, 'skip')

import {cwd, env} from 'node:process'

const basedir = env?.PROJECT_CWD ?? cwd()

export default basedir

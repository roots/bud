import {ProjectRoot} from './types'

const projectRoot: ProjectRoot = require.main.paths[0].split('node_modules')[0].slice(0, -1)

export {projectRoot}

import {type Options, default as Project} from './integration-test.js'

export default (options: Options) => new Project(options)

export {type Options, type Project}

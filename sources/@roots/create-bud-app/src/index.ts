/* eslint-disable no-console */
import * as Project from './prompts/project.js'
import * as Transpiler from './prompts/transpiler.js'
import * as state from './state.js'

console.log(`create-bud-app`)

await Project.run()
await Transpiler.run()

console.log(`final state:`, state.data)

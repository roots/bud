import {myApp} from '@scripts/app.js'
import {bud} from '../../packages/bud-framework'

console.log(bud.init())

const root = document.querySelector('#root')
ReactDOM.render(myApp, root)

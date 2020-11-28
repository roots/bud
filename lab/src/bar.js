import React from 'react'
import ReactDOM from 'react-dom'
import push from 'lodash'
import {MyApp} from '@scripts/app.js'

const array = ['foo', 'bar']

push(array, ['baz'])

const root = document.querySelector('#root')

ReactDOM.render(<MyApp />, root)

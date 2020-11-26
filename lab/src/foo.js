import React from 'react'
import ReactDOM from 'react-dom'
import push from 'lodash'
import {MyApp} from '@scripts/app.js'
import photo from './images/photo.jpg'

const array = ['foo', 'bar']

console.log(photo)

push(array, ['baz'])

const root = document.querySelector('#root')

ReactDOM.render(<MyApp />, root)

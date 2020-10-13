import {isArray, isArguments, isBoolean, flatMap, flatMapDeep} from 'lodash'

Object.entries({isArray, isArguments, isBoolean, flatMap, flatMapDeep}).map(dash => document.body.innerHTML = dash.toString())

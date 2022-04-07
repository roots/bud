/* eslint-disable no-console */
const foo: string = 'black'

document.querySelector('body').style.backgroundColor = foo

// @ts-ignore
import.meta.webpackHot?.accept(console.error)

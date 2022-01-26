const foo: string = 'black'

document.querySelector('body').style.backgroundColor = foo

// @ts-ignore
// eslint-disable-next-line no-console
import.meta.webpackHot?.accept(console.error)

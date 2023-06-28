import './demo'

const target = document.querySelector('body')
target.innerHTML = `
  <div>
    <h1>Hello from esbuild!</h1>
  </div>
`

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)

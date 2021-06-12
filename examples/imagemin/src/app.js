import owl from './owl.jpeg'

const target = document.querySelector('body')

target.innerHTML = `
  <div>
    <h1>Hello from esbuild!</h1>
    <img src="${owl}" />
  </div>
`

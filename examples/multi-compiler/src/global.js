const target = document.querySelector('body')
target.innerHTML = `
  <div>
    <h1>Hello from babel!</h1>
  </div>
`

module?.hot?.accept(err => {
  console.error(err)
})

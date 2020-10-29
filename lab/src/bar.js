const root = document.querySelector('#root')

console.log('cha')

module?.hot && module.hot.accept(err => {
  console.error(err)
})

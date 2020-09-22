document.querySelector('body').style.backgroundColor = 'white'
console.log('done!')

module.hot.accept(err => {
  console.log(err)
})

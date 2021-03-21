const body = document.querySelector('body')

const changeBg = () => {
  body.classList = ''
  body.classList.add('bg-indigo-600')
}

changeBg()

module?.hot?.accept(err => changeBg())

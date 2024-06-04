const body = document.querySelector('body')

const changeBg = () => {
  body.classList = ''
  body.classList.add('bg-indigo-600')
}

/**
 * Yo
 */
changeBg()

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(changeBg)
}

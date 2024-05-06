import './styles.css'

document.querySelector('#root')?.classList.add('init')

if (document.querySelector('.init')) {
  const {default: logLoaded} = await import('./module.js')
  logLoaded()
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}

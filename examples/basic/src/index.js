import './styles.css'

document.querySelector('#root')?.classList.add('init')

if (import.meta.webpackHot) import.meta.webpackHot.accept()

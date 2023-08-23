import styles from './style.module.scss'

document.body.innerHTML = `
  <div class="${styles.container}">
    <h1 class="${styles.title}">Hello World</h1>
  </div>
`

if (import.meta.webpackHot)
  import.meta.webpackHot.accept(console.error)

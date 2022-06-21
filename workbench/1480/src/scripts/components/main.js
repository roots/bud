import styles from '@src/styles/app.module.css'

export const main = () => {
  /**
   * Remove no-js class from body element
   */
  document.body.classList.contains('no-js') &&
    document.body.classList.remove('no-js')

  element.innerHTML = '<div class="' + styles.foo + '">'
}

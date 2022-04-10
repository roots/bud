/**
 * Calls once document has loaded.
 *
 * @param onReady - callback function
 * @returns void
 *
 * @public
 */
interface domReady {
  (onReady: () => void): void
}

const domReady: domReady = onReady => {
  window.requestAnimationFrame(function check() {
    document.body ? onReady() : window.requestAnimationFrame(check)
  })
}

export {domReady as default}

/**
 * Calls once document has loaded.
 *
 * @remarks
 * Callback function may be async or sync
 *
 * @param onReady - callback function
 * @returns void
 */
interface domReady {
  (onReady: () => unknown | (() => Promise<unknown>)): void
}

const domReady: domReady = onReady => {
  window.requestAnimationFrame(async function check() {
    document.body ? await onReady() : window.requestAnimationFrame(check)
  })
}

export default domReady

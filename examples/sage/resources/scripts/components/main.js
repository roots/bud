export const main = () => {
  document.body.classList.contains('no-js') &&
    document.body.classList.remove('no-js')

  document.body.classList.add(`text-xl`)
  document.body.classList.add(`text-custom`)
}

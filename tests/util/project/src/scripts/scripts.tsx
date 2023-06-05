import image from '@src/images/image.jpeg'

if (!document.querySelector(`#root`)) {
  document.body.innerHTML = `<div id="root"></div>`
}

const root = document.querySelector<HTMLElement>(`#root`)

root.style.backgroundImage = `url(${image})`
root.style.backgroundSize = `cover`
root.style.backgroundRepeat = `no-repeat`
root.style.minHeight = `100vh`
root.style.height = `100vh`
root.style.display = `flex`

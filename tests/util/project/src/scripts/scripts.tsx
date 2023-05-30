import image from '@src/images/image.jpeg'

const root = document.querySelector<HTMLElement>(`#root`)

root.style.backgroundImage = `url(${image})`
root.style.backgroundSize = `cover`
root.style.backgroundRepeat = `no-repeat`
root.style.minHeight = `100vh`
root.style.height = `100vh`
root.style.display = `flex`

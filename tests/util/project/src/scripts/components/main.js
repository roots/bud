import image from '/images/image.jpeg?inline'

export const main = () => {
  document.body.style.backgroundColor = `#f0f0f0`
  document.body.style.background = `url(${image})`
}

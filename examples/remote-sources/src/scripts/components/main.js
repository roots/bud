import confetti from 'skypack:canvas-confetti'
import contributors from 'github:roots/bud/main/contributors.yml'

export const main = () => {
  document.body.style.backgroundColor = `#f0f0f0`
  document.body.classList.add(
    `flex`,
    `h-screen`,
    `self-center`,
    `justify-center`,
  )

  const contrib = document.createElement(`div`)
  contrib.classList.add(
    `contributors`,
    `flex`,
    `flex-col`,
    `flex-wrap`,
    `self-center`,
  )

  document.body.appendChild(contrib)
  contributors.map(({name}) => {
    const h1 = document.createElement(`h1`)
    h1.textContent = `🎉 ${name}`
    h1.classList.add(`text-center`, `self-center`)

    document.querySelector(`.contributors`).appendChild(h1)

    confetti({
      particleCount: 500,
      spread: 1000,
      origin: {
        y: Math.random() * 0.2 + 0.1,
        x: Math.random() * 0.8 + 0.1,
      },
    })
  })
}

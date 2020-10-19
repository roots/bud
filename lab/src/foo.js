;(() => {
  console.log('hello')

  const animate = () => {
    console.log('animating')
    const root = document.getElementById('root')

    root ? (root.style.background = 'yellow') : animate()
  }

  window.requestAnimationFrame(animate)
})()

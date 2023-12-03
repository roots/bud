// @ts-ignore
await import(`@splidejs/splide/css`)

document.body.innerHTML = `
  <div id="splide" class="splide" class="splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide">Slide 01</li>
        <li class="splide__slide">Slide 02</li>
        <li class="splide__slide">Slide 03</li>
      </ul>
    </div>
  </div>
`

const {default: Splide} = await import(`@splidejs/splide`)
new Splide('.splide').mount()

export default {}

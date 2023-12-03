import './index.css'

import colors from '@tailwind/colors'

document.body.style.backgroundColor = colors.indigo[600]

document.body.innerHtml = `<div class="text-white text-4xl font-bold">Hello World!</div>`

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)

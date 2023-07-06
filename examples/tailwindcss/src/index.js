import './index.css'

import colors from '@tailwind/colors'

document.body.style.backgroundColor = colors.indigo[600]

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)

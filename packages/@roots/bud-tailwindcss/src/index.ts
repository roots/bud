import {Tailwind} from './interface'
import {tailwind} from './api'

const tailwindcss: Tailwind.Extension = {
  name: '@roots/bud-tailwindcss',
  api: {
    tailwind,
  },
  boot: app => {
    app.tailwind()
  },
}

export const {name, api, boot} = tailwindcss
export default tailwindcss

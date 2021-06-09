import {Tailwind} from './interface'
import {tailwind} from './api'

const api = {tailwind}

const tailwindcss: Tailwind.Extension = {
  name: '@roots/bud-tailwindcss',
  api,
  boot: app => {
    app.tailwind()
  },
}

export {api}
export const {name, boot} = tailwindcss
export default tailwindcss

import {tailwind} from './api'
import {Tailwind} from './interface'

const tailwindcss: Tailwind.Extension = {
  name: '@roots/bud-tailwindcss',
  api: {tailwind},
  boot: app => app.tailwind(),
}

export const {name, api, boot} = tailwindcss
export default tailwindcss

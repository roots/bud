import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import tailwindcss from 'tailwindcss'
import * as apiFns from './api'

// Extension ident
export const name: Module['name'] = '@roots/bud-tailwindcss'

// Extension config
export const api: Module['api'] = apiFns

// Boot extension
export const boot: Module['boot'] = ({postcss}: Framework) => {
  postcss.setPlugin(['tailwindcss', tailwindcss])
}

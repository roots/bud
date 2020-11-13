import {Indexed} from '@roots/bud-typings'

export const css = /\.css$/
export const cssModule = /\.module\.css$/
export const font = /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|ico)$/
export const html = /\.(html?)$/
export const image = /\.(png|svg|jpg|jpeg|gif)$/
export const js = /\.(js|jsx)$/
export const modules = /(node_modules|bower_components)/
export const sass = /\.(scss|sass)$/
export const sassModule = /\.module\.(scss|sass)$/
export const svg = /\.svg$/
export const ts = /\.(ts|tsx)$/
export const vue = /\.vue$/

export type Patterns = Indexed<RegExp>

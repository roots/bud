import {expect} from 'vitest'

export default (css: string) => {
  expect(css).toEqual(expect.any(String))
  expect(css.length).toBeGreaterThan(1)

  // postcss @import
  expect(css.includes(`@import`)).toBe(false)

  // tailwindcss @apply directive
  expect(css.includes(`@apply`)).toBe(false)
  // tailwindcss @layer directive
  expect(css.includes(`@layer`)).toBe(false)
  // tailwindcss @variants directive
  expect(css.includes(`@variants`)).toBe(false)
  // tailwindcss @responsive directive
  expect(css.includes(`@responsive`)).toBe(false)
  // tailwindcss @screen directive
  expect(css.includes(`@screen`)).toBe(false)

  // scss @use directive
  expect(css.includes(`@use`)).toBe(false)
  // scss @forward directive
  expect(css.includes(`@forward`)).toBe(false)
  // scss @mixin directive
  expect(css.includes(`@mixin`)).toBe(false)
  // scss @include directive
  expect(css.includes(`@include`)).toBe(false)
  // scss @extend directive
  expect(css.includes(`@extend`)).toBe(false)
  // scss @function directive
  expect(css.includes(`@function`)).toBe(false)
  // scss @return directive
  expect(css.includes(`@return`)).toBe(false)
  // scss @if directive
  expect(css.includes(`@if`)).toBe(false)
  // scss @else directive
  expect(css.includes(`@else`)).toBe(false)
  // scss @for directive
  expect(css.includes(`@for`)).toBe(false)
  // scss @each directive
  expect(css.includes(`@each`)).toBe(false)
  // scss @while directive
  expect(css.includes(`@while`)).toBe(false)
  // scss @debug directive
  expect(css.includes(`@debug`)).toBe(false)
  // scss @warn directive
  expect(css.includes(`@warn`)).toBe(false)
  // scss @error directive
  expect(css.includes(`@error`)).toBe(false)
  // scss @at-root directive
  expect(css.includes(`@at-root`)).toBe(false)
  // scss @import directive
  expect(css.includes(`@import`)).toBe(false)
}

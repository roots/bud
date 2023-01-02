import {describe, expect, it} from 'vitest'

import parsePort from './parsePort.js'

describe(`parsePort`, () => {
  it(`should parse string port`, () => {
    expect(parsePort(`3000`)).toBe(`:3000`)
  })
  it(`should parse integer port`, () => {
    expect(parsePort(3000)).toBe(`:3000`)
  })
  it(`should not parse default string ports`, () => {
    expect(parsePort(`80`)).toBe(``)
    expect(parsePort(`8080`)).toBe(``)
  })
  it(`should not parse default number ports`, () => {
    expect(parsePort(80)).toBe(``)
    expect(parsePort(8080)).toBe(``)
  })
})

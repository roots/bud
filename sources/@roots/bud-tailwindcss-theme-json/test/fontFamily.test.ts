import {describe, expect, it} from 'vitest'

import {fontFamily} from '../src/tailwind/index.js'

const mockFontFamily: fontFamily.TailwindFontFamily = {
  sans: [`mOCK-SANS`, `SANS-MOCK`],
  serif: `mock-serif`,
}

describe(`themeJson tailwind adapter`, () => {
  it(`transforms fontFamily`, () => {
    const mockfontFamilyRef = {...mockFontFamily}

    expect(fontFamily.transform(mockFontFamily)).toStrictEqual([
      {
        fontFamily: `mOCK-SANS,SANS-MOCK`,
        name: `MOCK-SANS`,
        slug: `sans`,
      },
      {
        fontFamily: `mock-serif`,
        name: `Mock-serif`,
        slug: `serif`,
      },
    ])

    expect(mockFontFamily).toStrictEqual(mockfontFamilyRef)
  })
})

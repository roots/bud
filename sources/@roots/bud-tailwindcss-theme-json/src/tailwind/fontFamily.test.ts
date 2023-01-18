import {describe, expect, it} from 'vitest'

import {fontFamily} from './index.js'

const mockFontFamily: fontFamily.TailwindFontFamily = {
  sans: [`mOCK-SANS`, `SANS-MOCK`],
  serif: `mock-serif`,
}

describe(`themeJson tailwind adapter`, () => {
  it(`transforms fontFamily`, () => {
    const mockfontFamilyRef = {...mockFontFamily}

    expect(fontFamily.transform(mockFontFamily)).toStrictEqual([
      {
        name: `MOCK-SANS`,
        slug: `sans`,
        fontFamily: `mOCK-SANS,SANS-MOCK`,
      },
      {
        name: `Mock-serif`,
        slug: `serif`,
        fontFamily: `mock-serif`,
      },
    ])

    expect(mockFontFamily).toStrictEqual(mockfontFamilyRef)
  })
})

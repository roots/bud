import {describe, expect, it} from 'vitest'

import {fontSize} from './index.js'

const mockFontSize: fontSize.TailwindSize = {
  lg: `1.25rem`,
  xl: [`1.5rem`, `2rem`],
}

describe(`themeJson tailwind adapter`, () => {
  it(`transforms fontSize`, () => {
    const mockfontSizeRef = {...mockFontSize}

    expect(fontSize.transform(mockFontSize)).toStrictEqual([
      {
        name: `lg`,
        slug: `lg`,
        size: `1.25rem`,
      },
      {
        name: `xl`,
        slug: `xl`,
        size: `1.5rem`,
      },
    ])

    expect(mockFontSize).toStrictEqual(mockfontSizeRef)
  })
})

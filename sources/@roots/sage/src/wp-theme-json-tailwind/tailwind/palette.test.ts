import {describe, expect, it} from 'vitest'

import {palette} from './index.js'

const mockPalette: palette.TailwindColors = {
  blue: {
    shade: {
      hue: {
        '50': `#add8e6`,
      },
    },
    group: {
      sky: `#87ceeb`,
    },
  },
  tomato: `#ff4500`,
}

describe(`themeJson tailwind adapter`, () => {
  it(`transformsPalette`, () => {
    const mockPaletteRef = {...mockPalette}

    expect(palette.transform(mockPalette)).toStrictEqual([
      {
        name: `Blue Shade Hue 50`,
        slug: `blue-shade-hue-50`,
        color: `#add8e6`,
      },
      {
        name: `Blue Group Sky`,
        slug: `blue-group-sky`,
        color: `#87ceeb`,
      },
      {
        name: `Tomato`,
        slug: `tomato`,
        color: `#ff4500`,
      },
    ])

    expect(mockPalette).toEqual(mockPaletteRef)
  })
})

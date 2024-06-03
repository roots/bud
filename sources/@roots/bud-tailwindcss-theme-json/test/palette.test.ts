import {describe, expect, it} from 'vitest'

import {palette} from '../src/tailwind/index.js'

const mockPalette: palette.TailwindColors = {
  blue: {
    group: {
      sky: `#87ceeb`,
    },
    shade: {
      hue: {
        '50': `#add8e6`,
      },
    },
  },
  tomato: `#ff4500`,
}

describe(`themeJson tailwind adapter`, () => {
  it(`transformsPalette`, () => {
    const mockPaletteRef = {...mockPalette}

    expect(palette.transform(mockPalette)).toMatchSnapshot()

    expect(mockPalette).toEqual(mockPaletteRef)
  })
})

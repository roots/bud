import * as tailwind from '@roots/sage/wp-theme-json/tailwind'

describe(`themeJson tailwind adapter`, () => {
  const mockPalette: tailwind.palette.TailwindColors = {
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

  it(`transformsPalette`, () => {
    expect(tailwind.palette.transform(mockPalette)).toStrictEqual([
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
  })
})

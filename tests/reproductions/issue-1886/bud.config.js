export default async bud =>
  bud.minimize().imagemin.addPreset(`jpeg`, {
    options: {
      encodeOptions: {
        jpeg: {
          quality: 75,
        },
      },
    },
  })

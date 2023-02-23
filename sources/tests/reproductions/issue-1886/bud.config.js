export default async bud =>
  bud
    .persist(false)
    .minimize()
    .imagemin.addPreset(`jpeg`, {
      options: {
        encodeOptions: {
          jpeg: {
            quality: 75
          },
        },
      },
    })
    .addPreset(`webp@50`, {
      options: {
        encodeOptions: {
          webp: {quality: 50},
        },
      },
    })

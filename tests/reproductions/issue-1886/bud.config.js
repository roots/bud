export default async bud =>
  bud
    .persist(false)
    .minimize()
    .imagemin.sharp.setGenerator(`jpeg`, {
      options: {
        encodeOptions: {
          jpeg: {
            quality: 75
          },
        },
      },
    })
    .setGenerator(`webp@50`, {
      options: {
        encodeOptions: {
          webp: {quality: 50},
        },
      },
    })

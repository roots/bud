export default async bud =>
  bud
    .persist(false)
    .minimize()
    .imagemin.encode(`png`, {
      quality: 50,
    })
    .addPreset(`webp`, {
      options: {
        encodeOptions: {
          webp: {quality: 50},
        },
      },
    })

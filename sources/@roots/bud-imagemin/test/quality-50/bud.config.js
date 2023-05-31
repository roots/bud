export default async bud =>
  bud.imagemin.encode(`png`, {quality: 50}).addPreset(`webp`, {
    options: {
      encodeOptions: {
        webp: {quality: 50},
      },
    },
  })

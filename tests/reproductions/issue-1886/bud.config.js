export default async bud =>
  bud
    .entry('index.js')
    .minimize()
    .imagemin.setGenerator(`jpg`, {
      options: {
        encodeOptions: {
          mozjpeg: {quality: 75},
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

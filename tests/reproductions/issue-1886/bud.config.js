export default async bud =>
  bud
    .entry('index.js')
    .minimize()
    .imagemin.setGenerator(`jpg`, `mozjpeg`, {})
    .setGenerator(`webp@50`, `webp`, {quality: 50, near_lossless: 50})

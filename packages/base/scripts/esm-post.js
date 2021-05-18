import {
  createReadStream,
  createWriteStream,
  unlinkSync,
} from 'fs'
import glob from 'glob'
import replaceStream from 'replacestream'

const TARGET = `${process.argv[2]}/lib/esm/**/*.js`

glob(TARGET, (_, filePaths) =>
  filePaths.forEach(filePath => {
    createReadStream(filePath)
      .pipe(
        replaceStream(/from '(\.?\.\/[^']*)'/g, "from '$1.mjs'"),
      )
      .pipe(
        replaceStream(
          /sourceMappingURL=(.*).js/g,
          'sourceMappingURL=$1.mjs',
        ),
      )
      .pipe(createWriteStream(filePath.replace('.js', '.mjs')))
      .on('close', () => unlinkSync(filePath))
  }),
)

const MAP = `${process.argv[2]}/lib/esm/**/*.js.map`

glob(MAP, (_, filePaths) =>
  filePaths.forEach(filePath => {
    createReadStream(filePath)
      .pipe(replaceStream(/"file":"(.*).js"/, '"file":"$1.mjs"'))
      .pipe(
        createWriteStream(
          filePath.replace('.js.map', '.mjs.map'),
        ),
      )
      .on('close', () => unlinkSync(filePath))
  }),
)

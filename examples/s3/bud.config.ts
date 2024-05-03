import {bud} from '@roots/bud'

bud
  .html()
  .when(bud.isProduction, bud =>
    bud.setPublicPath(
      `https://bud-js-tests.s3.us-west-2.amazonaws.com/examples/s3/`,
    ),
  )
  .fs.setCredentials({
    accessKeyId: bud.env.get(`AWS_ACCESS_KEY_ID`),
    secretAccessKey: bud.env.get(`AWS_SECRET_ACCESS_KEY`),
  })
  .setRegion(`us-west-2`)
  .setBucket(`bud-js-tests`)
  .upload({destination: `examples/s3`})

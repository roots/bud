export default async bud => {
  bud.entry({app: [`app.js`, `app.css`]})
  bud.fs.s3.config.set(`credentials`, {
    accessKeyId: bud.env.get(`AWS_ACCESS_KEY_ID`),
    secretAccessKey: bud.env.get(`AWS_SECRET_ACCESS_KEY`),
  })
  bud.fs.s3.config.set(`bucket`, bud.env.get(`S3_BUCKET`))
  bud.fs.s3.config.set(`region`, bud.env.get(`S3_REGION`))
  bud.fs.upload({
    destination: `assets/`,
    keep: 10,
    source: `dist/`,
  })
}

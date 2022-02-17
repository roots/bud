module.exports = async app => {
  app
    .entry({
      app: {
        import: '**/app.{js,css}',
        dependOn: ['react'],
      },
      react: ['react'],
    })
    .copy(['src/images/**/*'])
}

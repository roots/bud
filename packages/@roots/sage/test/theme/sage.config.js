// @ts-check
module.exports = ({entry}) =>
  entry({
    app: ['{scripts,styles}/app.{js,css}'],
    editor: ['{scripts,styles}/editor.{js,css}'],
    customizer: ['scripts/customizer.js'],
  });

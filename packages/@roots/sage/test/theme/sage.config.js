// @ts-check
const {sage} = require('@roots/sage');

sage
  .entry({
    app: ['{scripts,styles}/app.{js,css}'],
    editor: ['{scripts,styles}/editor.{js,css}'],
    customizer: ['scripts/customizer.js'],
  })
  .run();

// @ts-check
const {sage} = require('@roots/sage');
const {profile} = require('console');
const {inspect} = require('util');

sage.entry({
  app: ['{scripts,styles}/app.{js,css}'],
  editor: ['{scripts,styles}/editor.{js,css}'],
  customizer: ['scripts/customizer.js'],
});

sage.run();

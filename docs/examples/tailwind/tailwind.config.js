module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    layers: ['utilities'],
    content: ['./src/app.html'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

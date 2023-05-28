export default {
  root: true,
  extends: ['@roots/eslint-config'],
  rules: {
    'no-console': ['error', {allow: ['warn', 'error']}],
  },
}

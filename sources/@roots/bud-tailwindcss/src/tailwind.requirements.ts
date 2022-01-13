export const verify = async () => {
  try {
    require.resolve('@roots/bud-postcss')
    require.resolve('tailwindcss')
  } catch (e) {
    return false
  }

  return true
}

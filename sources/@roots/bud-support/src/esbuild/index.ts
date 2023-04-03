let esbuild: typeof import('esbuild-wasm')

export const getImplementation = async () => {
  if (esbuild) return esbuild
  try {
    esbuild = await import(`esbuild`)
  } catch (err) {
    esbuild = await import(`esbuild-wasm`)
  }

  return esbuild
}

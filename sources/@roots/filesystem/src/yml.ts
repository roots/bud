export const read = async (file: string): Promise<any> => {
  const {load} = await import(`js-yaml`)
  const read = await import(`fs-jetpack/lib/read.js`)

  const source = await read.async(file, `utf8`)
  return load(source)
}

export const write = async (file: string, data: any): Promise<void> => {
  const {dump} = await import(`js-yaml`)
  const write = await import(`fs-jetpack/lib/write.js`)

  const source = dump(data, {skipInvalid: true})
  await write.async(file, source)
}

export const parse = async (source: string) => {
  const {load} = await import(`js-yaml`)
  return load(source)
}

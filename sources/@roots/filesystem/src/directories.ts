import * as fs from './filesystem.js'

let directories = new Map<string, fs.FS>([
  [`basedir`, fs.cwd(process.cwd()) as unknown as fs.FS],
])

export const get = (label: string): fs.FS => {
  if (!has(label))
    throw new Error(`No directory found for label: ${label}`)

  return directories.get(label)
}

export const set = (label: string, path: string): void => {
  directories.set(label, fs.cwd(path) as unknown as fs.FS)
}

export const clear = (): void => {
  directories.clear()
}

export const has = (label: string): boolean => {
  return directories.has(label)
}

export const unset = (label: string): void => {
  directories.delete(label)
}

export const all = (): Map<string, fs.FS> => {
  return directories
}

export const count = (): number => {
  return directories.size
}

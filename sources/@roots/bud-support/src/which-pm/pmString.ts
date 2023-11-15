import type { Responses } from "./index.js"

export const parse = (
  pmString?: string,
): Responses => {
  if (!pmString) return false

  if (pmString.match(/yarn(\/|@)(3|4).*/)) return `yarn`
  if (pmString.includes(`yarn`)) return `yarn-classic`
  if (pmString.includes(`bun`)) return `bun`
  if (pmString.includes(`npm`)) return `npm`
  if (pmString.includes(`pnpm`)) return `pnpm`

  return false
}

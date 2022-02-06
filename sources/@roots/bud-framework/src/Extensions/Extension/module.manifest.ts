/**
 * Interface extensions service relies on in order to
 * recognize a package as a bud extension
 *
 * @public
 */
export interface BudManifest {
  name: string
  bud?: {type?: string; peers?: Array<string>}
}

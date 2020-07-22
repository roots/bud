/**
 * Fabs: like noop but fab.
 */
const fab: Fab = {
  false: () => false,
  true: () => true,
  undefined: () => undefined,
  null: () => null,
}

export {fab}

import type {Fab} from '.'

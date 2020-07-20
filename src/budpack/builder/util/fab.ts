type Fab = {
  false: () => boolean,
  true: () => boolean,
  undefined: () => undefined,
  null: () => null,
}

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

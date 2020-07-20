declare type Fab = {
    false: () => boolean;
    true: () => boolean;
    undefined: () => undefined;
    null: () => null;
};
/**
 * Fabs: like noop but fab.
 */
declare const fab: Fab;
export { fab };

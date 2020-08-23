declare type ShortCircuit = () => any;
/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
declare const shortCircuit: ShortCircuit;
export { shortCircuit };
export type { ShortCircuit };
//# sourceMappingURL=shortCircuit.d.ts.map
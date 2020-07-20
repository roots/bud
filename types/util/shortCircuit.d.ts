/**
 * JSON.stringify replacement function
 *
 * Prevents circular references in JSON from looping
 */
declare const shortCircuit: ShortCircuit;
export { shortCircuit };
export declare type ShortCircuit = () => any;

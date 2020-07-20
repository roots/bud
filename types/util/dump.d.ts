/**
 * Dump a prettified, syntax-highlighted object
 *
 * @type {Dump}
 * @param {Object} obj - object to inspect
 */
declare const dump: (obj: Object) => never;
export { dump };
export declare type Dump = (obj: Object) => void;

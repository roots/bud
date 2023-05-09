import json5 from 'json5';
import stringify from 'safe-json-stringify';
export interface WriteOptions {
    replacer?: ((this: any, key: string, value: any) => any) | null;
    space?: string | number | null;
}
export declare const read: (path: string) => Promise<any>;
export declare const parse: typeof json5.parse;
export declare const write: (path: string, data: any, options?: WriteOptions) => Promise<void>;
declare const _default: {
    read: (path: string) => Promise<any>;
    parse: typeof json5.parse;
    write: (path: string, data: any, options?: WriteOptions) => Promise<void>;
    stringify: typeof stringify;
};
export default _default;
export { stringify };
//# sourceMappingURL=json.d.ts.map
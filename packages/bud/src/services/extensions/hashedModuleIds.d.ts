import type { Module } from '@roots/bud-typings';
import { HashedModuleIdsPlugin } from 'webpack';
export declare const options: Module.Options<{
    hashFunction?: string;
    hashDigest?: string;
    hashDigestLength?: number;
}>;
export declare const make: Module.Make<HashedModuleIdsPlugin, {
    hashFunction?: string;
    hashDigest?: string;
    hashDigestLength?: number;
}>;
export declare const when: Module.When;
//# sourceMappingURL=hashedModuleIds.d.ts.map
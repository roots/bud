export declare type WordPressScopePkg = `@wordpress/${string}`;
export declare type WordPressProvidedPackages = WordPressScopePkg | 'lodash' | 'react' | 'react-dom' | 'jquery';
export interface Externals {
    window: ['wp', string];
    enqueue: string;
}
export declare type PackageMapEntry = [string, Record<string, string>];
/**
 * Is pkg string a wordpress window var match
 */
export declare const isProvided: (packageName: string) => boolean;
/**
 * Transform pkg string request
 */
export declare const transform: (packageName: string) => any;
//# sourceMappingURL=wordpressPkgs.d.ts.map
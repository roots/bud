export declare type WordPressScopePkg = `@wordpress/${string}`;
export declare type PkgName = WordPressScopePkg | 'lodash' | 'react' | 'react-dom' | 'jquery';
/**
 * Is pkg string a wordpress window var match
 */
declare const isProvided: (pkg: string) => boolean;
/**
 * Transform pkg string request
 */
declare const transform: (pkg: PkgName) => {
    window: string;
    enqueue: string;
} | {
    window: string[];
    enqueue: string;
};
export { isProvided, transform };
//# sourceMappingURL=wordpressPkgs.d.ts.map
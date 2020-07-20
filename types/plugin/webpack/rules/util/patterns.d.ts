/**
 * loader test regex patterns
 */
export type pattern = {
    sass: RegExp;
    sassModule: RegExp;
    css: RegExp;
    cssModule: any;
};
export namespace patterns {
    export const js: RegExp;
    export const scss: RegExp;
    export const scssModule: RegExp;
    export const css: RegExp;
    export const cssModule: RegExp;
    export const svg: RegExp;
    export const font: RegExp;
    export const vendor: RegExp;
    export const image: RegExp;
}

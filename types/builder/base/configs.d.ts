/**
 * Project configuration files.
 */
export type configs = {
    babel: (boolean | string);
    eslint: (boolean | string);
    postCss: (boolean | string);
};
/**
 * Returns absolute path to a project config file
 */
export type config = (arg0: any, arg1: {
    string;
}) => {
    filePath: {
        string;
    };
};
/**
 * Returns a boolean representing if a file can be located in the project root.
 */
export type hasConfig = (arg0: any, arg1: string) => {
    boolean;
};
export namespace configs {
    export const babel: string | boolean;
    export const eslint: string | boolean;
    export const postCss: string | boolean;
}
//# sourceMappingURL=configs.d.ts.map
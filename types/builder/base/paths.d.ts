/**
 * Paths
 */
export type paths = {
    /**
     * - project root path
     */
    framework: string;
    /**
     * - module root path
     */
    project: string;
    /**
     * - project src path
     */
    src: string;
    /**
     * - project dist path
     */
    dist: string;
    /**
     * - project public path
     */
    public: string;
};
/**
 * Current working dir.
 */
export type projectDir = string;
/**
 * Framework dir.
 */
export type frameworkDir = string;
/**
 * Paths
 * @typedef  {object} paths
 * @property {string} framework - project root path
 * @property {string} project - module root path
 * @property {string} src - project src path
 * @property {string} dist - project dist path
 * @property {string} public - project public path
 */
export const paths: {
    project: string;
    framework: string;
    src: string;
    dist: string;
    public: string;
};
//# sourceMappingURL=paths.d.ts.map
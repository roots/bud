import * as logger from '@repo/logger';
interface Options {
    name: string;
    with: 'yarn' | 'npm';
    dist?: string;
}
/**
 * This class is used to represent an example project being used
 * as the subject of an integration test.
 *
 * @example
 * ```ts
 *  project = new Project({
 *    name: 'basic',
 *    with: 'yarn',
 *  })

 *  await project.setup()
 *
 *  ...
 *  expect(project.packageJson).toMatchSnapshot()
 *  expect(project.assets['main.js'].length).toBeGreaterThan(10)
 *  ...
 * ```
 *
 * @internal
 */
export declare class Project {
    options: Options;
    name: string;
    mode: 'dev' | 'production';
    storage: string;
    assets: {};
    entrypoints: {
        [key: string]: {
            js: Array<string>;
            css: Array<string>;
            dependencies?: Array<string>;
        };
    };
    manifest: {
        [key: string]: any;
    };
    modules: {
        chunks: {
            byName: any;
            bySource: any;
        };
    };
    packageJson: Record<string, any>;
    /**
     * dir
     * @public
     */
    dir: string;
    /**
     * logger
     * @public
     */
    logger: typeof logger.logger;
    constructor(options: Options);
    /**
     * @public
     * @decorator `@bind`
     */
    setup(): Promise<Project>;
    $(bin: string, flags: Array<string>): Promise<void>;
    yarnInstall(): Promise<void>;
    npmInstall(): Promise<void>;
    install(): Promise<void>;
    build(): Promise<void>;
    /**
     * @public
     * @decorator `@bind`
     */
    projectPath(file?: string): string;
    /**
     * @public
     * @decorator `@bind`
     */
    readJson(file: string): Promise<any>;
    /**
     * @public
     * @decorator `@bind`
     */
    setPackageJson(): Promise<void>;
    /**
     * @public
     * @decorator `@bind`
     */
    setManifest(): Promise<void>;
    /**
     * @public
     * @decorator `@bind`
     */
    setAssets(): Promise<void>;
    /**
     * @public
     * @decorator `@bind`
     */
    setEntrypoints(): Promise<void>;
    /**
     * @public
     * @decorator `@bind`
     */
    setModules(): Promise<void>;
}
export {};
//# sourceMappingURL=project.d.ts.map
/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
export function Runner({ compiler, webpackConfig, config }: {
    compiler: any;
    webpackConfig: any;
    config: any;
}): JSX.Element;
export namespace Runner {
    export namespace propTypes {
        export const compiler: import("prop-types").Requireable<object>;
        export const config: import("prop-types").Requireable<object>;
    }
}
//# sourceMappingURL=Runner.d.ts.map
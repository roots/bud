/**
 * Configure BrowserSync.
 */
export type sync = (arg0: {
    enabled: {
        boolean;
    };
    proxy: {
        string;
    };
    port: {
        number;
    };
    host: {
        string;
    };
}) => {
    bud: import('./../index');
};
/**
 * Configure BrowserSync.
 * @example
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * @typedef {function ({enabled: {boolean}, proxy: {string}, port: {number}, host: {string}}) => {bud: import('./../index')}} sync
 * @param   {{enabled: {boolean}, proxy: {string}, port: {number}, host: {string}}} options - browserSync options
 * @param   {boolean=} options.enabled - true to enable (default: !bud.inProduction)
 * @param   {string=}  options.proxy - live reload proxy (default: null)
 * @param   {number=}  options.port - live reload port (default: 3000)
 * @param   {string=}  options.host - live reload host (default: 'localhost')
 * @return  {import('./../index')} bud
 */
export function sync(options: {
    enabled: {
        boolean;
    };
    proxy: {
        string;
    };
    port: {
        number;
    };
    host: {
        string;
    };
}): import('./../index');
//# sourceMappingURL=sync.d.ts.map
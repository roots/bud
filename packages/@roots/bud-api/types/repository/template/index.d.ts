import type { Framework } from '@roots/bud-framework';
import type { Options as HtmlOptions } from 'html-webpack-plugin';
/**
 * Enable and/or configure a generated HTML template
 *
 * @example
 * ```js
 * app.template({
 *   enabled: true, // default: true
 *   template: 'public/index.html',
 *   replace: {
 *     APP_NAME: name,
 *     APP_DESCRIPTION: description,
 *     PUBLIC_URL: app.env.get('PUBLIC_URL'),
 *   },
 * })
 * ```
 */
interface template {
    (this: Framework, userOptions?: Options): Framework;
}
/**
 * Template options
 */
interface Options extends HtmlOptions {
    /**
     * Explicitly enable or disable html templating.
     */
    enabled?: boolean;
    /**
     * Path to an HTML template to use. If none is supplied
     * one is provided as a default.
     */
    template?: string;
    /**
     * Template variable names are used as keys.
     * Each key is associated with a replacement value.
     */
    replace?: {
        [key: string]: string;
    };
}
declare const template: template;
export { template };
//# sourceMappingURL=index.d.ts.map
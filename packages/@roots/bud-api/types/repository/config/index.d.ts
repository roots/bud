import type { Configuration, Framework } from '@roots/bud-framework';
/**
 * Modify the {@link Framework} baseline config.
 *
 * @remarks
 *
 * Values defined in this function are more likely to be overwritten by {@link Framework} hooks, etc.
 * If there is a more direct way to make your change it is better to not use this function.
 *
 * Still, this function provides utility for certain use cases.
 *
 * @example
 * ```ts
 * app.config(config: Framework.Config)
 * ```
 *
 * @return {ThisParameterType<typeof Framework>} The modified {@link Framework} instance.
 */
interface config {
    (
    /**
     * @param {Framework} framework - The framework instance.
     */
    this: Framework, 
    /**
     * @param {Configuration} config - The framework configuration.
     */
    overrides: Partial<Configuration>): Framework;
}
declare const config: config;
export { config };
//# sourceMappingURL=index.d.ts.map
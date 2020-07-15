/**
 * Get environment variable value.
 */
export type env = () => {
    string;
};
/**
 * Get environment variable value.
 * @example bud.env('APP_NAME')
 * @typedef {function () => {string} env
 * @param   {string} key
 * @return  {string}
 */
export function env(key: string): string;
//# sourceMappingURL=env.d.ts.map
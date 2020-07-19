/**
 * Automatically load modules instead of needing to import them.
 * @example bud.auto({jquery: ['$', 'window.jQuery']})
 * @param   {{[key: string]: {modules: string[]}}} options
 * @return  {typeof import('./../index')} bud */
export function auto(options: {
    [key: string]: {
        modules: string[];
    };
}): typeof import('./../index');

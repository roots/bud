/**
 * Bud plugin factory.
 */
export type budPluginFactory = () => {
    object;
};
/**
 * : { false: {function () => {boolean}} }} fab
 */
export type fab = any;
/**
 * Bud plugin factory.
 *
 * @typedef {function () => {object}} budPluginFactory
 * @param   {bud}      bud
 * @return  {factory}
 */
export function budPluginFactory(bud: any): {
    bud: any;
    new: new () => any;
    build: () => void;
    bindPluginProps: () => {
        void;
    };
    ensurePluginProp: (arg0: any, arg1: string, arg2: any, arg3: {
        any;
    }) => {
        void;
    };
    instantiatePlugin: () => {
        void;
    };
};

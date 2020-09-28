import Bud from '@roots/bud-types';
/**
 * Bud loader object
 */
export default class {
    bud: Bud;
    query: Bud.Use.Property;
    ident: Bud.Use.Property;
    loader: Bud.Use.Property;
    options: Bud.Use.Property;
    constructor(bud: Bud, module: Bud.Use.Module);
    get(): Bud.Use.Module;
    get webpack(): Bud.Use.Product;
    set(module: Bud.Use.Module): void;
}

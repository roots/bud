/**
 * Manufactures a RuleSetRule
 *
 * @typedef {Build.Rule.Rule}
 * @yields {Webpack.RuleSetRule}
 */
export default class Rule {
    bud: Framework.Bud;
    enforce?: Build.Rule.Enforce;
    exclude?: Build.Rule.Conditional;
    include?: Build.Rule.Conditional;
    issuer?: Build.Rule.Conditional;
    oneOf?: Build.Rule.OneOf;
    options?: Build.Rule.Query;
    parser?: Build.Rule.Parser;
    resolve?: Build.Rule.Resolve;
    sideEffects?: boolean;
    query?: Build.Rule.Query;
    type?: Build.Rule.Type;
    resource?: Build.Rule.Conditional;
    resourceQuery?: Build.Rule.Conditional;
    compiler?: Build.Rule.Conditional;
    rules?: Build.Rule.OneOf;
    test?: Build.Rule.Conditional;
    use?: Build.Loader;
    constructor(bud: Framework.Bud, rule: unknown);
    /**
     * Map to class props.
     */
    register(rule: unknown): this;
    getProp(prop: string): Build.Rule.Property<unknown>;
    setProp(prop: string, value: Build.Rule.Property<unknown>): this;
    get(): Build.Rule.MakeSet;
    make(): Build.Rule.Product;
}
//# sourceMappingURL=index.d.ts.map
import { Container } from '@roots/container';
import Base from './Base';
import { Framework, Index, MaybeCallable } from '@roots/bud-typings';
export default abstract class extends Base implements Framework {
    providers: Framework.Container;
    services: Framework.Container;
    store: Framework.Container;
    use: Framework.Use;
    when: Framework.When;
    constructor(providers: Framework.Index<any>);
    init(): this;
    bootstrap(): void;
    /**
     * Lifecycle: registration
     */
    register(): void;
    boot(): void;
    get(): this;
    access<I = unknown>(value: MaybeCallable<I>): I;
    makeContainer(repository?: Index<any>): Container;
    pipe(fns: CallableFunction[]): this;
}
//# sourceMappingURL=index.d.ts.map
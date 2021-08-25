import { Service as Base } from '@roots/bud-framework';
import { Ink } from '@roots/bud-support';
declare class Dashboard extends Base {
    name: string;
    instance: Ink.Instance;
    register(): void;
    booted(): void;
    /**
     * @decorator `@bind`
     */
    run(): void;
    /**
     * @decorator `@bind`
     */
    renderError(body: string, title: string): void;
    /**
     * @decorator `@bind`
     */
    render(Component: any, title?: string): void;
}
export { Dashboard };
//# sourceMappingURL=index.d.ts.map
/// <reference types="webpack" />
import type { Webpack, Framework } from '@roots/bud-typings';
import { Service } from '@roots/bud-support';
export default abstract class extends Service<Framework> {
    abstract get(): Webpack.Configuration['mode'];
    abstract set(mode: Webpack.Configuration['mode']): void;
    abstract is(check: Webpack.Configuration['mode']): boolean;
}
//# sourceMappingURL=Service.d.ts.map
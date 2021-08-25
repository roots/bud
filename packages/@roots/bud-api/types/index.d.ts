/**
 * ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/bud-api` package provides the {@link Api Api Service}
 *
 * @packageDocumentation
 */
import { Api } from './Api';
import { Repository } from './repository';
declare module '@roots/bud-framework' {
    interface Framework extends Repository {
    }
}
export { Api, Repository };
//# sourceMappingURL=index.d.ts.map
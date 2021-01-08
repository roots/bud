import { Service } from '@roots/bud-support';
import type { Framework, Server } from '@roots/bud-typings';
/**
 * ## Server service provider.
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service<Framework> {
    _instance: Server.Instance;
    _running: boolean;
    get instance(): Server.Instance;
    set instance(server: Server.Instance);
    get running(): boolean;
    set running(running: boolean);
    get config(): Framework.Container<Framework.Server.Options>;
}
//# sourceMappingURL=Service.d.ts.map
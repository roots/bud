/// <reference types="webpack" />
import Service from './Service';
import type { Framework, Server } from '@roots/bud-typings';
/**
 * ## bud.server
 *
 * Express development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Server {
    register(): void;
    injectHmr(): void;
    run(compiler: Framework.Webpack.Compiler): this;
}
//# sourceMappingURL=index.d.ts.map
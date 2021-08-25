/**
 * `@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/sage` extension preconfigures the Bud Framework for the [Sage WordPress theme](https://git.io/vlxDC).
 *
 * @packageDocumentation
 */
import {sage} from './sage'
declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      '@roots/sage': sage
    }
  }
}
export declare const name: string | number,
  boot: import('@roots/bud-framework/types/Module').Module.Boot
//# sourceMappingURL=index.d.ts.map

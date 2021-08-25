import type { Build } from '@roots/bud-framework';
import { BudPostCssExtension } from './BudPostCssExtension';
import { PostCssConfig } from './Config';
declare module '@roots/bud-framework' {
    interface Framework {
        /**
         * Configure postcss.
         */
        postcss: PostCssConfig;
    }
    namespace Framework {
        interface Extensions {
            '@roots/bud-postcss': BudPostCssExtension;
        }
        namespace Hooks {
            interface Loaders {
                postcss: Build.Loader;
            }
            interface Items {
                postcss: Build.Item;
            }
        }
    }
}
export declare const name: string | number, api: {
    postcss: PostCssConfig;
}, boot: import("@roots/bud-framework/types/Module").Module.Boot;
export { PostCssConfig };
//# sourceMappingURL=index.d.ts.map
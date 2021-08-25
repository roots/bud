/**
 * Adds Emotion to `@roots/bud`
 *
 * @packageDocumentation
 */
import { BudEmotionExtension } from './BudEmotionExtension';
declare module '@roots/bud-framework' {
    namespace Framework {
        interface Extensions {
            '@roots/bud-emotion': BudEmotionExtension;
        }
    }
}
export declare const name: string | number, boot: import("@roots/bud-framework/types/Module").Module.Boot;
//# sourceMappingURL=index.d.ts.map
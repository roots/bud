import type { Bud } from '@roots/bud';
import type { Plugin } from '@roots/bud-framework';
import { dependencyExtractionPlugin } from '@roots/bud-dependency-extraction-webpack-plugin';
import { sass } from '@roots/bud-sass';
import { eslint } from '@roots/bud-eslint';
import { stylelint } from '@roots/bud-stylelint';
import { purgecss } from '@roots/bud-purgecss';
declare type SageFeature = typeof purgecss | typeof eslint | typeof stylelint | typeof dependencyExtractionPlugin | typeof sass;
declare type SageFeatures = Plugin[];
declare const sage: Bud;
declare type Sage = typeof sage;
export { sage, Sage, SageFeature, SageFeatures };
//# sourceMappingURL=index.d.ts.map
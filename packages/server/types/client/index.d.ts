import {Configuration} from 'webpack'
interface InjectionProps {
  entrypoints: Configuration['entry']
}
/**
 * Inject webpack entrypoints with client HMR handling script(s).
 */
export declare type InjectClient = (
  props: InjectionProps,
) => Configuration['entry']
export declare const injectClient: InjectClient
export {}
//# sourceMappingURL=index.d.ts.map

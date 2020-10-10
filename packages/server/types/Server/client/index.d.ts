import {Configuration} from 'webpack'
declare const injectClient: InjectClient
export {injectClient}
/**
 * Inject webpack entrypoints with client HMR handling script(s).
 */
declare interface InjectionProps {
  entrypoints: Configuration['entry']
}
declare type InjectClient = (
  props: InjectionProps,
) => Configuration['entry']
//# sourceMappingURL=index.d.ts.map

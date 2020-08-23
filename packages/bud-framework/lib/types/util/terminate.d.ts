import { Loose } from '@roots/bud-typings';
declare type TerminateReturn = () => (err: Error) => void;
interface TerminateOptions extends Loose {
    dump?: boolean;
    timeout?: number;
}
declare type Terminate = (options?: TerminateOptions) => TerminateReturn;
/**
 * Terminate CLI execution
 */
declare const terminate: Terminate;
export { terminate };
export type { Terminate };
//# sourceMappingURL=terminate.d.ts.map
import { FunctionComponent } from 'react';
import Compiler from '@roots/bud-compiler';
import { Server } from '@roots/bud-server';
interface ApplicationCliProps {
    name: string;
    compiler: Compiler;
    server: Server;
}
declare type ApplicationCli = FunctionComponent<ApplicationCliProps>;
declare const App: ApplicationCli;
export { App as default, ApplicationCli, ApplicationCliProps };
//# sourceMappingURL=App.d.ts.map
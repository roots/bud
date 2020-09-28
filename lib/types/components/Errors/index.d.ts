import { FunctionComponent } from 'react';
import { Compilation } from '../../hooks/useCompilation';
interface ErrorProps {
    errors: Compilation['errors'];
}
declare const Errors: FunctionComponent<ErrorProps>;
export { Errors as default };

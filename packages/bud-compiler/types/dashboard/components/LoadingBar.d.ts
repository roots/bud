import { FunctionComponent } from 'react';
interface BarProps {
    color?: string;
    backgroundColor?: string;
    percent: number;
    columns?: number;
    left?: number;
    right?: number;
    character?: string;
    rightPad?: number;
}
declare type BarComponent = FunctionComponent<BarProps>;
declare const Bar: BarComponent;
export { Bar };
//# sourceMappingURL=LoadingBar.d.ts.map
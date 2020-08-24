import { FunctionComponent } from 'react';
interface AssetInterface {
    name: string;
    emitted: boolean;
    size: number;
}
interface AssetsProps {
    build: {
        assets: AssetInterface[];
    };
    actions: {
        setFocus: (any: any) => void;
    };
}
declare const Assets: FunctionComponent<AssetsProps>;
export { Assets };
//# sourceMappingURL=Assets.d.ts.map
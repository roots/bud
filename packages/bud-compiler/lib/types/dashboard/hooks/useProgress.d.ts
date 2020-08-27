import { ProgressPlugin } from 'webpack';
import type { Bud } from '@roots/bud';
declare const useProgress: (bud: Bud) => {
    progress: ProgressPlugin;
    percentage: number;
    message: string;
};
export { useProgress };
//# sourceMappingURL=useProgress.d.ts.map
export interface Res {
    stdout?: string;
    stderr?: string;
}
export interface GitStatus {
    head: string;
    branch: string;
    status: number;
    hasError: boolean;
}
export declare type UseGit = () => GitStatus;
export declare const useGit: UseGit;
//# sourceMappingURL=useGit.d.ts.map
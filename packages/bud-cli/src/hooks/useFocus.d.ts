/// <reference types="react" />
export declare const useFocus: UseFocus.Hook;
export declare namespace UseFocus {
    interface Hook {
        (initialData?: {
            initialData: Focus;
        }): [Focus, Handler];
    }
    interface Focus {
        active: string;
        items: Items;
    }
    interface Items {
        [key: string]: boolean;
    }
    type Handler = React.Dispatch<React.SetStateAction<UseFocus.Focus>>;
}
//# sourceMappingURL=useFocus.d.ts.map
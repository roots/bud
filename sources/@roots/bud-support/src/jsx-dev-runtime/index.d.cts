import type { JSX as ReactJSX } from 'react';
export declare namespace JSX {
    type ElementType = ReactJSX.ElementType;
    interface Element extends ReactJSX.Element {
    }
    interface ElementClass extends ReactJSX.ElementClass {
    }
    interface ElementAttributesProperty extends ReactJSX.ElementAttributesProperty {
    }
    interface ElementChildrenAttribute extends ReactJSX.ElementChildrenAttribute {
    }
    type LibraryManagedAttributes<C, P> = ReactJSX.LibraryManagedAttributes<C, P>;
    interface IntrinsicAttributes extends ReactJSX.IntrinsicAttributes {
    }
    interface IntrinsicClassAttributes<T> extends ReactJSX.IntrinsicClassAttributes<T> {
    }
    interface IntrinsicElements extends ReactJSX.IntrinsicElements {
    }
}

export function dependencyExtraction(bud: any): {
    options: any;
    make: () => DependencyExtractionPlugin;
    when: () => any;
};
import DependencyExtractionPlugin from "@wordpress/dependency-extraction-webpack-plugin/build-types";

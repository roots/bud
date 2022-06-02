export const test = {
    assetNotEmpty: (project, asset) => () => {
        expect(project.assets[asset]).toMatchSnapshot();
    },
    assetDoesNotIncludeImport: (project, asset) => () => {
        expect(project.assets[asset].includes('import')).toBeFalsy();
    },
    assetMatchesSnapshot: (project, asset) => () => {
        expect(project.assets[asset]).toMatchSnapshot();
    },
    manifestMatchesSnapshot: project => () => {
        expect(project.manifest).toMatchSnapshot();
    },
};
//# sourceMappingURL=integration.js.map
import {Project} from './project'

export const test = {
  assetNotEmpty: (project: Project, asset: string) => () => {
    expect(project.assets[asset]).toMatchSnapshot()
  },
  assetDoesNotIncludeImport: (project: Project, asset: string) => () => {
    expect(project.assets[asset].includes('import')).toBeFalsy()
  },
  assetMatchesSnapshot: (project: Project, asset: string) => () => {
    expect(project.assets[asset]).toMatchSnapshot()
  },
  manifestMatchesSnapshot: (project: Project) => () => {
    expect(project.manifest).toMatchSnapshot()
  },
}

import {Project} from './project'
jest.setTimeout(120000)

export const runIntegrations = async (
  name: string,
  callback: (
    project: Record<string, Project>,
  ) => Array<[string, (key: string) => Promise<void>]>,
) => {
  describe(name, () => {
    const project: {yarn: Project; npm: Project} = {
      yarn: null,
      npm: null,
    }

    beforeAll(async () => {
      project.yarn = await new Project({
        name,
        with: 'yarn',
      }).setup()

      project.npm = await new Project({
        name,
        with: 'npm',
      }).setup()
    })

    callback(project).map(async ([name, test]) => {
      describe(name, () => {
        it(`npm`, async () => test('npm'))
        it(`yarn`, async () => test('yarn'))
      })
    })
  })
}

export const test = {
  assetNotEmpty: (project: Record<string, Project>, asset: string) => {
    return async (key: string) => {
      expect(project[key].assets[asset]).toMatchSnapshot()
    }
  },

  assetDoesNotIncludeImport: (
    project: Record<string, Project>,
    asset: string,
  ) => {
    return async (key: string) => {
      expect(project[key].assets[asset].includes('import')).toBeFalsy()
    }
  },

  assetMatchesSnapshot: (
    project: Record<string, Project>,
    asset: string,
  ) => {
    return async (key: string) => {
      expect(project[key].assets[asset]).toMatchSnapshot()
    }
  },

  manifestMatchesSnapshot: (project: Record<string, Project>) => {
    return async (key: string) => {
      expect(project[key].manifest).toMatchSnapshot()
    }
  },
}

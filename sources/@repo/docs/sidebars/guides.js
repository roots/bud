module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Overview',
      link: {
        type: 'doc',
        id: 'overview/index',
      },
      items: [
        'overview/what-is-bud',
        'overview/installation',
        'overview/requirements',
      ],
    },
    {
      type: 'category',
      label: 'Getting started',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        'getting-started/configure',
        'getting-started/build',
        'getting-started/develop',
        'getting-started/extend',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'doc',
        id: 'config/index',
      },
      items: [
        'config/zero-config',
        'config/cli-config',
        {
          type: 'category',
          label: 'File config',
          link: {
            type: 'doc',
            id: 'config/file-config/index',
          },
          items: [
            'config/file-config/env',
            'config/file-config/typescript',
            'config/file-config/static',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'General use',
      link: {
        type: 'doc',
        id: 'general-use/index',
      },
      items: [
        'general-use/dynamic-imports',
        'general-use/hashing',
        'general-use/optimizing',
        'general-use/multi-compiler',
        'general-use/transpiler-sources',
      ],
    },
    {
      type: 'category',
      label: 'CLI',
      link: {
        type: 'doc',
        id: 'cli/index',
      },
      items: [
        'cli/bud-build',
        'cli/bud-clean',
        'cli/bud-dev',
        'cli/bud-doctor',
      ],
    },
    'node-api',
    {
      type: 'category',
      label: 'Extending',
      link: {
        type: 'doc',
        id: 'extending/index',
      },
      items: ['extending/decorators'],
    },
  ],
}

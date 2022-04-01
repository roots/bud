module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Overview',
      link: {
        type: 'doc',
        id: 'overview/index',
      },
      items: ['overview/installation', 'overview/requirements'],
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
    'paths',
    'node-api',
  ],
}

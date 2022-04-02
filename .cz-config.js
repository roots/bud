module.exports = {
  types: [
    {value: ':sparkles: feat', name: '✨ feat\tadd feature'},
    {value: ':tada: pkg', name: '🎉 feat\tadd package'},
    {value: ':label: types', name: '🏷️  types\tadd or update type'},
    {value: ':package: deps', name: '📦 deps\tmodify dependencies'},
    {value: ':nailcare: style', name: '💅 style\tcode formatting'},
    {value: ':recycle: improve', name: '♻️  improve\timprove code'},
    {
      value: ':roller_skate: improve',
      name: '🛼 improve\tremove code',
    },
    {value: ':ambulance: fix', name: '🚑 fix\tcritical fix'},
    {value: ':bug: fix', name: '🐛 fix\tminor fix'},
    {value: ':test_tube: test', name: '🧪 test\tadd or update test'},
    {value: ':books: docs', name: '📚 docs\tadd or update documentation'},
    {
      value: ':hammer: dev',
      name: '🔨 dev\tadd or update config files or dev scripts',
    },
    {value: ':rewind: revert', name: '⏪️ revert\trevert commit'},
    {value: ':merge: merge', name: '🔀 merge\tmerge branch'},
    {value: ':construction: wip', name: '🚧 wip\twork in progress'},
  ],

  scopes: [
    {name: 'major'},
    {name: 'minor'},
    {name: 'patch'},
    {name: 'none'},
  ],

  scopeOverrides: {},
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body'],
  subjectLimit: 100,
}

await import('./components/main').then(({main}) => main())

if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error)

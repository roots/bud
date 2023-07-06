export default async app => {
  app
    .html({template: app.path('public/index.html')})
    .entry('app', 'app.js')
}

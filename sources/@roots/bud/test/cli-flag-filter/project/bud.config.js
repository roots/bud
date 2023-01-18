export default async bud => {
  await bud.make({label: `project-a`, basedir: bud.path(`project-a`)})
  await bud.make({label: `project-b`, basedir: bud.path(`project-b`)})
}

export default async bud => {
  await bud.make({basedir: bud.path(`project-a`), label: `project-a`})
  await bud.make({basedir: bud.path(`project-b`), label: `project-b`})
}

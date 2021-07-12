import project from '../../../../repo'

const Sponsors = () => `\
## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

${project.sponsors
  .map(
    sponsor => `\
<a href="${sponsor.url}">
  <img src="${sponsor.image}" alt="${sponsor.title}" width="200" height="150" />
</a>`,
  )
  .join('\n')}
`

export default Sponsors

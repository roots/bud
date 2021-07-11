import React from 'react'
import project from '../../../repo'

export const Sponsors = () => (
  <>
    <h2>Bud sponsors</h2>

    <p>
      Help support our open-source development efforts by
      [becoming a patron](https://www.patreon.com/rootsdev).
    </p>

    {project.sponsors.map((sponsor, id) => (
      <span
        key={
          id
        }>{`<a href="${sponsor.url}"><img src="${sponsor.image}" alt="${sponsor.title}" width="200" height="150"/></a>`}</span>
    ))}
  </>
)

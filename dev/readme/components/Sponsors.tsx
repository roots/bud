import React from 'react'
import project from '../../../repo'

const Grid = () =>
  project.sponsors.map((sponsor, id) => (
    <span
      key={
        id
      }>{`<a href="${sponsor.url}"><img src="${sponsor.image}" alt="${sponsor.title}" width="200" height="150"/></a>`}</span>
  ))

export const Sponsors = () => (
  <>
    <h2>Sponsors</h2>

    <p>
      Help support our open-source development efforts by
      [becoming a patron](https://www.patreon.com/rootsdev).
    </p>

    <Grid />
  </>
)

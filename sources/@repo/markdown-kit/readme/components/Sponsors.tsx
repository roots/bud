import React from 'react'

export const Sponsors = (props: {sponsors: any}) => (
  <>
    <h2>Sponsors</h2>

    <p>
      Help support our open-source development efforts by [becoming a
      patron](https://www.patreon.com/rootsdev).
    </p>

    {props.sponsors.map((sponsor, id) => (
      <span
        key={id}
      >{`<a href="${sponsor.url}"><img src="${sponsor.image}" alt="${sponsor.title}" width="200" height="150"/></a>`}</span>
    ))}
  </>
)

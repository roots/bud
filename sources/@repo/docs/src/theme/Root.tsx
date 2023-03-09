import React from 'react'
import Head from '@docusaurus/Head'

function Root({ children }) {
  return (
    <>
      <Head>
        <script type="application/ld+json">{`{
           "@context": "https://schema.org",
           "@type": "WebSite",
           "url": "https://bud.js.org/",
           "name": "bud.js",
           "alternateName": "Bud"
         }`}</script>
      </Head>
      {children}
    </>
  );
}

export default Root

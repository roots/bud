/* eslint-disable simple-import-sort/imports */

import Layout from '@theme/Layout'
import React from 'react'

import {
  Features,
  Mast,
  Sponsors,
} from '@site/src/partials/index.components'

const Home = () => {
  return (
    <Layout>
      <Mast />

      {/*<Testimonials />*/}

      <Features />

      <Sponsors.Component />
    </Layout>
  )
}

export default Home

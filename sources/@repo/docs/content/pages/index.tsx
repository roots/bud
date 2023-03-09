/* eslint-disable simple-import-sort/imports */
import Layout from '@theme/Layout'
import React from 'react'

import {Features} from '@site/src/components/features'
import {Mast} from '@site/src/components/mast'
import {Sponsors} from '@site/src/components/sponsors'

const Home = () => {
  return (
    <Layout>
      <Mast />
      <Features />
      <Sponsors />
    </Layout>
  )
}

export default Home

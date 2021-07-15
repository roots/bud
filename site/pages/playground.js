import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import {Configurator} from '../src/components/config'

export default function Playground() {
  return (
    <Layout title={`Bud`} description="Frontend build tools">
      <div className="container">
        <div className="row">
          {' '}
          <div className="col padding--md">
            <h1>bud.config.js playground</h1>
          </div>
        </div>

        <div className="row">
          <Configurator />
        </div>
      </div>
    </Layout>
  )
}

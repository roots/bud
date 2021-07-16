import React, {useState} from 'react'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'

export default function Playground() {
  const [react, setReact] = useState(false)
  const [babel, setBabel] = useState(false)
  const [src, setSrc] = useState('')
  const [dist, setDist] = useState('')

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
          <>
            <div className="col col--4 padding--md">
              <form>
                <div
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    marginBottom: '2rem',
                  }}>
                  <h2>Paths</h2>

                  <label>Src dir</label>
                  <input
                    name={'src'}
                    onChange={e => setSrc(e.target.value)}
                    type="text"
                    value={src}
                  />

                  <label>Dist dir</label>
                  <input
                    name={'dist'}
                    onChange={e => setDist(e.target.value)}
                    type="text"
                    value={dist}
                  />
                </div>

                <div>
                  <h2>Extensions</h2>

                  <div>
                    <label>Babel</label>
                    <input
                      name={'babel'}
                      onChange={() => setBabel(!babel)}
                      type="checkbox"
                      value={babel}
                    />
                  </div>

                  <div>
                    <label>React</label>
                    <input
                      name={'react'}
                      onChange={() => setReact(!react)}
                      type="checkbox"
                      value={react}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="col col--8 padding--md">
              <CodeBlock className={`language-js`}>
                {`module.exports = (bud) => 
  bud
    .setPath({${[
      src ? `src: '${src}'` : null,
      dist ? `dist: '${dist}'` : null,
    ]
      .filter(Boolean)
      .join(', ')}})
    .use([${[
      babel | react ? `require('@roots/bud-babel')` : null,
      react ? `require('@roots/bud-react')` : null,
    ]
      .filter(Boolean)
      .join(', ')}])
`}
              </CodeBlock>
            </div>
          </>
        </div>
      </div>
    </Layout>
  )
}

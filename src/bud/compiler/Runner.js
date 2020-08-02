const React = require('react')
const {useEffect} = React
const {useApp, useInput} = require('ink')
const PropTypes = require('prop-types')
const notifier = require('node-notifier')
const useStdOutDimensions = require('ink-use-stdout-dimensions')
const {useWebpack} = require('./hooks/useWebpack')
const {useFocusState} = require('./hooks/useFocusState')
const {App} = require('./components/App')
const {Assets} = require('./components/Assets')
const {BrowserSync} = require('./components/BrowserSync')
const {Errors} = require('./components/Errors/index')
const {Warnings} = require('./components/Warnings/index')
const {DevServer} = require('./components/DevServer')

/**
 * Helper: Successful build
 *
 * @prop {object} build
 * @return {boolean}
 */
const successfulBuild = build =>
  !build?.errors?.length > 0 && build?.percentage == 1 && build?.assets?.length > 0

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
const Runner = ({compiler, bud}) => {
  const [width, height] = useStdOutDimensions()
  const [state, actions] = useFocusState()
  const {exit} = useApp()

  const quit = () => {
    exit()
    bud.dump()
    bud.util.termiante()
    process.exit()
  }

  useInput(input => {
    if (input == 'q') {
      quit()
    }
  })

  useEffect(() => {
    ;(!bud.features.enabled('watch') || !bud.features.enabled('hot')) &&
      build?.assets?.length > 1 &&
      build?.percentage == 1 &&
      quit()
  })

  const build = useWebpack({compiler, bud})

  useEffect(() => {
    successfulBuild(build) &&
      notifier.notify({
        title: 'Build complete',
        message: `${build.assets.length} assets built.`,
      })
  }, [build?.percentage])

  const showBrowserSync =
    !bud.features.enabled('debug') && bud.features.enabled('browserSync')

  return (
    <App width={width} height={height} build={build} state={state} bud={bud}>
      <Assets width={width} actions={actions} build={build} />
      <Errors actions={actions} build={build} />
      <Warnings actions={actions} build={build} />
      {showBrowserSync && <BrowserSync actions={actions} />}
      <DevServer actions={actions} build={build} />
    </App>
  )
}

Runner.propTypes = {
  compiler: PropTypes.object,
  bud: PropTypes.object,
}

module.exports = {Runner}

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

/**
 * Successful build
 *
 * @prop {object} build
 * @return {boolean}
 */
const successfulBuild = build =>
  !build?.errors?.length > 0 &&
  build?.percentage == 1 &&
  build?.assets?.length > 0

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
const Runner = ({compiler, config}) => {
  const [width, height] = useStdOutDimensions()
  const [state, actions] = useFocusState()
  const {exit} = useApp()

  useInput(input => {
    if (input == 'q') {
      exit()
      process.exit()
    }
  })

  useEffect(() => {
    !config?.features?.watch &&
      build?.assets &&
      build?.percentage &&
      exit()
  })

  const build = useWebpack({compiler, config})
  useEffect(() => {
    successfulBuild(build) &&
      notifier.notify({
        title: 'Build complete',
        message: `${build.assets.length} assets built.`,
      })
  }, [build?.percentage])

  const showBrowserSync =
    !config?.features?.debug &&
    config?.features?.browserSync

  return (
    <App
      width={width}
      height={height}
      build={build}
      state={state}
      config={config}>
      <Assets
        width={width}
        actions={actions}
        build={build}
      />
      <Errors actions={actions} build={build} />
      <Warnings actions={actions} build={build} />
      {showBrowserSync && <BrowserSync actions={actions} />}
    </App>
  )
}

Runner.propTypes = {
  compiler: PropTypes.object,
  config: PropTypes.object,
}

module.exports = {Runner}

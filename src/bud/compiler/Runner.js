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
const successfulBuild = build => build?.percentage == 1 && build?.assets?.length > 0

/**
 * Budpack build status display
 *
 * @prop {object} compiler webpack compiler
 * @prop {object} config   webpack compiler config
 */
const Runner = ({bud}) => {
  const [width, height] = useStdOutDimensions()
  const [state, actions] = useFocusState()
  const build = useWebpack(bud)
  const {exit} = useApp()

  /**
   * Quits application when called.
   */
  const quit = () => {
    bud.logger.info({name: 'bud.compiler'}, 'Quitting application.')
    exit()

    bud.util.terminate()

    process.exit()
  }

  useInput(input => {
    if (input == 'q') {
      bud.logger.info(
        {name: 'bud.compiler', input},
        'User requested to close application.',
      )

      quit()
    }
  })

  /**
   * Run OS level notification when build complete
   */
  useEffect(() => {
    if (successfulBuild(build)) {
      const title = 'Build complete.'
      const message = `${build.assets.length} assets built.`
      notifier.notify({
        title,
        message,
      })

      bud.logger.info(
        {name: 'bud.compiler', title, message},
        'Build success notification',
      )
    }
  }, [build?.percentage, build?.assets])

  useEffect(() => {
    const notWatching =
      !bud.features.enabled('watch')
      && !bud.features.enabled('hot')

    const complete = build?.done

    if (notWatching && complete) {
      bud.logger.info(
        {
          name: 'bud.compiler',
          watch: bud.features.enabled('watch'),
          hot: bud.features.enabled('hot'),
          build: {
            ...build,
            assets: build.assets.map(asset => asset.name),
          },
        },
        'application determined to be finished based on state. quitting.',
      )

      quit()
    }
  })

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

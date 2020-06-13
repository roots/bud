const React = require('react')
const {useEffect, useState} = React
const PropTypes = require('prop-types')
const {Text, Box, Color, useApp} = require('ink')
const webpack = require('webpack')
const build = require('./../build').webpack
const compiler = webpack(build())

/**
 * Budpack CLI interface
 *
 * @prop {object} cli
 */
const Budpack = ({cli}) => {
	const {exit} = useApp()

	const [help, setHelp] = useState(null)
	const [input, setInput] = useState(null)
	useEffect(() => {
		cli && cli.input && setInput({
			mode: cli.input[0],
		})
	}, [cli])

	const [mode, setMode] = useState('')
	useEffect(() => {
		input && setMode(input.mode)
	}, [input])

	const [stats, setStats] = useState(null)
	const [error, setError] = useState(null)
	useEffect(() => {
		const callback = (err, stats) => {
			(err || stats.hasErrors()) && setError(err)
			setStats(stats)
		}

		if (mode !== 'build' && mode !== 'dev') {
			setHelp(cli.help)
		}

		mode == 'build' && compiler.run(callback)
		mode == 'dev' && compiler.watch(null, callback)
	}, [mode])

	const [assets, setAssets] = useState([])
	useEffect(() => {
		stats && stats.compilation && stats.compilation.assets
			&& setAssets(
				Object.keys(stats.compilation.assets)
			)
	}, [stats])

	useEffect(() => {
		help && exit()
	}, [help])

	return (
		<Box flexDirection="column" marginTop={1}>
			<Text>
				<Color green>Budpack</Color>
			</Text>

			{help && (
				<>
					<Box>
						<Text>{help}</Text>
					</Box>

					<Box marginTop={2}>
						<Text marginTop={2}>Press ^C to exit</Text>
					</Box>
				</>
			)}

			{assets && assets.map((asset, id) =>
				<Box key={id}>
					<Text>{asset}</Text>
				</Box>
			)}

			{error && console.log(error)}
		</Box>
	)
}

Budpack.propTypes = {
	cli: PropTypes.object,
}

module.exports = Budpack

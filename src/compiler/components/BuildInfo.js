/** Modules */
const React = require("react");
const { Box, Text } = require("ink");
const PropTypes = require("prop-types");

/** Application components */
const { Loading } = require("./Loading");
const { Watching } = require("./Watching");

/**
 * Build Info
 */
const BuildInfo = ({ build, bud, width }) => (
  <Box flexDirection="column" paddingTop={1}>
    {build?.percentage == 1 && build?.hash && (
      <Text color="#6C758F" marginTop={1}>
        Build {build?.hash}. Finished in {build?.time / 1000}s.
      </Text>
    )}

    <Loading build={build} width={width} />
  </Box>
);

BuildInfo.propTypes = {
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
};

module.exports = { BuildInfo };

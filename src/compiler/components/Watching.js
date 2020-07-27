const React = require("react");
const { Box, Text } = require("ink");
const Spinner = require("ink-spinner");

/**
 * Watch mode indicator
 * @prop {object} bud
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
const Watching = () => (
  <Box flexDirection="row">
    <Text color="#28a745">
      <Text>
        <Spinner type="dots" />
      </Text>
      {" Watching"}
    </Text>
  </Box>
);

module.exports = { Watching };

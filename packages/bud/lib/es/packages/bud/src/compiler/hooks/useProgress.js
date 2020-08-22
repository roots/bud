/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { ProgressPlugin } from 'webpack';
import { useState, useEffect } from 'react';

/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */

const useProgress = bud => {
  const [progressPlugin, setProgressPlugin] = useState();
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (!progressPlugin) {
      setProgressPlugin(new ProgressPlugin({
        activeModules: true,
        modules: true,

        handler(percentage, message) {
          setPercentage(percentage);
          setMessage(message);
        }

      }));
      bud.logger.info({
        name: 'bud.compiler'
      }, 'progress plugin created.');
    }
  }, []);
  return {
    progressPlugin,
    percentage,
    message
  };
};

export { useProgress };

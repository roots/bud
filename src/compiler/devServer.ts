import webpack from "webpack";
import type { Bud, WebpackConfig } from "./types";
import chokidar from "chokidar";
import WDS from "webpack-dev-server";

const makeDevServer = (bud: Bud, webpackConfig: WebpackConfig) => {
  const wdsOptions = {
    before(app, server) {
      chokidar.watch(bud.state.options.watch).on("all", function () {
        server.sockWrite(server.sockets, "content-changed");
      });
    },
    disableHostCheck: true,
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    proxy: {
      "**": {
        target: "http://bud-sandbox.valet",
        secure: false,
        changeOrigin: true,
        port: 3000,
      },
    },
    hot: true,
    overlay: true,
    historyApiFallback: true,
    open: true,
    stats: {
      colors: true,
    },
  };

  WDS.addDevServerEntrypoints(webpackConfig, wdsOptions);

  return new WDS(webpack(webpackConfig), wdsOptions);
};

export { makeDevServer };

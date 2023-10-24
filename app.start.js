process.env.NODE_ENV = "development";  // Intentionally being loaded on top

const ReactDevUtils = require("react-dev-utils/WebpackDevServerUtils");
const clearConsole = require("react-dev-utils/clearConsole");
const openBrowser = require("react-dev-utils/openBrowser");
const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const config = require("./webpack.config");

const { choosePort, prepareUrls, createCompiler } = ReactDevUtils;

const isInteractive = process.stdout.isTTY; // checking if the terminal is interactive or not
const DEFAULT_PORT = 3000;
const HOST = "0.0.0.0";

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) {
      // We have not found a port, which means all ports are taken
      console.log("No available port found.");
      return;
    }

    // Use the chosen port to prepare URLs
    const protocol = process.env.HTTPS === "true" ? "https" : "http";
    const urls = prepareUrls(protocol, HOST, port);
    const appName = "React App With Webpack";

    const compiler = createCompiler({
      webpack,
      config,
      urls,
      appName,
    });

    const devServerConfig = {
      host: "localhost",
      historyApiFallback: true,
    };

    const devServer = new webpackDevServer(compiler, devServerConfig);

    devServer.listen(port, HOST, (err) => {
      if (err) {
        return console.error(err);
      }

      if (isInteractive) {
        clearConsole();
      }
      console.log("Starting the development server...\n");
      openBrowser(urls.localUrlForBrowser);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });

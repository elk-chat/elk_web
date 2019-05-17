const path = require("path");

const envMapper = {
  development: "dev",
  production: "prod",
};

const env = process.env.NODE_ENV;

// const mergeConfig = (webpackConfig, customConfig) => {
//   const nextConfig = Object.assign({}, webpackConfig, {
//     entry: {
//       ...webpackConfig.entry,
//       ...customConfig.entry,
//     },
//     output: {
//       ...webpackConfig.output,
//       ...customConfig.output,
//     },
//     plugins: [
//       ...webpackConfig.plugins,
//       ...customConfig.plugins,
//     ],
//     optimization: {
//       ...webpackConfig.optimization,
//       ...customConfig.optimization,
//     },
//   });

//   nextConfig.module.rules[1].oneOf[1].use.options = {
//     ...nextConfig.module.rules[1].oneOf[1].use.options,
//     ...customConfig.babelConfig
//   }

//   return nextConfig;
// }

const getCustomerConfig = (function() {
  try {
    let configFunc = require(path.join(process.cwd(), ".ukescripts.config.js"));
    let customer = configFunc();
    return customer[envMapper[env] || env] || customer;
  } catch (e) {
    // console.log(e)
    return {};
  }
})();

module.exports = getCustomerConfig;

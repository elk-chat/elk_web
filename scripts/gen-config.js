const fs = require('fs');
const path = require('path');

const configName = '.config.js';
const configStorePath = './src';

const configPath = path.resolve(process.cwd(), configStorePath, configName)

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

if(!fs.existsSync(configPath)) {
  const defaultConfig = {
    apiHost: "wss://gate.kchat.im/gate",
    appName: "Elk Chat",
    logo: { src: '' },
    beforeWSHook: (data) => data,
    afterWSHook: (data) => data,
  }
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(defaultConfig)}`);
}

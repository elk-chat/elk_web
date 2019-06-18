const fs = require('fs');
const path = require('path');

const configName = '.config.js';
const configStorePath = './client';

const configPath = path.resolve(process.cwd(), configStorePath, configName)

if(!fs.existsSync(configPath)) {
  const defaultConfig = {
    apiHost: "",
    beforeWSHook: (data) => data,
    afterWSHook: (data) => data,
  }
  fs.writeFileSync(configPath, `module.exports = ${JSON.stringify(defaultConfig)}`);
}

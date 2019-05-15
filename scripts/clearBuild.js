const fs = require('fs-extra');
const paths = require('../config/paths');
const {copyPublicFolder} = require('./build.js');

fs.emptyDirSync(paths.appBuild);
copyPublicFolder();

const nconf = require('nconf');
const path = require('path');

module.exports = () => {
  return nconf
    .argv()
    .env()
    .file({ file: path.join(__dirname, 'nconf_db.json') });
};

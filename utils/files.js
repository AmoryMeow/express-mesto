const fsPromise = require('fs').promises;

const getData = (filePath) => fsPromise.readFile(filePath, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data));

module.exports = getData;

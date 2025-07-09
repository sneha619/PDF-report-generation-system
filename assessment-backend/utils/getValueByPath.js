const jp = require("jsonpath");

module.exports = function getValueByPath(data, path) {
  const result = jp.query(data, "$." + path);
  return result.length ? result[0] : null;
};

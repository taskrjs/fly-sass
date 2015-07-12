const assign = require("object-assign")

module.exports = function () {
  this.filter("sass", (source, options) => {
    try {
      return require("node-sass").renderSync(assign({ data: source}, options)).css.toString()
    } catch (e) { throw e }
  }, {ext: ".css"});
}

const sass = require("node-sass").render
const assign = require("object-assign")

module.exports = function () {
  this.filter("sass", (source, options) => {
    return this.defer(sass)(assign({ data: source }, options))
      .then((result) => result.css.toString())
  }, { ext: ".css" })
}

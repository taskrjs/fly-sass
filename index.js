const sass = require("node-sass").render
const assign = require("object-assign")

module.exports = function () {
  this.filter("sass", (data, options) => {
    return this.defer(sass)(assign({ data: data.toString() }, options))
      .then((result) => result.css.toString())
  }, { ext: ".css" })
}

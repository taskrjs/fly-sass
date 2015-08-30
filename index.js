const sass = require("node-sass").render
const assign = require("object-assign")

module.exports = function (debug) {
  this.filter("sass", (data, options) => {
    return this.defer(sass)(
      assign({ data: data.toString() },
      assign({ outFile: options.sourceMap ? "." : "", file: options.filename }, options))
    ).then((result) => assign({ ext: ".css" }, result))
  })
}

exports.default = function * () {
  yield this.clear("test/style.css")
  yield this
    .source("test/src/style.scss")
    .sass({
      outputStyle: "compressed",
      includePaths: ["test/src/imports"],
      sourceMap: true
    })
    .target("test")
}

var fs = require("fs")
var join = require("path").join

console.log('dirname: ', __dirname)
console.log('files: ', fs.readdirSync(__dirname));

var fix = join(__dirname, 'fixture.css')
var css = join(__dirname, 'style.css')

if (fs.readFileSync(fix, 'utf8') !== fs.readFileSync(css, 'utf8')) {
  console.error('See: diff test/fixture.css test/style.css')
  process.exit(1)
}

if (fs.existsSync(css)) {
  fs.unlinkSync(css)
}

# fly-sass [![][travis-badge]][travis-link] [![npm package][npm-ver-link]][npm-pkg-link]

> [node-sass](https://github.com/sass/node-sass) plugin for Fly

## Install

```
npm install --save-dev fly-sass
```

## Usage

The globs within `source()` should always point to individual files. 

#### Basic

```js
exports.default = function * () {
  yield this.source('src/styles/style.scss').sass().target('dist')
}
```

#### Multiple Bundles

Simply create an array of individual file paths.

```js
exports.default = function * () {
  yield this.source([
    'src/styles/client.scss',
    'src/styles/admin.scss'
  ]).sass().target('dist')
}
```

#### SASS vs SCSS

There is no need to set [`indentedSyntax`](https://github.com/sass/node-sass#indentedsyntax) -- the SASS parser will intelligently decipher if you are using the SASS syntax.

```js
exports.default = function * () {
  yield this.source([
    'src/styles/client.sass', // SASS
    'src/styles/admin.scss' // SCSS
  ]).sass().target('dist')
}
```

#### Sourcemaps

You may create source maps for your bundles. Simply provide the desired file path as `outFile` or `sourceMap`.

> **Important:** It is _recommended_ that you provide `sourceMap` your desired path. However, if `sourceMap` is a `true`, you **must** then provide `outFile` your file path string.

```js
exports.default = function * () {
  yield this.source('src/app.sass')
    .sass({sourceMap: 'dist/css/app.css.map'})
    .target('dist');
}

// OR

exports.default = function * () {
  yield this.source('src/app.sass')
    .sass({sourceMap: true, outFile: 'dist/css/app.css.map'})
    .target('dist');
}
```

## API

### .sass(options)

This plugin does not have any custom options. Please visit [`node-sass` options](https://github.com/sass/node-sass#options) for a full list of available options.

> **Note:** You will _not_ be able to set the `file` or `data` options. These are done for you & cannot be changed.

# License

MIT © [Tomoyuki Kashiro](http://tomoyukikashiro.me) [et al](https://github.com/kashiro/fly-sass/graphs/contributors)

[npm-pkg-link]: https://www.npmjs.org/package/fly-sass
[npm-ver-link]: https://img.shields.io/npm/v/fly-sass.svg?style=flat-square
[travis-link]:  https://travis-ci.org/kashiro/fly-sass
[travis-badge]: http://img.shields.io/travis/kashiro/fly-sass.svg?style=flat-square

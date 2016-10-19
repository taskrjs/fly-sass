'use strict';

const format = require('path').format;
const sass = require('node-sass').renderSync;

module.exports = function () {
	// requires that `source()` is specifying MAIN files directly!
	this.plugin('sass', {}, function * (file, opts) {
		// ensure `opts.file` & not `opts.data`
		opts = Object.assign({}, opts, {file: format(file), data: null});

		// option checks for `sourceMap`
		if (opts.sourceMap && typeof opts.sourceMap === 'boolean' && !opts.outFile) {
			return this.emit('plugin_error', {
				plugin: 'fly-sass',
				message: 'You must specify an `outFile` if using a `boolean` value for `sourceMap`.'
			});
		}

		// update extn to 'css'
		file.base = file.base.replace(/(s[a|c]ss)/i, 'css');

		// update the file's data
		file.data = sass(opts).css;
	});
};

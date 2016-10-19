'use strict';

const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

const expect = '.file__c{visibility:hidden}.file__b{display:block}.file__a{display:none}.main{display:block}\n';

test('fly-sass', t => {
	t.plan(7);

	const fly = new Fly({
		plugins: [{
			func: require('../')
		}],
		tasks: {
			a: function * () {
				const map = `${tmp}/out.css.map`;
				const src = `${dir}/style.sass`;
				const tar = `${tmp}/style.css`;

				yield this.source(src).sass().target(tmp);
				t.ok(yield this.$.find(tar), 'create a `.css` file correctly');

				yield this.source(src).sass({outputStyle: 'compressed'}).target(tmp);
				t.equal(yield this.$.read(tar, 'utf8'), expect, 'resolve multi-level imports && types!');

				yield this.source(src).sass({sourceMap: map}).target(tmp);
				const arr1 = yield this.$.expand(`${tmp}/*`);
				t.equal(arr1.length, 2, 'via `sourceMap`; create a source map');
				t.ok(yield this.$.find(map), 'via `sourceMap`; create a source map with custom name');
				yield this.clear(tmp);

				yield this.source(src).sass({sourceMap: true, outFile: map}).target(tmp);
				const arr2 = yield this.$.expand(`${tmp}/*`);
				t.equal(arr2.length, 2, 'via `sourceMap + outFile`; create a source map');
				t.ok(yield this.$.find(map), 'via `sourceMap + outFile`; create a source map with custom name');
				yield this.clear(tmp);
			}
		}
	});

	t.ok('sass' in fly, 'attach `sass` plugin to fly');

	fly.start('a');
});

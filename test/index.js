'use strict';

const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

const expect = '.file__c{visibility:hidden}.file__b{display:block}.file__a{display:none}.main{display:block}\n';

test('fly-sass', t => {
	t.plan(3);

	const fly = new Fly({
		plugins: [{
			func: require('../')
		}],
		tasks: {
			a: function * () {
				const src = `${dir}/style.sass`;
				const tar = `${tmp}/style.css`;

				yield this.source(src).sass().target(tmp);
				t.ok(yield this.$.find(tar), 'create a `.css` file correctly');

				yield this.source(src).sass({outputStyle: 'compressed'}).target(tmp);
				t.equal(yield this.$.read(tar, 'utf8'), expect, 'resolve multi-level imports && types!');
			}
		}
	});

	t.ok('sass' in fly, 'attach `sass` plugin to fly');

	fly.start('a');
});

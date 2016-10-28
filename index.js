var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var Vinyl = require("vinyl");
var through2 = require("through2");
var browserify = require("browserify");

const PLUGIN_NAME = "browserify-vinyl";

module.exports = function (name, opts) {
	opts = opts || {};
	
	return through2.obj(function (file, encoding, cb) {
		if (file.isStream()) {
			opts.basedir = file.base;
			var b = browserify(file.contents, opts);
			var os = b.bundle();
			cb(null, new Vinyl({
				path: name,
				contents: os
			}));
		}
		else if (file.isBuffer()) {
			cb(new PluginError(PLUGIN_NAME, "Buffers aren't supported"));
		}
	});
};

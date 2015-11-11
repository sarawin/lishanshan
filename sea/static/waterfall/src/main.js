define(function(require, exports, module) {

	var $ = require('jquery');
	var Base = require('./base');
	var data = require('./data');

	$.each(data, function(index, val) {
		 var h = parseInt( (val.height/val.width)*230 );
		 val.height = h;
	});

	var b = new Base(data);
	b._init();

});


define(function(require, exports, module) {

	var $ = require('jquery');
	require('handlebars');

	//var margin = 20;
	//var grid = $('.grid');
	//var grid_w = grid.outerWidth() + margin;

	function Base (data) {
		this.margin = 20;
		this.grid = $('.grid');
		this.grid_w = $('.grid').outerWidth() + this.margin;
		this.colNum = 1;
		this.h = [];
		this.data = data;
	}

	module.exports = Base;

	Base.prototype._init = function () {
		var that = this;

		$(document).ready(function() {
			//加载数据
			var myTemplate = Handlebars.compile($("#template").html());
			//console.log(that.data);

			$('#waterfall').html(myTemplate(that.data));

			that.grid = $('.grid');
			that.grid_w = $('.grid').outerWidth() + that.margin;
			that.colNum = parseInt( $(window).width()/that.grid_w );

			$('#waterfall').width(that.colNum*that.grid_w-that.margin);

			that.waterFall();
			
		});

		$(window).resize(function() {

			var newColNum = parseInt( $(window).width()/that.grid_w );
			//$('#waterfall').width(that.colNum*that.grid_w-that.margin);

			if (newColNum <= 0) newColNum = 1 ;
			if (newColNum != that.colNum) {   //列数变动时执行
				that.colNum = newColNum;
				that.h = [];
				$('#waterfall').width(that.colNum*that.grid_w-that.margin);
				that.waterFall();
			}

		});
	}

	Base.prototype.waterFall = function () {
		//console.log(colNum);
		var h = this.h;
		var grid = this.grid;

		for (var i = 0; i < grid.length; i++) {
			var grid_h = grid[i].offsetHeight;    //获得每个块的高度

			if ( i < this.colNum ) {
				h[i] = grid_h;
				grid.eq(i).animate({
					left: i*this.grid_w + 'px',
					top: 0
				});
			} else {
				var min_H = Math.min.apply(null,h);   //取得最小高度div
				var minKey = this.getarraykey(h, min_H);
				//console.log(minKey);
				h[minKey] += (grid_h + this.margin);   //更新高度
				//console.log(this.h);
				grid.eq(i).animate({
					left: minKey*this.grid_w + 'px',
					top: min_H + this.margin + 'px'
				});
			}
		};

	}
	Base.prototype.getarraykey = function ( s, v ) {

		for(k in s) {
			if(s[k] == v) {
				return k;
			}
		}
	}

});


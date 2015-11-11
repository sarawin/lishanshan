define(function(require, exports, module) {

	var $ = require('jquery');
	var Ajax = require('./ajax');

	module.exports = {
		margin: 20,
		grid_w: 270,
		colNum: 5,
		iPage: 1,
		b: false,
		h: [0,0,0,0,0],
		_init: function() {
			var that = this;

			$(document).ready(function() {
				that.waterFall();
			});

			$(window).scroll(function(event) { //无限加载
				var doc_h = $(document).height();
				var win_h = $(window).height();
				var scr_h = $(document).scrollTop();

				if (doc_h <= win_h+scr_h) {
					if(that.b) {
						that.b = false;
						//console.log(that.iPage);
						$('body').append('<img id="loading" src="../static/waterfall_loading/image/loading.gif" alt="loading ... ..." style ="position:fixed;bottom:0;right:600px;" />');
						that.iPage++;
						that.waterFall();
					}
				};
					
			});
		},
		waterFall: function () {
			var that = this;
			var h = this.h;
			Ajax.get("getPics.php", {"cpage": this.iPage})
                .then(function (result) {
                	//console.log(result);
		            var data = result;

		            if (that.iPage == 1) {
		            	$('#load').remove();
		            } else{
		            	$('#loading').remove();
		            }
		            if ( !data.length ) {
						//后续没有数据了
						$('body').append('<p id="complete"> 啊哦，没有数据了噢！</p>');
						$('#complete').animate({opacity: 0}, 500).animate({opacity: 1}, 500).animate({opacity: 0}, 1000);
						return ;
					}
		            $.each(data, function(index, val) {
						var oDiv = $('<div class="grid" id = '+ val.id +'><img src="'+ val.preview +'"><p>'+ val.title +'</p></div>');
						$('#waterfall').append(oDiv);

						var min_H = Math.min.apply(null,h); //获取最小高度
						var minKey = that.getarraykey(h, min_H);

						oDiv.find('img').css({
								width: 230,
								height: parseInt( (val.height/val.width)*230 )
							})
							.end().css({
								left: minKey*that.grid_w,
								top: min_H + that.margin
							});

						var grid_h = oDiv.outerHeight();   //获得块的高度
						h[minKey] += (grid_h + that.margin);
					});
					that.b = true;
					if ($('#546527')) $('#546527 img')[0].src = '';
                });
		},
		getarraykey: function ( s, v ) {

			for(k in s) {
				if(s[k] == v) {
					return k;
				}
			}
		}
	}

});


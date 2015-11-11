define(function(require, exports, module){

	var $ = require('jquery');

	module.exports = {
		//ajax请求网络错误
		networkError: function (XMLHttpRequest, textStatus, errorThrown) { 
	        var errorMessage = '';

	        if (XMLHttpRequest.status == 404) {
	            errorMessage = '接口地址不正确。';
	        } else if (XMLHttpRequest.status == 200) {
	            errorMessage = {
	                timeout: '服务器响应太慢了',
	                error: '未知错误1',
	                notmodified: '未知错误2',
	                parsererror: '接口返回的数据格式不正确',
	                undefined: '未知错误'
	            }[textStatus];
	        }

	        console.log('网络错误 Err:' + errorMessage);

	        return XMLHttpRequest;
	    },	
		get: function (url, data) {
	        data = data || {};
	        url += '?cpage=' + data.cpage;
	        var option = {
	            url: url,
	            type: "GET",
	            dataType: 'json'
	        };

	        var deferred = null;

	        try {
	            deferred = $.ajax(option).fail(this.networkError);
	        } catch (e) {
	            deferred = $.Deferred();
	        }

	        return deferred;
	    }
	}

})
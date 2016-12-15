define(['zepto'],function($){
	//平台判断
	function systemJudge (){
		if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
			var version = parseFloat(RegExp.$1);
			return 'and';
		}else if(navigator.userAgent.indexOf('iPhone') != -1){
			return 'ios';
		}else{
			return '非IOS非Android';
		}
	};
	function getStyle(obj, name) {
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj, false)[name];
		}
	};
//获取窗口高宽
	function getInnerHeight() {
		if (window.innerHeight) {
			return window.innerHeight;
		} else {
			return Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		}
	}
	function getInnerWidth() {
		if (window.innerWidth) {
			return window.innerWidth;
		} else {
			return Math.min(document.body.clientWidth, document.documentElement.clientWidth);
		}
	}
//获取文档高
	function getScrollHeight(){
		return $(document.body).height();
	}
//获取当前位置距离顶部高度
	function getScrollTop(){
		if (document.documentElement.scrollTop){
			return document.documentElement.scrollTop
		}else{
			return document.body.scrollTop
		}
	}
//URL截取参数
	function GetUrlParam(paraName) {
		var url = document.location.toString();
		var arrObj = url.split("?");
		if (arrObj.length > 1) {
			var arrPara = arrObj[1].split("&");
			var arr;
			for (var i = 0; i < arrPara.length; i++) {
				arr = arrPara[i].split("=");
				if (arr != null && arr[0] == paraName) {
					return decodeURI(arr[1]);
				}
			}
			return "";
		}
		else {
			return "";
		}
	}

//
	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function getPerCent (num,sNum){
		if(num){
			if(sNum){
				var sNum = sNum;
			}else{
				sNum = 2;
			}
			return (parseFloat(num)*100).toFixed(sNum);
		}else{
			if(num==0){
				return "0.00"
			}else{
				return "--";
			}
		}
	};

	function getNum (num,sNum){
		if(num){
			if(sNum){
				var ssNum = sNum;
			}else{
				var ssNum = 2;
			}
			return (parseFloat(num)).toFixed(ssNum);
		}else{
			if(num==0){
				return "0.00"
			}else{
				return "--";
			}
		}
	};

	function now() {
		var date = new Date();
		return date.getTime();
	}
    //此函数有问题不可用
	function checkImgExists(imgurl) {
		var ImgObj = new Image(); //判断图片是否存在
		ImgObj.src = imgurl;
		//没有图片，则返回-1
		if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
			return true;
		} else {
			return false;
		}
	};

	// js 数字货币格式转化
	//  目前只支持 保留两位小数
	// http://www.haorooms.com/post/js_qian_huobi_gs
	function formatCurrency(num) {
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+','+
				num.substring(num.length-(4*i+3));
		return (((sign)?'':'-') + num + '.' + cents);
	}




	return{
		systemJudge : systemJudge,
		getStyle:getStyle,
		getInnerHeight:getInnerHeight,
		getInnerWidth:getInnerWidth,
		getScrollHeight:getScrollHeight,
		getScrollTop:getScrollTop,
		GetUrlParam:GetUrlParam,
		hasClass:hasClass,
		getPerCent:getPerCent,
		getNum:getNum,
		now:now,
		checkImgExists:checkImgExists,
		formatCurrency:formatCurrency
	}
});







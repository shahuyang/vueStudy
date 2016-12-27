define(['zepto'],function($){

// 错误正确提示
// 	function promptMsg(obj,txt,boolean){
// 		obj.html(txt);
// 		if(boolean){
// 			obj.css('bottom','2.875rem');
// 		}else{
// 			obj.css('top','2.875rem');
// 		}
// 		obj.css('opacity','1');
// 		obj.animate({
// 			opacity:0
// 		},1000)
// 	};

// H 5 loading 框
// function load(bool) {
// 	if(bool){
// 		$('<div id="load" class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>').appendTo($('body'));
// 	}else if((!bool) && $("#load") ){
// 		$("#load").remove();
// 	}
// }


	function getPerCent (num,sNum){
		if(num || num==0){
			if(sNum){
				var secNum = sNum;
			}else{
				var secNum = 2;
			}
			return (parseFloat(num)*100).toFixed(secNum);
		}else{
			return "--";
		}
	};

	function getDiscount (num,sNum){
		if(num || num==0){
			if(sNum){
				var secNum = sNum;
			}else{
				var secNum = 2;
			}
			return (parseFloat(num)*10).toFixed(secNum);
		}else{
			return "--";
		}
	};


// 变色函数
//  给所有需要变色的 元素 加  js_color
//  red green 泛指所有与涨跌有关的函数
	function changeColor(id){
		if(id){
			var aEle = document.getElementById(id).getElementsByClassName('js_color');
		}else{
			var	aEle = document.getElementsByClassName('js_color');
		}
		if(aEle.length!==0){
			for(var i=0;i<aEle.length;i++){
				var curValue = parseFloat(aEle[i].innerHTML);
				if(curValue>0){
					aEle[i].className = 'js_color red';
					aEle[i].innerHTML = '+'+aEle[i].innerHTML;
				}else if(curValue<0){
					aEle[i].className = 'js_color green';
				}else{
					aEle[i].className = 'js_color';
				}

			}
		}
	};

// 风险级别函数
	function changeLevel(){
		var	aEle = document.getElementsByClassName('js_level');
		if(aEle.length!==0){
			for(var i=0;i<aEle.length;i++){
				var curValue = aEle[i].innerHTML;
				if(curValue == '高风险'){
					$(aEle[i]).siblings('span').addClass('level_h')
				}else if(curValue == '低风险'){
					$(aEle[i]).siblings('span').addClass('level_l')
				}

			}
		}
	};
	
	function noData(wrapId,text) {
		if(text){
			var curText = text;
		}else{
			var curText = "暂无数据";
		}
		$(wrapId).css({"margin":0,"padding":0}).html('<div class="noData">'+curText+'</div>');
	}	
	
	function noValue(abc) {
		if(abc || abc==0){
			return abc;
		}else{
			return "--";
		}
	}
	
	

// 清除所有的 localStorage
	function delLocalStorage(){
		localStorage.clear();
	};


// appcache 离线存储
// Check if a new cache is available on page load.
	var appcacheLoad = function(){
		window.addEventListener('load', function(e) {
			window.applicationCache.addEventListener('updateready', function(e) {
				if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
					window.applicationCache.swapCache();
					if (confirm('页面更新,重新加载？')) {
						window.location.reload();
					}
				}
			}, false);
		}, false);
	};

	return {
		// load:load,
		// promptMsg:promptMsg,
		noValue:noValue,
		noData:noData,
		getPerCent:getPerCent,
		getDiscount:getDiscount,
		changeColor:changeColor,
		changeLevel:changeLevel,
		delLocalStorage:delLocalStorage,
		appcacheLoad:appcacheLoad
	}
});







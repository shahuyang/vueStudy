define(function(){
// 时间戳 解析为 xxxx-xx-xx 表示
	function dateStringify(dateStr,accuracy){
		if(dateStr){
			var date = new Date(parseInt(dateStr));
			Y = date.getFullYear() + '-';
			M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			D = date.getDate() <10 ? '0' + date.getDate():date.getDate()+ ' ';
			h = date.getHours()<10 ? '0'+date.getHours() + ':':date.getHours() + ':';
			m = date.getMinutes()<10 ? '0' + date.getMinutes():date.getMinutes();
			s = ':'+date.getSeconds();
			if(accuracy == 1){
				return Y+M+D+' '+h+m+s;
			}else if(accuracy == 2){
				return M+D;
			}else if(accuracy==3){
				return M+D+' '+h+m;
			}else{
				return Y+M+D;
			}
		}else{
			return "--";
		}

	};
// 时间字符串表示 解析为 时间戳
	function dateParseStr(){
		var date = arguments.length == 0 ? new Date(): new Date(arguments[0]);
		return date.getTime();
	}
//  返回 当前时间 到 截止时间的  剩余毫秒数
	function dateSurplus (dateEnd,dateStart){
		var dateEnd = new Date(dateEnd),
			dateStart = dateStart? new Date(dateStart):new Date();
		return (dateEnd-dateStart);
	}
//当前时间截止到当日凌晨剩余毫秒数
	function todaySurplus(){
		var date = new Date();
		return ((23-date.getHours())*3600+(59-date.getMinutes())*60+(60-date.getSeconds()))*1000
	}
//当前时间截止到第二天 上午 8点半 剩余毫秒数
	function todaySurNine(){
		var date = new Date();
		var todaySurplus = ((23-date.getHours())*3600+(59-date.getMinutes())*60+(60-date.getSeconds()))*1000;
		return todaySurplus + 1000*3600*8 + 30*60*1000;
	}
// 判断当前时间是否为  交易时间，
//  是交易时间 返回 1
// 当前开盘 之前返回 2
// 当天其他 非交易时间 返回 0
	function isTradeTime(dataStr) {
		var curDate;
		if(dataStr){
			curDate = new Date(parseInt(dataStr));
		}else{
			curDate = new Date()
		}
		var curTime = curDate.getSeconds() + curDate.getMinutes()*60 + curDate.getHours()*3600;
		if(curTime >= (9*3600 + 30*60) && curTime < (11*3600 + 30*60)){
			return 1;
		}else if(curTime >= (13*3600) && curTime < (15*3600 )){
			return 1
		}else if(curTime < (9*3600 + 30*60) ){
			return 2;
		}else{
			return 0;
		}
	};

	return {
		dateStringify : dateStringify,
		dateParseStr : dateParseStr,
		dateSurplus:dateSurplus,
		todaySurplus:todaySurplus,
		todaySurNine:todaySurNine,
		isTradeTime:isTradeTime
	}
});







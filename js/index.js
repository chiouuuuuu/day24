// 当变更任何一个select选择时，更新 result-wrapper 的内容
// 当所选时间早于现在时间时，文案为 现在距离 "所选时间" 已经过去 xxxx
// 当所选时间晚于现在时间时，文案为 现在距离 "所选时间" 还有 xxxx
// 注意当前时间经过所选时间时候的文案变化
// 注意选择不同月份的时候，日期的可选范围不一样，比如1月可以选31天，11月只有30天，注意闰年

window.onload=function(){
    var dayArr=[31,28,31,30,31,30,31,31,30,31,30,31];
    var year=document.getElementById("year-select");
    var month=document.getElementById("month-select");
    var day=document.getElementById("day-select");
    /**
     * 给day标签加上选择
     */
    var arrSelect=document.getElementsByTagName("select");
    for(var i=0;i<arrSelect.length;i++){
        arrSelect[i].onchange=function(){
            setInterval(function(){
                getDate();
            },500);
        }
    }
    month.onchange=function(){
        if(month.children[0].innerHTML==0)month.removeChild(month.children[0]);
        while(day.children.length){
            day.removeChild(day.children[0]);
        }
        var dayNum=dayArr[month.value-1];
        if(month.value==0){
            var oOption=document.createElement("option");
            oOption.value=0;
            oOption.innerHTML="请选择月份";
            day.appendChild(oOption);
        }
        if(month.value==2)dayNum+=getMonth(year.value);
        for(let i=0;i<dayNum;i++){
            var oOption=document.createElement("option");
            oOption.value=i+1;
            oOption.innerHTML=i+1;
            day.appendChild(oOption);
        }
    }
    document.getElementById("001").onclick=function(){
        getDate();
    }
    function getDate(){
        var year=document.getElementById("year-select");
        var month=document.getElementById("month-select");
        var day=document.getElementById("day-select");
        var h=document.getElementById("hour-select");
        var m=document.getElementById("minite-select");
        var s=document.getElementById("second-select");
        if(month.value!=0 && day.value!="请选择月份"){
            var odate=new Date(year.value,month.value-1,day.value,h.value,m.value,s.value);
            var today=new Date();
            var res="现在距离 "+odate.getFullYear()+"年"+(parseInt(odate.getMonth())+1)+"月"+odate.getDate()+"日"+" 星期"+transDate(odate.getDay())+" "+trans(odate.getHours())+":"+trans(odate.getMinutes())+":"+trans(odate.getSeconds());
            if(odate>today) res+=" 还有 ";
            else res+=" 已经过去 ";        
            
            var sumSecond=Math.abs(parseInt((today-odate)/1000));
            var iday=parseInt(sumSecond/(3600*24));
            sumSecond-=iday*3600*24;
            var hour=parseInt(sumSecond/3600);
            sumSecond-=hour*3600;
            var miniuts=parseInt(sumSecond/60);
            var second=(sumSecond)%60;

            res=res+" "+iday+" 天 "+hour+" 小时 "+miniuts+" 分 "+second+" 秒 ";
            document.getElementById("result-wrapper").innerHTML=res;
        }
        else{
            console.log("月份日期存在错误");
        }
    }
}


function getMonth(year){
    if(year%400==0 || (year%4==0 && year%100!=0)) return 1;
    else  return 0;
}
function trans(n){
    if(n<10){
        return "0"+n;
    }
    else{
        return ""+n;
    }
}

function transDate(n){
    var arrDay=["天","一","二","三","四","五","六"];
    return arrDay[n%7];
}
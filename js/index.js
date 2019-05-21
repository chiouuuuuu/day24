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
    month.onchange=function(){
        month.removeChild(month.children[0]);
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
}

function getMonth(year){
    if(isLeapYear(year)){
        return 1;
    }
    else {
        return 0;
    }
}

function isLeapYear(year){
    if(year%400==0 || (year%4==0 && year%100!=0 )){
        return true;
    }
    else{
        return false;
    }
}

function trans(n){
    if(n<10){
        return "0"+n;
    }
    else{
        return ""+n;
    }
}


function getDate(){
    var sDate="";
    var oDate=new Date();
    sDate=oDate.getFullYear()+"-"+trans(oDate.getMonth()+1)+"-"+trans(oDate.getDate())+" "+transDateEnglish(oDate.getDay())+"  "+AmOrPM(oDate);
    return sDate;
}

function transDateEnglish(n){
    var arrDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return arrDay[n%7];
}

function AmOrPM(obj){
    var h=obj.getHours();
    var m=obj.getMinutes();
    var s=obj.getSeconds();
    if(0<=h && h<=12){
        return trans(h)+":"+trans(m)+":"+trans(s)+" AM";
    }
    else if(12<h && h<=23){
        return trans(h-12)+":"+trans(m)+":"+trans(s)+" PM";
    }
}

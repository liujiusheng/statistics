/**
 * @name 地学算法实现
 * @author 刘久胜
 * @date 2017-02-19
 * @description 根据《地理信息系统算法基础》的地学算法实现
 * 
 */
var geography = {};


//绘制弧
geography.drawCircle = function(x,y,r,ang1,ang2){
    var points = [];
    var ag1 = 0.01745*ang1;
    var ag2 = 0.01745*ang2;
    var n = Math.abs(ag2-ag1)/Math.acos(1-1.018/r)+1;
    var da = (ag2-ag1)/n;
    for(var i=0;i<n;i++){
        var w = ag1+i*da;
        var point = {x:x+r*Math.cos(w),y:y+r*Math.sin(w)};
        points.push(point);
    }
    return points;
};
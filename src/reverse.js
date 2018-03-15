/*
如果线路方向反了就用这个代码反转
*/

var fs = require("fs");


var filename = 'G5001';
var path = './output2';
var content = JSON.parse(fs.readFileSync(path+'/'+filename+'.json','utf-8'));
var coordinates = content.features[0].geometry.coordinates;
content.coordinates = coordinates.reverse();
fs.writeFileSync(path+'/'+filename+'.json',JSON.stringify(content));
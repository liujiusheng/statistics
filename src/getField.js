/*
生成字段列表与道路名称对应表
*/
var xlsx = require('xlsx');
var fs = require("fs");


var path = './split.xlsx';//文件的路径
var outputpath = './split.json';//生成后的文件路径
var workbook = xlsx.readFile(path);
//console.log(workbook.SheetNames[0]);
var content = xlsx.utils.sheet_to_json(workbook.Sheets['路线分段表']);
fs.writeFileSync(outputpath,JSON.stringify(content));
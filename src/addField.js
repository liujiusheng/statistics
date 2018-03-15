/*
为数据添加字段
*/
var fs = require("fs");


var path = "./output";//输入路径
var outputPath = "./output2";//输出路径


//提取字段值
var fields = JSON.parse(fs.readFileSync('./split.json'));
var startStak = {};
for(var i in fields){
    startStak[fields[i]['ROAD_CODE']] = fields[i]['START_STAKEID'];
}


var dirs = fs.readdirSync(path);//console.log(dirs);
for(let i in dirs){
  var filename = dirs[i].split('.');
  var type = filename[filename.length-1];
  if(type=='json'){
    //buildField(path,dirs[i],'START_STAK');
    buildFieldBySplit(path,filename[0],'START_STAKEID');
    //console.log('处理完成：'+dirs[i]);
  }
}


//构建字段START_STAK,与下面一个函数参数不同
function buildField(path,filename,field){
    var content = JSON.parse(fs.readFileSync(path+'/'+filename,'utf-8'));
    //console.log(content);
    if(!content.features[0].properties[field]){
        content.features[0].properties[field] = '';
        fs.writeFileSync(path+'/'+filename,JSON.stringify(content));
    }
}


//参考split.json文件，构建字段START_STAK,与上面一个函数参数不同
function buildFieldBySplit(path,filename,field){
    var content = JSON.parse(fs.readFileSync(path+'/'+filename+'.json','utf-8'));
    var roadname = filename.split('-');
    content.features[0].properties[field] = startStak[roadname[0]];
    fs.writeFileSync(outputPath+'/'+roadname[0]+'.json',JSON.stringify(content));
}
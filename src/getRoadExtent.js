/** 
 * 计算路段的外接矩形
*/
var fs = require("fs");


var path = "./output2";//输入路径
var outputPath = "./output4";//输出路径


var dirs = fs.readdirSync(path);console.log(dirs);
let data = [];
for(let i in dirs){
  var fileData = JSON.parse(fs.readFileSync(path+'/'+dirs[i]));
  var filename = dirs[i].split('.');
  var road = fileData.features[0]['geometry']['coordinates'];
  //计算面的外接矩形
  var maxX = road[0][0];
  var maxY = road[0][1];
  var minX = road[0][0];
  var minY = road[0][1];
  for(let eachPoint of road){
      if(eachPoint[0]>maxX){
          maxX = eachPoint[0];
      }
      if(eachPoint[0]<minX){
          minX = eachPoint[0];
      }
      if(eachPoint[1]>maxY){
          maxY = eachPoint[1];
      }
      if(eachPoint[1]<minY){
          minY = eachPoint[1];
      }
  }
  data.push({
      "name":filename[0],
      "top":maxY,
      "right":maxX,
      "bottom":minY,
      "left":minX
  });
}
fs.writeFileSync(outputPath+'/roadExtent.json',JSON.stringify(data));
//需要依赖安装ogr2ogr包
//输入路径下的每个文件夹都是一个图层


var gdal = require("gdal");
var fs = require("fs");


var path = "./data3";//输入路径
var outputPath = "./output3";//输出路径


var dirs = fs.readdirSync(path);console.log(dirs);
for(let i in dirs){
  var filename = dirs[i].split('.');
  var type = filename[filename.length-1];
  if(type=='shp'){
    transformToJson(path,filename[0],outputPath);
    console.log('处理完成：'+dirs[i]);
  }
}


//将shp转换为geojson
function transformToJson(path,fileName,outputPath){
  var dataset = gdal.open(path+'/'+fileName+'.shp');
  var layer = dataset.layers.get(0);
  const outputDataset = gdal.open(outputPath+'/'+fileName+'.json', 'w', 'GeoJSON')
  const outputLayer = outputDataset.layers.create('myTableName', layer.srs, layer.geomType)
  layer.fields.forEach(field => outputLayer.fields.add(new gdal.FieldDefn(field.name, field.type)));

  layer.features.forEach(feature => {
    const outputFeature = new gdal.Feature(outputLayer);
    outputFeature.setGeometry(feature.getGeometry());
    outputFeature.fields.set(feature.fields.toObject());
    outputLayer.features.add(outputFeature)
  })
  outputDataset.close();
}

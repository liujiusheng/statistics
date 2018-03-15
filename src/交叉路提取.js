/**
 * 将交叉路段提取出来，并且计算其起止桩号
 * 
 */
var xlsx = require('xlsx');
var fs = require("fs");
var http = require("http");

async function getJSON(i,fileName,latlng,param) {
    return new Promise(function (resolve, reject) {
        var spl = latlng.split(',');
        var url = 'http://113.207.109.5:9080/CQJTGISAPI/getDistanceInPolyline1.do?fileName='+fileName+'&lat='+spl[1]+'&lng='+spl[0];
        console.log(url);
        var response = http.get(url,(res) => {
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    newContent[i][param]=parsedData.data;
                    resolve(parsedData);
                } catch (e) {
                    console.log(e.message);
                    reject(223);
                }
            });
        });
    });
}


var path = './交叉互通数据整理.xlsx';//文件的路径
var outputpath = './计算后.json';//生成后的文件路径
var txtpath = './计算后.txt';//转换成txt文件以便于导入excel
var workbook = xlsx.readFile(path);
//console.log(workbook.SheetNames[0]);
var content = xlsx.utils.sheet_to_json(workbook.Sheets['Sheet1']);
//console.log(content);
let newContent = [];
getContent (content);

async function getContent (content){
    for(let i in content){
        newContent.push(content[i]);
        if(!content[i]['互通起点桩号']){
            content[i]['起点经纬度']? await getJSON(i,content[i]['起点路线代码'],content[i]['起点经纬度'],'互通起点桩号'):'';
        }
    
        if(!content[i]['互通止点桩号']){
            content[i]['终点经纬度']? await getJSON(i,content[i]['止点路线代码'],content[i]['终点经纬度'],'互通止点桩号'):'';
        }
        fs.writeFileSync(outputpath,JSON.stringify(newContent));
    }
    
}


//转换成txt
function transformToTXT(data){
    let string = '';
    for(let k in data){
        if(k==0){
            //string += Object.keys(data[k]).join('|');
        }
        let row = [];
        for(let i in data[k]){
            row.push(data[k][i]);
        }
        string += row.join('|')+';';
    }
    return string;
}

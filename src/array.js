/**
 * 数组
 *---------------------------------------------------
 */
 
 
 //求和
 function count(array){
	var count = 0;
	for(var i in array){
		count += array[i];
	}
	return count;
 }
 
 
 //求平均值
 function avg(array){
	var count = count(array);
	return count/array.length;
 }
 
 
 //求最大值
 function max(array){
	 var max = array[0];
	 for(var i in array){
		if(array[i] > max){
			max = array[i];
		} 
	 }
	 return max;
 }
 
 
 //最小值
 function min(array){
	var min = array[0];
	 for(var i in array){
		if(array[i] < min){
			min = array[i];
		} 
	 }
	 return min; 
 }
 
 
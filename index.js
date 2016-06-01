var fs = require('fs'),
	R = require('ramda');

var jsonData = require('./AllCards.json');

var values = R.values(jsonData);
var names = R.keys(jsonData);

names = R.map(x => x.toString().toLowerCase(), names);
/*var values = [];
for(var i = 0;i<names.length;i++){
    values[i]=0;
}
*/
names = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), names);
names = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), names);
var zipped = R.zipObj(names,values);
function parse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return { error: e };
    }
}

//console.log(parse(JSON.stringify(zipped)));

fs.writeFile('names.json', JSON.stringify(zipped));
console.log('done');











/*
//var myJsonString = JSON.stringify(names);
//fs.writeFile('names.json', myJsonString)
var replace = x => {

	return R.filter(obj => !Array.isArray(obj), x)
}
names = R.map(replace, jsonData);

//console.log(names);



fs.writeFile('names.json', names);
//console.log('done');
*/
var fs = require('fs'),
    R = require('ramda');

var jsonData = require('./AllCards.json');

var properNames = R.keys(jsonData);

/*
var names = R.map(x => x.toString().toLowerCase(), properNames);
names = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), properNames);
names = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), properNames);
*/
var keys = new Array(properNames.length);

for (var i = 0; i < keys.length; i++) {
    keys[i] = 'name';
}

console.log(properNames.length);
console.log(keys.length);

var obj1 = R.zipObj(keys,properNames);

console.log( obj1 );

//var zipped = R.zipObj(properNames, obj1);

function parse(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return { error: e };
    }
}

//console.log(parse(JSON.stringify(zipped)));

//fs.writeFile('properNames.json', JSON.stringify(zipped));
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
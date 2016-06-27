var fs = require('fs'),
    R = require('ramda');

var jsonData = require('./AllCards-x.json');
/*var keys = R.keys(jsonData);
keys = R.map(x => x.toString().toLowerCase(), keys);
keys = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), keys);
keys = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), keys);
*/
/*for (var prop in jsonData) {
    var values = R.values(R.map(card => { return card[prop] }, jsonData));
    var object = R.zipObj(keys, values);
    fs.writeFile('card-'+ prop +'.json', JSON.stringify(object));
}*/
var keys = [];
for (var i=0;i<Object.keys(jsonData).length;i++) {
    keys.push(i)
}
var name = R.values(R.map(card => { return card.name }, jsonData));
var type = R.values(R.map(card => { return card.type }, jsonData));
var types = R.values(R.map(card => { return card.types }, jsonData));
var colors = R.values(R.map(card => { return card.colors }, jsonData));
var text = R.values(R.map(card => { return card.text }, jsonData));
var power = R.values(R.map(card => { return card.power }, jsonData));
var toughness = R.values(R.map(card => { return card.toughness }, jsonData));
var cmc = R.values(R.map(card => { return card.cmc }, jsonData));
/*console.log(name.length);
console.log(type.length);
console.log(types.length);
console.log(colors.length);
console.log(text.length);
console.log(power.length);
console.log(toughness.length);
console.log(cmc.length);
*/
var nameOb = R.zipObj(keys, name);
var typeOb = R.zipObj(keys, type);
var typesOb = R.zipObj(keys, types);
var colorsOb = R.zipObj(keys, colors);
var textOb = R.zipObj(keys, text);
var powerOb = R.zipObj(keys, power);
var toughnessOb = R.zipObj(keys, toughness);
var cmcOb = R.zipObj(keys, cmc);

var denormalized = {
    name: nameOb,
    type: typeOb,
    types: typesOb,
    colors: colorsOb,
    text: textOb,
    power: powerOb,
    toughness: toughnessOb,
    cmc: cmcOb
}

fs.writeFile('denormalized-cards.json', JSON.stringify(denormalized));

console.log('done');
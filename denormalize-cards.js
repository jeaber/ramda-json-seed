var fs = require('fs'),
    R = require('ramda');

var jsonData = require('./AllCards-x.json');
var keys = R.keys(jsonData);
key = R.map(x => x.toString().toLowerCase(), keys);
keys = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), keys);
keys = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), keys);


var names = R.map(card => { return card.names }, jsonData);
var type = R.map(card => { return card.type }, jsonData);
var types = R.map(card => { return card.types }, jsonData);
var colors = R.map(card => { return card.colors }, jsonData);
var text = R.map(card => { return card.text }, jsonData);
var power = R.map(card => { return card.power }, jsonData);
var toughness = R.map(card => { return card.toughness }, jsonData);
var cmc = R.map(card => { return card.cmc }, jsonData);

var namesOb = R.zipObj(keys, names);
var typeOb = R.zipObj(keys, type);
var typesOb = R.zipObj(keys, types);
var colorsOb = R.zipObj(keys, colors);
var textOb = R.zipObj(keys, text);
var powerOb = R.zipObj(keys, power);
var toughnessOb = R.zipObj(keys, toughness);
var cmcOb = R.zipObj(keys, cmc);

fs.writeFile('card-name.json', JSON.stringify(namesOb));
fs.writeFile('card-type.json', JSON.stringify(typeOb));
fs.writeFile('card-subtype.json', JSON.stringify(typesOb));
fs.writeFile('card-colors.json', JSON.stringify(colorsOb));
fs.writeFile('card-text.json', JSON.stringify(textOb));
fs.writeFile('card-power.json', JSON.stringify(powerOb));
fs.writeFile('card-toughness.json', JSON.stringify(toughnessOb));
fs.writeFile('card-cmc.json', JSON.stringify(cmcOb));

console.log('done');

// editions mardcardinfo map
/*keys.forEach(function(element) {
    values.push(jsonData[element].magicCardsInfoCode)
}, this);
*/
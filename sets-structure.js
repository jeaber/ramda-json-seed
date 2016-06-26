var fs = require('fs'),
    R = require('ramda');

var jsonData = require('./AllSets.json');

var newSets = R.map(edition => {
    var cards = R.zipObj(R.map(x => x.name.toLowerCase(), jsonData[edition.code].cards), R.map(x => x, jsonData[edition.code].cards))

    var keys = R.keys(cards);
    var values = R.values(cards);

    var names = R.map(x => x.toString().toLowerCase(), keys);
    names = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), names);
    names = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), names);

    var cardsFormatted = R.zipObj(names, values);
    edition.cards = cardsFormatted;

    return edition;

}, jsonData)


fs.writeFile('newSets.json', JSON.stringify(newSets));
console.log('done');

// editions mardcardinfo map
/*keys.forEach(function(element) {
    values.push(jsonData[element].magicCardsInfoCode)
}, this);
*/
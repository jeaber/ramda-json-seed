var fs = require('fs'),
    R = require('ramda');

var cards = require('./all-cards-fixed.json');
var sets = require('./newSets.json');
var editionsMap = { "LEA": "al", "LEB": "be", "ARN": "an", "2ED": "un", "CED": "ced", "CEI": "cedi", "pDRC": "drc", "ATQ": "aq", "3ED": "rv", "LEG": "lg", "DRK": "dk", "pMEI": "mbp", "FEM": "fe", "pLGM": "dcilm", "4ED": "4e", "ICE": "ia", "CHR": "ch", "HML": "hl", "ALL": "ai", "pARL": "arena", "pCEL": "uqc", "MIR": "mr", "MGB": "mgbc", "ITP": "itp", "VIS": "vi", "5ED": "5e", "pPOD": "pot", "POR": "po", "WTH": "wl", "pPRE": "ptc", "TMP": "tp", "STH": "sh", "PO2": "po2", "pJGP": "jr", "EXO": "ex", "UGL": "ug", "pALP": "apac", "USG": "us", "ATH": "at", "ULG": "ul", "6ED": "6e", "PTK": "p3k", "UDS": "ud", "S99": "st", "pGRU": "guru", "pWOR": "wrl", "pWOS": "wotc", "MMQ": "mm", "BRB": "br", "pSUS": "sus", "pFNM": "fnmp", "pELP": "euro", "NMS": "ne", "S00": "st2k", "PCY": "pr", "BTD": "bd", "INV": "in", "PLS": "ps", "7ED": "7e", "pMPR": "mprp", "APC": "ap", "ODY": "od", "DKM": "dm", "TOR": "tr", "JUD": "ju", "ONS": "on", "LGN": "le", "SCG": "sc", "pREL": "rep", "8ED": "8e", "MRD": "mi", "DST": "ds", "5DN": "5dn", "CHK": "chk", "UNH": "uh", "BOK": "bok", "SOK": "sok", "9ED": "9e", "RAV": "rav", "p2HG": "thgt", "pGTW": "grc", "GPT": "gp", "pCMP": "cp", "DIS": "di", "CSP": "cs", "CST": "cstd", "TSP": "ts", "TSB": "tsts", "pHHO": "hho", "PLC": "pc", "pPRO": "pro", "pGPX": "gpx", "FUT": "fut", "10E": "10e", "pMGD": "mgdc", "MED": "med", "LRW": "lw", "EVG": "evg", "pLPA": "mlp", "MOR": "mt", "p15A": "15ann", "SHM": "shm", "pSUM": "sum", "EVE": "eve", "DRB": "fvd", "ME2": "me2", "pWPN": "grc", "ALA": "ala", "DD2": "jvc", "CON": "cfx", "DDC": "dvd", "ARB": "arb", "M10": "m10", "V09": "fve", "HOP": "pch", "ME3": "me3", "ZEN": "zen", "DDD": "gvl", "H09": "pds", "WWK": "wwk", "DDE": "pvc", "ROE": "roe", "DPA": "dpa", "ARC": "arc", "M11": "m11", "V10": "fvr", "DDF": "ddf", "SOM": "som", "PD2": "pd2", "ME4": "me4", "MBS": "mbs", "DDG": "ddg", "NPH": "nph", "CMD": "cmd", "M12": "m12", "V11": "fvl", "DDH": "ddh", "ISD": "isd", "PD3": "pd3", "DKA": "dka", "DDI": "ddi", "AVR": "avr", "PC2": "pc2", "M13": "m13", "V12": "v12", "DDJ": "ddj", "RTR": "rtr", "CM1": "cma", "GTC": "gtc", "DDK": "ddk", "pWCQ": "wmcq", "DGM": "dgm", "MMA": "mma", "M14": "m14", "V13": "v13", "DDL": "ddl", "THS": "ths", "C13": "c13", "BNG": "bng", "DDM": "ddm", "JOU": "jou", "MD1": "md1", "CNS": "cns", "VMA": "vma", "M15": "m15", "CPK": "clash", "V14": "v14", "DDN": "ddn", "KTK": "ktk", "C14": "c14", "DD3_DVD": "ddadvd", "DD3_EVG": "ddaevg", "DD3_GVL": "ddagvl", "DD3_JVC": "ddajvc", "FRF_UGIN": "ugin", "FRF": "frf", "DDO": "ddo", "DTK": "dtk", "TPR": "tpr", "MM2": "mm2", "ORI": "ori", "V15": "v15", "DDP": "ddp", "BFZ": "bfz", "EXP": "exp", "C15": "c15", "OGW": "ogw", "EMA": "ema" }

function fetchMagicInfoCode(printing) {
    return editionsMap[printing];
}/*
key = R.map(x => x.toString().toLowerCase(), keys);
keys = R.map(x => R.replace(/[\/]/g, '%%', x.toString()), keys);
keys = R.map(x => R.replace(/[\.]/g, '@@', x.toString()), keys);
*/
var numUndefined = 0;
function fetchMCInumber(cardIndex, printing) {
    var mciNumber;
    var name = cards[cardIndex].name.toLowerCase().replace(/[\/]/g, '%%').replace(/[\.]/g, '@@');
    if (typeof name === 'undefined') numUndefined += 1
    //console.log(sets[printing].cards[name.toLowerCase().replace(/[\/]/g, '%%').replace(/[\.]/g, '@@')])
    var card = sets[printing].cards[name]
    if (card.mciNumber)
        var mciNumber = card.mciNumber
    else
        var mciNumber = card.number

    if (mciNumber) {
        mciNumber = mciNumber.replace(/...\/en\//, '');
        mciNumber = mciNumber.replace(/..\/en\//, '');
        mciNumber = mciNumber.replace(/.\/en\//, '');
    }
    return mciNumber;
}
function fetchPrinting(cardIndex, printing) {
    var namei = cards[cardIndex].name.toLowerCase().replace(/[\/]/g, '%%').replace(/[\.]/g, '@@');
    if (typeof namei === 'undefined') numUndefined += 1
    //console.log(sets[printing].cards[name.toLowerCase().replace(/[\/]/g, '%%').replace(/[\.]/g, '@@')])
    if (sets[printing])
        return sets[printing].name;
    // else
    //console.log('fetchpringing() err: ', printing)
}
var keys = R.keys(cards);
var values = R.values(cards);
var valuesCopy = values;
var printings = R.map(card => card.printings, values);
var imageSrc = R.clone(printings);
var rejects = 0; var success = 0;
for (var i = 0; i < printings.length; i++) { // i == card.name
    for (var k = 0; k < printings[i].length; k++) {
        var mci = fetchMCInumber(i, printings[i][k]);
        var set = fetchMagicInfoCode(printings[i][k]);
        if (i === 15033) {
            console.log(mci)
        }
        if (mci && set) {
            imageSrc[i][k] = set + "/" + mci;
            //console.log(printings[i]);
            success++
        }
        else {
            //console.log('splicing: ', printings[i][k], ': ', values[i])
            imageSrc[i].splice(k, 1);
            rejects++
        }
    }
}
console.log(rejects, '   ', success)
/*
for (var i = 0; i < printings.length; i++) { // i == card.name
    for (var k = 0; k < printings[i].length; k++) {
        var printing = fetchPrinting(i, printings[i][k]);
        if (printing) {
            imageSrc[i][k] = printing;
            //console.log(printings[i]);
        }
    }
}*/
var urls = [];
for (var i in imageSrc) {
    imageSrc[i].forEach((url) => { 'http://magiccards.info/scans/en/' + urls.push(url) + '.jpg' });
    //    values[i].printings = printings[i];
}
console.log(values[15033])
// console.log(values)
// var name = R.values(R.map(card => { return card.name }, jsonData));

// var cardsNew = R.zipObj(keys, values);

fs.writeFile('imgsrc-list.json', urls);
console.log(urls)
console.log('done');
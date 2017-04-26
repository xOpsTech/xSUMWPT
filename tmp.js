// var es = require('./es');
// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('wpt_response.json', 'utf8'), function (k, v) {
//     if (k.indexOf('.') > -1) {
//         replaced = k.replace(/[. ]/g,'_');
//         // console.log(replaced);
//         this[replaced] = v;

//     } else {
//         return v;
//     }
// });
// obj['storedTimestamp'] = new Date().toISOString();
// es.index_data('metrics', 'all', 2, obj);
// fs.writeFile('tmp.json', JSON.stringify(obj), function (err) {
//     console.log(err)
// })
// console.log(Object.keys(obj));

// var text = '{ "name":"John", "birth.date":"1986-12-14", "city":"New York"}';
// JSON.parse(text);
// var obj = JSON.parse(text, function (k, v) {
//     // console.log(k);
//     // return v;
//     if (k.indexOf('.') > -1) {
//         replaced = k.replace('.', '_');
//         console.log(replaced);
//         this[replaced] = v;

//     } else {
//         return v;
//     }


//     // this.aa = v;

// });
// console.log(obj);


function zipCode(code, location) {
    var _code = code;
    var _location = location || '';

    return {
        code: function () {
            return _code;
        },
        location: function () {
            return _location;
        }
    }
};

const princetonZip = zipCode('08544', '3345');
console.log(princetonZip.code()); //-> '08544'
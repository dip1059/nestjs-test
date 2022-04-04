/* eslint-disable prettier/prettier */

const glob = require('glob');
const lang = require('./langfile-processing');

let newKeys = [];
global.count = 0;

let srcFiles = glob.sync('./pages/**/*');
srcFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys, 't');
});

let viewFiles = glob.sync('./sections/**/*');
viewFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys, 't');
});

let langFiles = glob.sync('./locales/*.json');
langFiles.forEach((file) => {
  lang.writeLangfile(file, newKeys);
});
if(!langFiles.length) console.log('No language file found. Create en.json.');
console.log(`${global.count} new keys added.`);



// let getDirectories = function (src, callback) {
//   glob(src + '/**/*', callback);
// };

// getDirectories('../src', function (err, res) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     res.forEach((file) => {
//       newKeys = lang.collectLangKeys(file, newKeys);
//     });
//   }
// });

// getDirectories('../resources/views/', function (err, res) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     res.forEach((file) => {
//       newKeys = lang.collectLangKeys(file, newKeys);
//     });
//   }
// });

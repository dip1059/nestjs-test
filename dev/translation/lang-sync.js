/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const glob = require('glob');
const lang = require('./langfile-processing');

let newKeys = [];
global.count = 0;

const srcFiles = glob.sync('./src/**/*');
srcFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys);
});

srcFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys, 'fakeTrans');
});

const seedFiles = glob.sync('./prisma/seeds/**/*');
seedFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys);
});

const viewFiles = glob.sync('./resources/views/**/*');
viewFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys);
});

viewFiles.forEach((file) => {
  newKeys = lang.collectLangKeys(file, newKeys, 'trans');
});

const langFiles = glob.sync('./resources/lang/*.json');
langFiles.forEach((file) => {
  lang.writeLangfile(file, newKeys);
});
if(!langFiles.length) console.log(`No language file found. Create your lang files (ex: en.json, es.json ) in 'resources/lang'.`);
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



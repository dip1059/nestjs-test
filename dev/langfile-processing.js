const fs = require('fs');

async function collectLangKeys(file, funcSignature = '__') {
  try {
    let data = '';
    let newKeys = [];
    try {
      data = fs.readFileSync(file).toString();
    } catch {}
    if (data !== '') {
      if (funcSignature === '__')
        dataArr = [...data.matchAll(/\_\_\([\'|\"](.*?)[\'|\"]\)/g)];
      else
        dataArr = [
          ...data.matchAll(
            new RegExp(`${funcSignature}[\'|\"](.*?)[\'|\"]\)`, 'g'),
          ),
        ];
    }
  } catch (error) {
    console.log(error.toString());
  }
}

async function writeLangfile(file, newKeys = []) {
  try {
    let data = '';
    try {
      data = fs.readFileSync(file).toString();
    } catch {}
    if (data !== '') {
      langKeys = JSON.parse(data);
    }
    if (newKeys.length) {
      newKeys.forEach((elem, index, newKeys) => {
        let found = false;
        for (key in langKeys) {
          if (key === elem) {
            found = true;
            break;
          }
        }
        if (found) {
          newKeys.splice(index, 1);
        } else {
          langKeys[elem] = '';
        }
      });
    }
  } catch (error) {
    console.log(error.toString());
  }
}

exports.processDatafile = processDatafile;

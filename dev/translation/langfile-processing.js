const fs = require('fs');

function collectLangKeys(file, newKeys = [], funcSignature = '__()') {
  funcSignature = funcSignature.split('(')[0];
  try {
    let data = '';
    try {
      data = fs.readFileSync(file).toString();
    } catch {}
    if (data !== '') {
      if (funcSignature === '__')
        dataArr = [...data.matchAll(/\_\_\([\'|\"](.*?)[\'|\"]\)/g)];
      else
        dataArr = [
          ...data.matchAll(
            new RegExp(`${funcSignature}\\([\\'|\\"](.*?)[\\'|\\"]\\)`, 'g'),
          ),
        ];

      for (let i = 0; i < dataArr.length; i++) {
        newKeys.push(dataArr[i][1]);
      }
      return newKeys;
    }
    return newKeys;
  } catch (error) {
    console.log(error.toString());
    return newKeys;
  }
}

async function writeLangfile(file, newKeys = []) {
  try {
    let langKeys = {};
    let data = '';
    try {
      data = fs.readFileSync(file).toString();
    } catch {}
    if (data !== '') {
      langKeys = JSON.parse(data);
    }

    if (newKeys.length) {
      newKeys.forEach((elem) => {
        let found = false;
        for (key in langKeys) {
          if (key === elem) {
            found = true;
            break;
          }
        }
        if (!found) {
          global.count++;
          langKeys[elem] = '';
        }
      });
    }
    fs.writeFileSync(file, String(JSON.stringify(langKeys)));
  } catch (error) {
    console.log(error.toString());
  }
}

module.exports = { collectLangKeys, writeLangfile };
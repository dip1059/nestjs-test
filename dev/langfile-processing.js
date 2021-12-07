const fs = require('fs');


async function collectLangKeys(file, funcSignature = '__') {
  try {
    let data = '';
    let newKeys = [];
    try {
      data = fs.readFileSync(file).toString();
    } catch {}
    if (data !== '') {
      /* let dataArr = [...data];
      let start = 0;
      dataArr.forEach((elem, index, dataArr) => {
        
      }); */
      dataArr = data.match(/\_\_\((.*)\)/);
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

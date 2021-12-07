const glob = require('glob');

var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

getDirectories('../src', function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    
  }
});

console.log('<<< USING BUNDLED CLI >>>');
global.hideLog = true;

if (process.argv.includes('-verbose')) {
  global.hideLog = false;
  process.argv = process.argv.filter(a => a !== '-verbose');
}

var path = require('path');
var fse = require('fs');

var path = {
  dist: (path.join(__dirname,'../dist/cli.js')),
  bundle: (path.join(__dirname,'../cli.js'))
}
const proc= require('process');
proc.removeAllListeners('warning');
var p = fse.existsSync(path.dist) ? path.dist : path.bundle;
global.globalSystemToolMode = true;
var run = require(p).run;
run(process.argv);
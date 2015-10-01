var modernizrPath = 'node_modules/modernizr';
var lstatSync = require('fs').lstatSync;
var execSync;
try {
  execSync = require('child_process').execSync;
} catch(e) {
  execSync = require('sync-exec');
}

try {
   var modernizrFolder = lstatSync(modernizrPath);

   if (modernizrFolder.isDirectory()) {
      execSync('npm install --production', {
         cwd: modernizrPath
      });
   }
} catch (e) {
   //folder does not exist
}
var fs = require("fs");
var extention = process.argv[2];
var word = process.argv[3];

if(!extention || !word) {
    console.log("USAGE: node search.js [EXT] [TEXT]");
    process.exit(0);
}

var walkSync = function(dir, filelist) {
    dir = dir || __dirname;
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + "/" + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push(dir + "/" + file);
      }
    });
    return filelist;
  };
  
var files = walkSync();

var filesFound = files
    .filter(fileName => fileName.indexOf(`.${extention}`) > -1)
    .reduce((acc, currentFile) => {
        var currentFileContent = fs.readFileSync(currentFile).toString();
        if(currentFileContent.indexOf(word) > -1) {
            return acc.concat([currentFile]);
        }

        return acc;
    }, []);


if(filesFound.length === 0) {
    console.log("No File was found");
} else {
    filesFound.forEach(f => console.log(f));
}

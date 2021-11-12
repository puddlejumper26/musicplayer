const shell = require('shelljs');
const path = ('../database/NeteaseCloudMusicApi/');
shell.cd(path);
shell.exec('node app.js')

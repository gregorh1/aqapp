// const {series} = require('async');
const exec = require('child_process').exec;

const chokidar = require('chokidar');
const fs = require('fs')
const sass = require('sass');
const npm = require('npm')

chokidar.watch('./src/index.scss').on('all', (event, path) => {
    const result = sass.renderSync({ file: './src/index.scss' });
    fs.writeFile('./src/index.css', result.css)
    console.log(event, path + ' compiled to css');
});

// https://stackoverflow.com/questions/38288639/how-to-use-npm-scripts-within-javascript
// exec('npm run start',
//   function(err, stdout, stderr) {
//     if (err) throw err;
//     else console.log(stdout);
// });
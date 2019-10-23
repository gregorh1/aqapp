const exec = require('child_process').exec;
const chokidar = require('chokidar');
const fs = require('fs')
const sass = require('sass');
const npm = require('npm')

chokidar.watch('./src/scss/*').on('all', (event, path) => {
    fs.writeFile('./src/index.css', sass.renderSync({ file: './src/scss/_index.scss' }).css)
    console.log(event, path + ' compiled to css');
});

// about exec: https://stackoverflow.com/questions/38288639/how-to-use-npm-scripts-within-javascript

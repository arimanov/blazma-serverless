const fs = require('fs');
const archiver = require('archiver');

const files = [
    'index.js',
    'constant.js',
    'routes.js',
    'sa_name.json',
    'package.json',
    'package-lock.json'
];

const dirs = ['services', 'utils'];

const output = fs.createWriteStream(__dirname + '/distr.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);

files.forEach((file) => archive.file(file, { name: file }));
dirs.forEach((dir) => archive.directory(`${dir}/`, dir));

archive.finalize();


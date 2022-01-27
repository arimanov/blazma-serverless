const fs = require('fs');
const archiver = require('archiver');

const files = [
    'sa_name.json',
    'package.json',
    'package-lock.json'
];

const dirs = [
    ['src/services', 'services'],
    ['src/utils', 'utils']
];

const output = fs.createWriteStream(__dirname + '/distr.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);

files.forEach((file) => archive.file(file, { name: file }));
dirs.forEach((dir) => archive.directory(`${dir[0]}/`, dir[1]));

archive.finalize();


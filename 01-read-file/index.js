const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
stream.on('data', (chunk) => {
  process.stdout.write(chunk);
});
stream.on('error', (e) => {
  console.log(e.message);
});

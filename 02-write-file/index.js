const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome👋! Please type something to write into the file:');
console.log('If you need to exit, type "exit" or press CTRL + C to quit.');
rl.on('line', (line) => {
  if (line.trim().toLowerCase() === 'exit') {
    console.log('GoodBye! You have exited the program 🚪');
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(line + '\n');
    console.log('✅Text saved! Keep typing: ');
  }
});
process.on('SIGINT', () => {
  console.log('\n' + 'Goodbye! You have exited the program 🚪!');
  rl.close();
  writeStream.end();
});

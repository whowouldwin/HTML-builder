const { readdir, stat } = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function processFiles() {
  try {
    const files = await readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fileStats = await stat(filePath);

        const fileName = path.parse(file.name).name;
        const fileExt = path.extname(file.name).slice(1);
        const fileSizeInKb = fileStats.size / 1024;
        console.log(`${fileName} - ${fileExt} - ${fileSizeInKb.toFixed(3)} KB`);
      }
    }
  } catch (error) {
    console.error('Error reading folder contents:', error.message);
  }
}
(async () => {
  await processFiles();
})();

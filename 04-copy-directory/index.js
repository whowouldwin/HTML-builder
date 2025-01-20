const path = require('path');
const fs = require('fs/promises');

async function copyFolder(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const components = await fs.readdir(src, { withFileTypes: true });
    for (const component of components) {
      const srcPath = path.join(src, component.name);
      const destPath = path.join(dest, component.name);
      if (component.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else if (component.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying folder:' ${err.message}`);
  }
}

(async function main() {
  const srcFolder = path.join(__dirname, 'files');
  const destFolder = path.join(__dirname, 'files-copy');
  try {
    await fs.rm(destFolder, { recursive: true, force: true });
    await copyFolder(srcFolder, destFolder);
  } catch (e) {
    console.error(`Error copying folder: ${e.message}`);
  }
})();

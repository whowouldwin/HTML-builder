const fs = require('fs/promises');
const path = require('path');

(async function mergeStyles() {
  try {
    const stylesDirectory = path.join(__dirname, 'styles');
    const outputDirectory = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputDirectory, 'bundle.css');

    await fs.mkdir(outputDirectory, { recursive: true });
    const files = await fs.readdir(stylesDirectory, { withFileTypes: true });
    const cssFiles = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );
    const styles = [];
    for (const file of cssFiles) {
      const filePath = path.join(stylesDirectory, file.name);
      const fileContent = await fs.readFile(filePath, { encoding: 'utf8' });
      styles.push(fileContent);
    }
    await fs.writeFile(outputFile, styles.join('\n'), 'utf-8');
    console.log(`Successfully merged styles for: ${stylesDirectory}`);
  } catch (e) {
    console.error(`Error: ${e.error}`);
  }
})();

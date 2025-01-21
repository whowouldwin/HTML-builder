const fs = require('fs/promises');
const path = require('path');
const { mergeStyles } = require('../05-merge-styles/index');
const { copyFolder } = require('../04-copy-directory/index');

(async function buildPage() {
  try {
    const templateHtml = path.join(__dirname, 'template.html');
    const componentsDirectory = path.join(__dirname, 'components');
    const stylesDirectory = path.join(__dirname, 'styles');
    const assetsDirectory = path.join(__dirname, 'assets');
    const projectDist = path.resolve(__dirname, 'project-dist');
    const assetsInProjectDist = path.join(projectDist, 'assets');

    await fs.mkdir(projectDist, { recursive: true });

    let template = await fs.readFile(templateHtml, 'utf8');
    const components = await fs.readdir(componentsDirectory);

    for (const component of components) {
      const ext = path.extname(component);
      const name = path.basename(component, ext);
      if (ext === '.html') {
        const componentContent = await fs.readFile(
          path.join(componentsDirectory, component),
          'utf8',
        );
        const placeholder = `{{${name}}`;
        template = template.split(placeholder).join(componentContent);
      }
    }
    await fs.writeFile(path.join(projectDist, 'index.html'), template);
    const outputStyleFile = path.join(projectDist, 'style.css');
    await mergeStyles(stylesDirectory, outputStyleFile);
    await copyFolder(assetsDirectory, assetsInProjectDist);
    console.log('Page built successfully!');
  } catch (e) {
    console.error(`Error while trying to build page: ${e.message}`);
  }
})();

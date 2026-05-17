const fs = require('fs');
const path = require('path');

function listPageFiles() {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  return fs.readdirSync(pagesDir)
    .filter(f => f.endsWith('.ts'))
    .map(f => path.join(pagesDir, f));
}

function listStepFiles() {
  const stepsDir = path.join(__dirname, '..', 'src', 'steps');
  return fs.readdirSync(stepsDir)
    .filter(f => f.endsWith('.ts'))
    .map(f => path.join(stepsDir, f));
}

function extractMethodsFromPage(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  const methodRegex = /async\s+(\w+)\s*\(/g;
  const methods = new Set();
  let m;
  while ((m = methodRegex.exec(src)) !== null) {
    methods.add(m[1]);
  }
  return Array.from(methods);
}

function fileContainsAny(filePath, names) {
  const src = fs.readFileSync(filePath, 'utf8');
  return names.filter(name => {
    const re = new RegExp(`\\.${name}\\s*\\(|\\b${name}\\s*\\(`, 'g');
    return re.test(src);
  });
}

function main() {
  const pages = listPageFiles();
  const steps = listStepFiles();
  const stepsSrc = steps.map(f => ({ path: f, src: fs.readFileSync(f, 'utf8') }));

  const report = {};

  for (const pageFile of pages) {
    const pageName = path.basename(pageFile);
    const methods = extractMethodsFromPage(pageFile);
    const covered = new Set();

    for (const method of methods) {
      for (const s of stepsSrc) {
        const re = new RegExp(`\\.${method}\\s*\\(|\\b${method}\\s*\\(`);
        if (re.test(s.src)) {
          covered.add(method);
          break;
        }
      }
    }

    report[pageName] = {
      totalMethods: methods.length,
      coveredMethods: Array.from(covered),
      uncoveredMethods: methods.filter(m => !covered.has(m)),
    };
  }

  console.log(JSON.stringify(report, null, 2));
}

if (require.main === module) main();

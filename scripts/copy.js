
const fs      = require('fs');

const mail    = 'https://github.com/DWTechs/Winstan-plugin-express-perf.js';
const CRLF    = '\r\n';
const rel     = './';
const src     = `${rel}build/`;
const dest    = `${rel}dist/`; 
const files   = [
  {
    src:  `${rel}src/winstan-plugin-express-perf.d.ts`,
    dest: `${dest}winstan-plugin-express-perf.d.ts`
  },
  {
    src:  `${src}winstan-plugin-express-perf.mjs`,
    dest: `${dest}winstan-plugin-express-perf.js`
  },
];

fs.mkdir(dest, { recursive: false },(err) => {
  if (err) throw err;
  fs.readFile(`${rel}LICENSE`, (err, license) => {
    if (err) throw err;
    for (const file of files) {
      fs.readFile(file.src, (err, fileContent) => {
        if (err) throw err;
        fs.writeFile(file.dest, `/*${CRLF}${license}${CRLF}${mail}${CRLF}*/${CRLF}${CRLF}${fileContent}`, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});
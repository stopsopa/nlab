// https://stopsopa.github.io/viewer.html?file=%2Fpages%2Fbash%2Fxx%2Fxx-example.cjs
// edit: https://github.com/stopsopa/stopsopa.github.io/blob/master/pages/bash/xx/xx-example.cjs

// https://stopsopa.github.io/viewer.html?file=xx.cjs
// edit: https://github.com/stopsopa/stopsopa.github.io/blob/master/xx.cjs
// 🚀 -
// ✅ -
// ⚙️  -
// 🗑️  -
// 🛑 -

module.exports = (setup) => {
  return {
    help: {
      command: `
source .git/.env
        
cat <<EEE

 more info: https://github.com/stopsopa/nlab

EEE

      `,
      description: "Status of all things",
      confirm: false,
    },
    [`test.sh`]: {
      command: `
set -e
/bin/bash jest.sh --help
`,
      description: `coverage server`,
      confirm: false,
    },
    [`coverage server`]: {
      command: `
JEST_COVERAGE_PORT="4288"
cat <<EEE

    http://localhost:\${JEST_COVERAGE_PORT}

EEE
read -p "\n      Press enter to continue\n"
python -m http.server \${JEST_COVERAGE_PORT} --directory ./coverage
`,
      confirm: false,
    },
    [`test server`]: {
      command: `
set -e
nodemon -e js,html server.js --log 15
`,
      description: `test server`,
      confirm: false,
    },
    [`yarn`]: {
      command: `
set -e
/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn
`,
      description: `test server`,
      confirm: false,
    },
    [`npm pack`]: {
      command: `
set -e
npm pack
`,
      description: `npm pack`,
      confirm: false,
    },
    [`style list`]: {
      command: `
set -e
/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:list	
`,
      description: `style list`,
      confirm: false,
    },
    [`style check`]: {
      command: `
set -e
/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:check	
`,
      description: `style check`,
      confirm: false,
    },
    [`style fix`]: {
      command: `
set -e
/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn style:fix	
`,
      description: `style fix`,
      confirm: false,
    },
    ...setup,
  };
};

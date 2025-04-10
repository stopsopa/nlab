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
source .env
        
cat <<EEE

  🐙 GitHub: $(git ls-remote --get-url origin | awk '{\$1=\$1};1' | tr -d '\\n' | sed -E 's/git@github\\.com:([^/]+)\\/(.+)\\.git/https:\\/\\/github.com\\/\\1\\/\\2/g')

  test server http://0.0.0.0:\${NODE_API_PORT}
      # uncomment JEST_JUST_TESTS=true for testing without servers

  coverage server http://0.0.0.0:\${JEST_COVERAGE_PORT}

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
    [`testall.sh`]: {
      command: `
set -e
/bin/bash testall.sh 
`,
      description: `coverage server`,
      confirm: false,
    },
    [`jasmine`]: {
      command: `
set -e   
export NODE_OPTIONS=""  
cat <<EEE

/bin/bash jasmine/test.sh --env .env

NODE_API_PORT=4273 /bin/bash jasmine/test.sh --env .env -- --target docker

NODE_API_PORT=4273 /bin/bash jasmine/test.sh \
      --env .env \
      --filter "grep aes.jasmine.unit" \
      -- --target docker 

NODE_API_PORT=4273 /bin/bash jasmine/test.sh \
      --stay \
      --env .env \
      --test pages/encryptor/aes.jasmine.unit.js
      --  \
      -- --debug

NODE_API_PORT=4273 /bin/bash jasmine/test.sh \
      --stay \
      --env .env \
      --filter "grep aes.jasmine.unit" 
      --  \
      -- --debug

EEE
`,
      description: `helper script running all unit jest tests`,
      confirm: false,
    },
    [`coverage`]: {
      command: `
set -e
source .env
cat <<EEE

    open "file://$(realpath "coverage/index.html")"

EEE
read -p "\n      Press enter to continue\n"
open "file://$(realpath "coverage/index.html")"
`,
      confirm: false,
    },
    [`test server`]: {
      command: `
set -e
source .env
if [ "\${NODE_API_PORT}" = "" ]; then
  echo NODE_API_PORT not defined
  exit 1
fi
node node_modules/.bin/nodemon -e js,html server.js --log 15 --port "\${NODE_API_PORT}"
`,
      description: `test server`,
      confirm: false,
    },
    [`yarn`]: {
      command: `
set -e
cat <<EEE

/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn

EEE
read -n 1

/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn
npm run prepare
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

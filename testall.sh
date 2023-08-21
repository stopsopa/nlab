
set -e

/bin/bash test.sh

/bin/bash jasmine/test.sh --env .env --find "-name '*.test.js'"


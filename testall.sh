
set -e

/bin/bash jest.sh

/bin/bash jasmine/test.sh --env .env


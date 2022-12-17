
exec 3<> /dev/null
function red {
    printf "\e[91m$1\e[0m\n"
}
function green {
    printf "\e[32m$1\e[0m\n"
}

_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd -P )"

_ENV="${_DIR}/.env"

if [ ! -f "${_ENV}" ]; then

    echo "${0} error: ${_ENV} is not a file"

    exit 1
fi

source "${_ENV}"

if [ "${HOST}" = "" ]; then

  echo "${0} error: HOST is not defined"

  exit 1;
fi

if [ "${PORT}" = "" ]; then

  echo "${0} error: PORT is not defined"

  exit 1;
fi

if [ "${CRASH_PORT}" = "" ]; then

  echo "${0} error: CRASH_PORT is not defined"

  exit 1;
fi

if [ "$1" = "--help" ]; then

cat << EOF

    /bin/bash $0 --help
    /bin/bash $0 --watch                        ## this will run only changed test
    /bin/bash $0 --watchAll                     ## this will run all test on every change
    /bin/bash $0 [--watch|--watchAll] tests/... ## will run one test file or dir with tests 
    /bin/bash $0 -t 'filter test'               ## this will run only tests matching the provided string

EOF

    exit 0
fi

set -e




node "bash/node/is-port-free.js" "${HOST}:${PORT}" --verbose
node "bash/node/is-port-free.js" "${HOST}:${CRASH_PORT}" --verbose

function cleanup {

    echo cleaning ...

    kill "${PID1}" -9 1> /dev/null 2> /dev/null || :

    kill "${PID2}" -9 1> /dev/null 2> /dev/null || :

    sleep 0.3
}

trap cleanup EXIT;

node tests/server.js PORT &

PID1="${!}"

echo "PID1: ${PID1}"

node tests/server.js CRASH_PORT &

PID2="${!}"

echo "PID2: ${PID2}"

sleep 2




echo ""

set -e
set -x

# --bail \
# --silent=false \
# --verbose false \

TEST="$(cat <<END
node node_modules/.bin/jest \
$@ \
--roots tests \
--verbose \
--runInBand \
--modulePathIgnorePatterns \
    tests/examples \
    tests/jest \
    tests/minefield \
    tests/project \
    tests/puppeteer \
    karma_build
END
)";

{ green "\n\n    executing tests:\n        $TEST\n\n"; } 2>&3

$TEST

STATUS=$?

if [ "$STATUS" = "0" ]; then

    echo ""
    echo ""
    { green "\n    Tests passed\n"; } 2>&3
    echo ""
    echo ""
else

    echo ""
    echo ""
    { red "\n    Tests crashed\n"; } 2>&3
    echo ""
    echo ""

    exit $STATUS
fi

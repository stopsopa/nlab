
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

eval "$(/bin/bash bash/exportsource.sh "${_ENV}")"

if [ "${NODE_API_HOST}" = "" ]; then

  echo "${0} error: NODE_API_HOST is not defined"

  exit 1;
fi

if [ "${NODE_API_PORT}" = "" ]; then

  echo "${0} error: NODE_API_PORT is not defined"

  exit 1;
fi

if [ "${CRASH_PORT}" = "" ]; then

  echo "${0} error: CRASH_PORT is not defined"

  exit 1;
fi

if [ "$1" = "--help" ]; then

cat << EOF

    /bin/bash ${0} --help
    /bin/bash ${0} --watch                        ## this will run only changed test
    /bin/bash ${0} --watchAll                     ## this will run all test on every change
    /bin/bash ${0} [--watch|--watchAll] tests/... ## will run one test file or dir with tests 
    /bin/bash ${0} -t 'filter test'               ## this will run only tests matching the provided string
    JEST_JUST_TESTS=true /bin/bash ${0}

EOF

    exit 0
fi

set -e

if [ "${JEST_JUST_TESTS}" = "" ]; then
    node "bash/node/is-port-free.js" "${NODE_API_HOST}:${NODE_API_PORT}" --verbose
    node "bash/node/is-port-free.js" "${NODE_API_HOST}:${CRASH_PORT}" --verbose
fi

function cleanup {

    set +x

    echo cleaning ...

    if [ "${JEST_JUST_TESTS}" = "" ]; then
        kill "${PID1}" -9 1> /dev/null 2> /dev/null || :

        kill "${PID2}" -9 1> /dev/null 2> /dev/null || :
    fi

    sleep 0.3
}

trap cleanup EXIT;

if [ "${JEST_JUST_TESTS}" = "" ]; then
    node tests/server.js NODE_API_PORT &
    PID1="${!}"
    echo "PID1: ${PID1}"
fi

if [ "${JEST_JUST_TESTS}" = "" ]; then
    node tests/server.js CRASH_PORT &
    PID2="${!}"
    echo "PID2: ${PID2}"
    sleep 2
fi


echo ""

set -e
# set -x

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

echo ""
echo ""
if [ "$STATUS" = "0" ]; then

    { green "\n    Tests passed\n"; } 2>&3
    echo ""
    echo ""
else

    { red "\n    Tests crashed\n"; } 2>&3
    echo ""
    echo ""

    exit $STATUS
fi

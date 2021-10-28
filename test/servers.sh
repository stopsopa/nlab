
FLAG="${1}"

if [ "${FLAG}" = "" ]; then

  echo "${0} error: FLAG is not provided"

  exit 1
fi

/bin/bash "bash/proc/run-with-flag-and-kill.sh" "1-${FLAG}" node test/server.js CRUSH_PORT &

/bin/bash "bash/proc/run-with-flag-and-kill.sh" "2-${FLAG}" node test/server.js PORT &

cat <<EOF

ps aux | grep "$FLAG" | grep -v grep | awk '{print \$2}' | xargs kill -9


EOF


sleep 2


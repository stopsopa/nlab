
node node_modules/.bin/forever --no-colors -d -t -v -a -c node test/server.js CRUSH_PORT &

node node_modules/.bin/forever --no-colors -d -t -v -a -c node test/server.js PORT


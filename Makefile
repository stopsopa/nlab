#WARNING:
#	DON'T UPDATE codecov@3.7.2 BECAUSE IT WILL CRUSH TRAVIS TESTS FOR NODE VER 8

h: j# show any help that is available
	@echo more info: https://github.com/stopsopa/nlab

c: # run local server to browse coverage
	@node server.js --log 15 --dir coverage

cc: # run local server for general testing
	@nodemon -e js,html server.js --log 15

u: # update npm and git (generates new tag)
	@/bin/bash update.sh

uf: # update even if there is nothing new committed
	@/bin/bash update.sh force

yarn:
	/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn

j: # just run tests once
	@/bin/bash jest.sh --help

nt: # test .npmignore
	@npm pack
